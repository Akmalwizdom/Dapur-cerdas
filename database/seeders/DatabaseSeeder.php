<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Get the first user or create one if none exists (fallback, though user likely exists)
        $user = \App\Models\User::first();

        if (!$user) {
            $user = \App\Models\User::factory()->create([
                'name' => 'wizdom',
                'email' => 'faiqihya@gmail.com',
            ]);
        }

        // Create recipes for this user
        \App\Models\Recipe::factory(12)->create([
            'user_id' => $user->id,
        ]);
    }
}
