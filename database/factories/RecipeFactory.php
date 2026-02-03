<?php

namespace Database\Factories;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recipe>
 */
class RecipeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ingredients = [];
        $numIngredients = $this->faker->numberBetween(3, 8);
        for ($i = 0; $i < $numIngredients; $i++) {
            $ingredients[] = [
                'name' => $this->faker->word(),
                'amount' => $this->faker->numberBetween(1, 500) . ' ' . $this->faker->randomElement(['g', 'ml', 'pcs', 'tsp', 'tbsp']),
            ];
        }

        $instructions = [];
        $numInstructions = $this->faker->numberBetween(3, 6);
        for ($i = 0; $i < $numInstructions; $i++) {
            $instructions[] = $this->faker->sentence();
        }

        $foodImages = [
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800', // Salad
            'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=800', // Pancakes
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800', // Pizza
            'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=800', // Sandwich
            'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=800', // Toast
            'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800', // Pasta
            'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800', // Healthy bowl
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800', // Steak
        ];

        return [
            'user_id' => User::factory(), // Default to creating a user, but can be overridden
            'title' => $this->faker->randomElement(['Spicy', 'Sweet', 'Savory', 'Grilled', 'Roasted', 'Fried']) . ' ' . $this->faker->word(),
            'description' => $this->faker->paragraph(),
            'image_url' => $this->faker->randomElement($foodImages),
            'cooking_time' => $this->faker->numberBetween(15, 120),
            'difficulty' => $this->faker->randomElement(['easy', 'medium', 'hard']),
            'ingredients' => $ingredients,
            'instructions' => $instructions,
            'nutrition' => [
                'calories' => $this->faker->numberBetween(200, 800) . ' kcal',
                'protein' => $this->faker->numberBetween(10, 50) . 'g',
                'carbs' => $this->faker->numberBetween(20, 100) . 'g',
                'fat' => $this->faker->numberBetween(5, 30) . 'g',
            ],
            'is_favorite' => $this->faker->boolean(20),
        ];
    }
}
