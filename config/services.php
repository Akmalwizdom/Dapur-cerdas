<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | YOLO Service (Computer Vision - Ingredient Detection)
    |--------------------------------------------------------------------------
    |
    | Configuration for the YOLO microservice that performs ingredient
    | detection from photos. This is a separate Python/FastAPI service.
    |
    */

    'yolo' => [
        'url' => env('YOLO_SERVICE_URL', 'http://localhost:8000'),
        'timeout' => 30,  // seconds
        'endpoints' => [
            'detect' => '/detect',
            'health' => '/health',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Generative AI Service (Recipe Recommendation)
    |--------------------------------------------------------------------------
    |
    | Using Google Gemini for recipe generation.
    | Only GEMINI_API_KEY needs to be set in .env
    |
    */

    'gemini' => [
        'key' => env('GEMINI_API_KEY'),
        'model' => env('GEMINI_MODEL', 'gemini-3-flash-preview'),
        'base_url' => 'https://generativelanguage.googleapis.com/v1beta',
        'timeout' => 60,  // seconds
        'max_tokens' => 4096,
    ],

    /*
    |--------------------------------------------------------------------------
    | Image Upload Settings
    |--------------------------------------------------------------------------
    */

    'upload' => [
        'temp_path' => storage_path('app/tmp'),
        'max_size_kb' => 5120,  // 5MB
        'allowed_types' => ['jpg', 'jpeg', 'png', 'webp'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Rate Limiting (requests per user per minute)
    |--------------------------------------------------------------------------
    */

    'rate_limits' => [
        'image_upload' => 10,
        'recipe_generation' => 5,
    ],

];
