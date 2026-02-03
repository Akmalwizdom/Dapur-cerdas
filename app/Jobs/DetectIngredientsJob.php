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
        $existing = Cache::get("job_{$this->jobId}") ?: [];
        Cache::put("job_{$this->jobId}", array_merge($existing, ['status' => 'processing']), now()->addHours(24));

        try {
            $results = $gemini->detectIngredients($this->imagePath);
            $ingredients = $results['ingredients'] ?? [];

            // Map Gemini results to the format expected by the frontend for backward compatibility
            // YOLO originally returned: { name: '...', confidence: 0.9, box_2d: [...] }
            // Gemini returns: { name: '...', confidence: 'high|medium|low', note: '...' }
            $formattedResults = array_map(function($ing) {
                return [
                    'name' => $ing['name'] ?? 'Unknown',
                    'confidence' => (float)($ing['confidence'] ?? 0.5),
                    'note' => $ing['note'] ?? null,
                ];
            }, $ingredients);

            $existing = Cache::get("job_{$this->jobId}") ?: [];
            Cache::put("job_{$this->jobId}", array_merge($existing, [
                'status' => 'completed',
                'results' => $formattedResults,
                'count' => count($formattedResults)
            ]), now()->addHours(24));

            Log::info("Detection job {$this->jobId} completed successfully via Gemini.");
        } catch (\Exception $e) {
            $existing = Cache::get("job_{$this->jobId}") ?: [];
            Cache::put("job_{$this->jobId}", array_merge($existing, [
                'status' => 'failed',
                'error' => $e->getMessage()
            ]), now()->addHours(24));

            Log::error("Detection job {$this->jobId} failed: " . $e->getMessage());
        }
    }
}
