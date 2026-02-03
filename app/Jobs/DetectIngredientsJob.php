<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use App\Services\GeminiService;

class DetectIngredientsJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        protected string $jobId,
        protected string $imagePath
    ) {}

    public function handle(GeminiService $gemini): void
    {
        Cache::put("job_{$this->jobId}", ['status' => 'processing'], now()->addMinutes(10));

        try {
            $results = $gemini->detectIngredients($this->imagePath);
            $ingredients = $results['ingredients'] ?? [];

            // Map Gemini results to the format expected by the frontend for backward compatibility
            // YOLO originally returned: { name: '...', confidence: 0.9, box_2d: [...] }
            // Gemini returns: { name: '...', confidence: 'high|medium|low', note: '...' }
            $formattedResults = array_map(function($ing) {
                return [
                    'label' => $ing['name'] ?? 'Unknown',
                    'confidence' => $ing['confidence'] ?? 'medium',
                    'note' => $ing['note'] ?? null,
                ];
            }, $ingredients);

            Cache::put("job_{$this->jobId}", [
                'status' => 'completed',
                'results' => $formattedResults,
                'count' => count($formattedResults)
            ], now()->addMinutes(30));

            Log::info("Detection job {$this->jobId} completed successfully via Gemini.");
        } catch (\Exception $e) {
            Cache::put("job_{$this->jobId}", [
                'status' => 'failed',
                'error' => $e->getMessage()
            ], now()->addMinutes(30));

            Log::error("Detection job {$this->jobId} failed: " . $e->getMessage());
        }
    }
}
