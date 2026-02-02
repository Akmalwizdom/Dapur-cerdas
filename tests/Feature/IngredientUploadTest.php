<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class IngredientUploadTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_upload_ingredient_photo()
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->postJson('/api/ingredients/upload', [
                'image' => UploadedFile::fake()->image('pantry.jpg')
            ]);

        $response->assertStatus(202)
            ->assertJsonStructure([
                'success',
                'job_id',
                'message'
            ]);

        Storage::disk('public')->assertExists('temp/ingredients/' . UploadedFile::fake()->image('pantry.jpg')->hashName());
    }

    public function test_upload_requires_image()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->postJson('/api/ingredients/upload', [
                'image' => 'not-an-image'
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['image']);
    }

    public function test_guest_cannot_upload()
    {
        $response = $this->postJson('/api/ingredients/upload', [
            'image' => UploadedFile::fake()->image('pantry.jpg')
        ]);

        $response->assertStatus(401);
    }
}
