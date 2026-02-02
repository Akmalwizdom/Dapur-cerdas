# YOLO Ingredient Detection Service

FastAPI-based microservice for detecting ingredients from food photos using [Ultralytics YOLO](https://github.com/ultralytics/ultralytics).

## Overview

This service is part of the DapurCerdas monorepo. It handles computer vision-based ingredient detection and is designed to be called by the Laravel backend (server-to-server communication only).

## Architecture

```
Laravel Backend → YOLO Service (this) → Returns detected ingredients
```

## Quick Start

### 1. Install Dependencies

```bash
cd yolo-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your settings
```

### 3. Run the Service

```bash
# Development
python app/main.py

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 4. Run with Docker

```bash
# From project root
docker-compose up yolo-service
```

## API Endpoints

### Health Check
```
GET /health
```
Returns service status and model information.

### Detect Ingredients
```
POST /detect
Authorization: Bearer <YOLO_SERVICE_SECRET>
Content-Type: multipart/form-data

file: <image file>
```

**Response:**
```json
{
  "success": true,
  "request_id": "uuid",
  "processing_time_ms": 150.5,
  "detections": [
    {
      "id": "uuid",
      "class_name": "tomato",
      "confidence": 0.92,
      "bbox": { "x1": 100, "y1": 50, "x2": 200, "y2": 150 }
    }
  ],
  "detection_count": 1
}
```

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `YOLO_SERVICE_HOST` | Server bind host | `0.0.0.0` |
| `YOLO_SERVICE_PORT` | Server bind port | `8000` |
| `YOLO_SERVICE_SECRET` | Auth secret (must match Laravel) | - |
| `YOLO_MODEL_PATH` | Path to YOLO model | `yolo11n.pt` |
| `YOLO_CONFIDENCE_THRESHOLD` | Min confidence (0-1) | `0.5` |
| `YOLO_DEVICE` | Inference device | `cpu` |
| `ULTRALYTICS_API_KEY` | Ultralytics Platform key | - |

## Model Options

The service can use any Ultralytics YOLO model:

- **Pre-trained**: `yolo11n.pt`, `yolo11s.pt`, `yolo11m.pt`, `yolo11l.pt`, `yolo11x.pt`
- **Custom**: Train your own ingredient detection model and specify path

### Training Custom Model

See [Ultralytics Training Docs](https://docs.ultralytics.com/modes/train/) for training a custom ingredient detection model.

## Security

- All requests must include `Authorization: Bearer <secret>` header
- Secret must match `YOLO_SERVICE_SECRET` in Laravel backend
- Service should only be accessible from internal network in production

## Requirements

- Python 3.11+
- `ultralytics>=8.4.0` (required for platform integration)
