<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\RecipeController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Ingredient Detection
    Route::post('/ingredients/upload', [IngredientController::class, 'upload']);
    Route::get('/jobs/{jobId}', [IngredientController::class, 'checkJobStatus']);

    // Recipes
    Route::get('/recipes', [RecipeController::class, 'index']);
    Route::get('/recipes/{recipe}', [RecipeController::class, 'show']);
    Route::post('/recipes/generate', [RecipeController::class, 'generate']);
    Route::post('/recipes/{recipe}/favorite', [RecipeController::class, 'toggleFavorite']);
});
