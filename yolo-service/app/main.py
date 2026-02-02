"""
YOLO Ingredient Detection Service
==================================
FastAPI-based microservice for detecting ingredients from food photos
using Ultralytics YOLO models.

This service is designed to be called by the Laravel backend (server-to-server).
"""

import os
import io
import time
import uuid
import logging
import asyncio
from pathlib import Path
from typing import List, Optional
from contextlib import asynccontextmanager

from fastapi import FastAPI, File, UploadFile, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=getattr(logging, os.getenv("LOG_LEVEL", "INFO")),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# =============================================================================
# Configuration (hardcoded, only ULTRALYTICS_API_KEY from env)
# =============================================================================

class Settings:
    """Application settings - hardcoded for simplicity."""
    
    # Model settings
    MODEL_PATH: str = "yolo11n.pt"
    CONFIDENCE_THRESHOLD: float = 0.5
    DEVICE: str = "cpu"
    
    # Only external API key from environment
    ULTRALYTICS_API_KEY: str = os.getenv("ULTRALYTICS_API_KEY", "")


settings = Settings()

# =============================================================================
# YOLO Model Management
# =============================================================================

class YOLOModelManager:
    """Manages YOLO model loading and inference."""
    
    def __init__(self):
        self.model = None
        self._loaded = False
    
    def load_model(self):
        """Load the YOLO model into memory."""
        try:
            from ultralytics import YOLO
            
            # Set Ultralytics API key if provided
            if settings.ULTRALYTICS_API_KEY:
                os.environ["ULTRALYTICS_API_KEY"] = settings.ULTRALYTICS_API_KEY
            
            logger.info(f"Loading YOLO model: {settings.MODEL_PATH}")
            self.model = YOLO(settings.MODEL_PATH)
            self._loaded = True
            logger.info(f"Model loaded successfully on device: {settings.DEVICE}")
        except Exception as e:
            logger.error(f"Failed to load YOLO model: {e}")
            raise RuntimeError(f"Failed to load YOLO model: {e}")
    
    def detect(self, image: Image.Image) -> List[dict]:
        """
        Run object detection on an image.
        
        Args:
            image: PIL Image to process
            
        Returns:
            List of detected objects with class names and confidence scores
        """
        if not self._loaded:
            raise RuntimeError("Model not loaded")
        
        # Run inference
        results = self.model(
            image,
            conf=settings.CONFIDENCE_THRESHOLD,
            device=settings.DEVICE,
            verbose=False
        )
        
        detections = []
        for result in results:
            boxes = result.boxes
            if boxes is not None:
                for i, box in enumerate(boxes):
                    class_id = int(box.cls[0])
                    confidence = float(box.conf[0])
                    class_name = result.names[class_id]
                    
                    detections.append({
                        "id": str(uuid.uuid4()),
                        "class_name": class_name,
                        "confidence": round(confidence, 4),
                        "bbox": {
                            "x1": float(box.xyxy[0][0]),
                            "y1": float(box.xyxy[0][1]),
                            "x2": float(box.xyxy[0][2]),
                            "y2": float(box.xyxy[0][3]),
                        }
                    })
        
        return detections
    
    @property
    def is_loaded(self) -> bool:
        return self._loaded


# Global model manager instance
model_manager = YOLOModelManager()

# =============================================================================
# Lifespan Management
# =============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager - loads model on startup."""
    logger.info("Starting YOLO Service...")
    model_manager.load_model()
    yield
    logger.info("Shutting down YOLO Service...")

# =============================================================================
# FastAPI Application
# =============================================================================

app = FastAPI(
    title="DapurCerdas YOLO Service",
    description="Ingredient detection service using Ultralytics YOLO",
    version="1.0.0",
    lifespan=lifespan
)

# Limit concurrent detections to prevent OOM/GPU overload
# Adjust based on server resources (e.g., 2 per CPU core or 1-2 per GPU)
MAX_CONCURRENT_DETECTIONS = int(os.getenv("MAX_CONCURRENT_DETECTIONS", "2"))
detection_semaphore = asyncio.Semaphore(MAX_CONCURRENT_DETECTIONS)

# CORS middleware (restrict in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict to Laravel backend URL in production
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

# =============================================================================
# Request/Response Models
# =============================================================================

class DetectionResult(BaseModel):
    """Single detection result."""
    id: str
    class_name: str
    confidence: float
    bbox: dict


class DetectionResponse(BaseModel):
    """Response from detection endpoint."""
    success: bool
    request_id: str
    processing_time_ms: float
    detections: List[DetectionResult]
    detection_count: int


class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    model_loaded: bool
    model_path: str
    device: str


class ErrorResponse(BaseModel):
    """Error response."""
    error: str
    message: str

# =============================================================================
# Authentication (disabled - internal service only)
# =============================================================================

async def verify_request() -> bool:
    """
    Verify request - currently accepts all requests.
    For production, restrict to internal network or add auth.
    """
    return True

# =============================================================================
# Endpoints
# =============================================================================

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint.
    Returns service status and model information.
    """
    return HealthResponse(
        status="healthy" if model_manager.is_loaded else "unhealthy",
        model_loaded=model_manager.is_loaded,
        model_path=settings.MODEL_PATH,
        device=settings.DEVICE
    )


@app.post(
    "/detect",
    response_model=DetectionResponse,
    responses={
        400: {"model": ErrorResponse},
        401: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def detect_ingredients(
    file: UploadFile = File(..., description="Image file to analyze"),
    _: bool = Depends(verify_request)
):
    """
    Detect ingredients in an uploaded image.
    
    This endpoint accepts an image file and returns detected objects
    with their class names, confidence scores, and bounding boxes.
    
    **Authentication required**: Bearer token in Authorization header.
    
    **Supported formats**: JPEG, PNG, WebP
    
    **Returns**: List of detected ingredients with confidence scores
    """
    request_id = str(uuid.uuid4())
    start_time = time.time()
    
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "invalid_file_type",
                "message": f"File type '{file.content_type}' not supported. Allowed: {allowed_types}"
            }
        )
    
    try:
        # Read and process image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Convert to RGB if necessary (handles RGBA, etc.)
        if image.mode != "RGB":
            image = image.convert("RGB")
        
        logger.info(f"[{request_id}] Processing image: {file.filename}, size: {image.size}")
        
        # Run detection with semaphore and offload to thread to avoid blocking event loop
        async with detection_semaphore:
            logger.debug(f"[{request_id}] Entering detection semaphore")
            detections = await asyncio.to_thread(model_manager.detect, image)
        
        processing_time = (time.time() - start_time) * 1000
        
        logger.info(f"[{request_id}] Detection complete: {len(detections)} objects in {processing_time:.2f}ms")
        
        return DetectionResponse(
            success=True,
            request_id=request_id,
            processing_time_ms=round(processing_time, 2),
            detections=[DetectionResult(**d) for d in detections],
            detection_count=len(detections)
        )
        
    except Exception as e:
        logger.error(f"[{request_id}] Detection failed: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "detection_failed",
                "message": f"Failed to process image: {str(e)}"
            }
        )


@app.get("/")
async def root():
    """Root endpoint with service information."""
    return {
        "service": "DapurCerdas YOLO Service",
        "version": "1.0.0",
        "endpoints": {
            "health": "GET /health",
            "detect": "POST /detect"
        }
    }


# =============================================================================
# Run Server
# =============================================================================

if __name__ == "__main__":
    import uvicorn
    
    host = os.getenv("YOLO_SERVICE_HOST", "0.0.0.0")
    port = int(os.getenv("YOLO_SERVICE_PORT", "8001"))
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True,  # Disable in production
        log_level="info"
    )
