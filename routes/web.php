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

Route::prefix('cooking')->group(function () {
    Route::get('/', function () {
        return Inertia::render('cooking/index');
    })->name('cooking.home');

    Route::prefix('ingredients')->group(function () {
        Route::get('/input', function () {
            return Inertia::render('cooking/ingredients/input');
        })->name('cooking.ingredients.input');

        Route::get('/confirm', function () {
            return Inertia::render('cooking/ingredients/confirm');
        })->name('cooking.ingredients.confirm');
    });

    Route::prefix('recipes')->group(function () {
        Route::get('/', function () {
            return Inertia::render('cooking/recipes/recommendations');
        })->name('cooking.recipes.recommendations');

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
