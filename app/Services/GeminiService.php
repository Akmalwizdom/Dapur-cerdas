<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class GeminiService
{
    protected string $apiKey;
    protected string $model;

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key');
        $this->model = config('services.gemini.model', 'gemini-3-flash-preview');
    }

    /**
     * Generate a recipe based on ingredients.
     *
     * @param array $ingredients
     * @return array
     * @throws Exception
     */
    public function generateRecipe(array $ingredients): array
    {
        if (empty($this->apiKey)) {
            throw new Exception('Gemini API key is not configured.');
        }

        $prompt = $this->buildPrompt($ingredients);

        try {
            $response = Http::timeout(60)
                ->post("https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$this->apiKey}", [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $prompt]
                            ]
                        ]
                    ],
                    'generationConfig' => [
                        'response_mime_type' => 'application/json',
                    ]
                ]);

            if ($response->failed()) {
                Log::error('Gemini API Error', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                throw new Exception("Gemini API returned error: {$response->status()}");
            }

            $result = $response->json();
            $text = $result['candidates'][0]['content']['parts'][0]['text'] ?? '{}';
            
            return json_decode($text, true);
        } catch (Exception $e) {
            Log::error('Gemini API Connection Failed', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Build the prompt for Gemini.
     */
    protected function buildPrompt(array $ingredients): string
    {
        $ingredientsList = implode(', ', $ingredients);
        
        return "As a professional chef at DapurCerdas, create a delicious recipe using these ingredients: {$ingredientsList}. 
        Focus on Indonesian or International cuisine that is easy to make at home.
        
        Return the result in strictly JSON format with this structure:
        {
            \"title\": \"Recipe Name\",
            \"description\": \"A short appetizing description\",
            \"cooking_time\": 30, (integer in minutes)
            \"difficulty\": \"easy|medium|hard\",
            \"ingredients\": [
                {\"name\": \"ingredient name\", \"amount\": \"quantity and unit\"},
                ...
            ],
            \"instructions\": [
                \"Step 1 description\",
                \"Step 2 description\",
                ...
            ],
            \"nutrition\": {
                \"calories\": \"approx kcal\",
                \"protein\": \"grams\",
                \"fat\": \"grams\",
                \"carbs\": \"grams\"
            }
        }";
    }
}
