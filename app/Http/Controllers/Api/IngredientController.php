<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\DetectIngredientsJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;

class IngredientController extends Controller
{
    /**
     * Handle ingredient photo upload and dispatch detection job.
     */
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|max:15360', // Max 15MB
        ]);

        $jobId = (string) Str::uuid();
        $path = $request->file('image')->store('temp/ingredients', 'public');
        $fullPath = Storage::disk('public')->path($path);

        // Track job initial state
        Cache::put("job_{$jobId}", [
            'status' => 'pending',
            'filename' => $request->file('image')->getClientOriginalName(),
            'image_url' => Storage::disk('public')->url($path),
        ], now()->addHours(24));

        // Dispatch background job
        DetectIngredientsJob::dispatch($jobId, $fullPath);

        return response()->json([
            'success' => true,
            'job_id' => $jobId,
            'message' => 'Image uploaded. Detection processing started.'
        ], 202);
    }

    /**
     * Check status and results of a detection job.
     */
    public function checkJobStatus(string $jobId): JsonResponse
    {
        $jobData = Cache::get("job_{$jobId}");

        if (!$jobData) {
            return response()->json([
                'success' => false,
                'message' => 'Job not found or expired.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'job_id' => $jobId,
            'data' => $jobData
        ]);
    }
}
