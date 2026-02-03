<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class RecipeController extends Controller
{
    public function __construct(
        protected GeminiService $gemini
    ) {}

    /**
     * Generate a recipe from a list of ingredients.
     */
    public function generate(Request $request): JsonResponse
    {
        $request->validate([
            'ingredients' => 'required|array|min:1',
            'ingredients.*' => 'string|max:50',
        ]);

        try {
            $recipeData = $this->gemini->generateRecipe($request->ingredients);

            if (!$recipeData || !is_array($recipeData)) {
                Log::error('Invalid Recipe Data received from Gemini', ['data' => $recipeData]);
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to parse recipe data. Please try again.'
                ], 500);
            }

            // Create recipe in database
            $recipe = Recipe::create([
                'user_id' => $request->user()->id,
                'title' => $recipeData['title'] ?? 'Untitled Recipe',
                'description' => $recipeData['description'] ?? '',
                'cooking_time' => $recipeData['cooking_time'] ?? null,
                'difficulty' => $recipeData['difficulty'] ?? 'easy',
                'ingredients' => $recipeData['ingredients'] ?? [],
                'instructions' => $recipeData['instructions'] ?? [],
                'nutrition' => $recipeData['nutrition'] ?? null,
            ]);

            return response()->json([
                'success' => true,
                'data' => $recipe,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Recipe Generation Failed', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate recipe. Please try again later.'
            ], 500);
        }
    }

    /**
     * List user's recipes for the web interface.
     */
    public function myRecipes(Request $request)
    {
        $recipes = $request->user()->recipes()
            ->latest()
            ->paginate(10);

        return \Inertia\Inertia::render('cooking/recipes/index', [
            'recipes' => $recipes
        ]);
    }

    /**
     * Update a recipe.
     */
    public function update(Request $request, Recipe $recipe)
    {
        if ($recipe->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cooking_time' => 'nullable|integer',
            'difficulty' => 'required|in:easy,medium,hard',
            'ingredients' => 'required|array',
            'instructions' => 'required|array',
            'image_url' => 'nullable|string',
        ]);

        $recipe->update($validated);

        return back()->with('success', 'Recipe updated successfully');
    }

    /**
     * Delete a recipe.
     */
    public function destroy(Recipe $recipe)
    {
        if ($recipe->user_id !== auth()->id()) {
            abort(403);
        }

        $recipe->delete();

        return back()->with('success', 'Recipe deleted successfully');
    }

    /**
     * List user's recipes (API).
     */
    public function index(Request $request): JsonResponse
    {
        $recipes = $request->user()->recipes()
            ->latest()
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $recipes
        ]);
    }

    /**
     * Get single recipe detail.
     */
    public function show(Recipe $recipe): JsonResponse
    {
        // Check if recipe belongs to user
        if ($recipe->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $recipe
        ]);
    }

    /**
     * Toggle favorite status.
     */
    public function toggleFavorite(Recipe $recipe): JsonResponse
    {
        if ($recipe->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $recipe->update(['is_favorite' => !$recipe->is_favorite]);

        return response()->json([
            'success' => true,
            'is_favorite' => $recipe->is_favorite
        ]);
    }
}
