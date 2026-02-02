<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\UploadedFile;
use Exception;

class YoloService
{
    protected string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.yolo.url', 'http://localhost:8001');
    }

    /**
     * Send an image to the YOLO service for detection.
     *
     * @param UploadedFile|string $imagePath
     * @return array
     * @throws Exception
     */
    public function detect(UploadedFile|string $image): array
    {
        try {
            $response = Http::timeout(30)
                ->attach(
                    'file', 
                    $image instanceof UploadedFile ? file_get_contents($image->getRealPath()) : file_get_contents($image),
                    $image instanceof UploadedFile ? $image->getClientOriginalName() : basename($image)
                )
                ->post("{$this->baseUrl}/detect");

            if ($response->failed()) {
                Log::error('YOLO Service Error', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                throw new Exception("YOLO Service returned error: {$response->status()}");
            }

            return $response->json();
        } catch (Exception $e) {
            Log::error('YOLO Service Connection Failed', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Check the health of the YOLO service.
     *
     * @return bool
     */
    public function isHealthy(): bool
    {
        try {
            $response = Http::timeout(2)->get("{$this->baseUrl}/health");
            return $response->successful() && $response->json('status') === 'healthy';
        } catch (Exception $e) {
            return false;
        }
    }
}
