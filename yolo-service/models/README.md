# YOLO Models Directory

Place your trained YOLO models here.

## Default Model

If no custom model is specified, the service will download and use `yolo11n.pt` (small, fast model) from Ultralytics.

## Custom Models

For ingredient detection, train a custom model on food/ingredient dataset:

1. Prepare dataset in YOLO format
2. Train using Ultralytics:
   ```bash
   yolo train model=yolo11n.pt data=ingredients.yaml epochs=100
   ```
3. Copy the trained model (e.g., `best.pt`) to this directory
4. Update `YOLO_MODEL_PATH=./models/best.pt` in your `.env`

## Recommended Pre-trained Models

| Model | Size | Speed | Accuracy |
|-------|------|-------|----------|
| yolo11n.pt | 6 MB | Fastest | Lower |
| yolo11s.pt | 22 MB | Fast | Good |
| yolo11m.pt | 49 MB | Medium | Better |
| yolo11l.pt | 87 MB | Slower | High |
| yolo11x.pt | 131 MB | Slowest | Highest |
