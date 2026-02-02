<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use App\Services\YoloService;

class DetectIngredientsJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        protected string $jobId,
        protected string $imagePath
    ) {}

    public function handle(YoloService $yolo): void
    {
        Cache::put("job_{$this->jobId}", ['status' => 'processing'], now()->addMinutes(10));

        try {
            $results = $yolo->detect($this->imagePath);

            Cache::put("job_{$this->jobId}", [
                'status' => 'completed',
                'results' => $results['detections'] ?? [],
                'count' => $results['detection_count'] ?? 0
            ], now()->addMinutes(30));

            Log::info("Detection job {$this->jobId} completed successfully.");
        } catch (\Exception $e) {
            Cache::put("job_{$this->jobId}", [
                'status' => 'failed',
                'error' => $e->getMessage()
            ], now()->addMinutes(30));

            Log::error("Detection job {$this->jobId} failed: " . $e->getMessage());
        }
    }
}
