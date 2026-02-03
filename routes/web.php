<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('cooking/index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->prefix('cooking')->group(function () {
    Route::get('/', function () {
        return Inertia::render('cooking/index');
    })->name('cooking.home');

    Route::prefix('ingredients')->group(function () {
        Route::get('/input', function () {
            return Inertia::render('cooking/ingredients/input');
        })->name('cooking.ingredients.input');

        Route::post('/upload', [App\Http\Controllers\Api\IngredientController::class, 'upload'])->name('cooking.ingredients.upload');
        Route::get('/jobs/{jobId}', [App\Http\Controllers\Api\IngredientController::class, 'checkJobStatus'])->name('cooking.jobs.status');

        Route::get('/confirm', function () {
            return Inertia::render('cooking/ingredients/confirm');
        })->name('cooking.ingredients.confirm');
    });

    Route::prefix('recipes')->group(function () {
        Route::get('/', function () {
            return Inertia::render('cooking/recipes/recommendations');
        })->name('cooking.recipes.recommendations');

        Route::get('/list', [App\Http\Controllers\Api\RecipeController::class, 'index'])->name('cooking.recipes.index');
        Route::get('/my-recipes', [App\Http\Controllers\Api\RecipeController::class, 'myRecipes'])->name('cooking.recipes.my');
        Route::post('/generate', [App\Http\Controllers\Api\RecipeController::class, 'generate'])->name('cooking.recipes.generate');
        Route::post('/{recipe}/favorite', [App\Http\Controllers\Api\RecipeController::class, 'toggleFavorite'])->name('cooking.recipes.favorite');

        Route::get('/{recipe}', function (\App\Models\Recipe $recipe) {
            if ($recipe->user_id !== auth()->id()) {
                abort(403);
            }
            return Inertia::render('cooking/recipes/show', [
                'recipe' => $recipe
            ]);
        })->name('cooking.recipes.show');
    });

    Route::prefix('cook')->group(function () {
        Route::get('/{id}', function () {
            return Inertia::render('cooking/cook/active');
        })->name('cooking.cook.active');

        Route::get('/{id}/feedback', function () {
            return Inertia::render('cooking/cook/feedback');
        })->name('cooking.cook.feedback');
    });
});

require __DIR__.'/settings.php';
