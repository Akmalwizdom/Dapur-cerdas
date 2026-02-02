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
        $user = User::factory()->create(['email_verified_at' => now()]);

        $file = UploadedFile::fake()->image('pantry.jpg');
        $response = $this->actingAs($user)
            ->postJson(route('cooking.ingredients.upload'), [
                'image' => $file
            ]);

        $response->assertStatus(202)
            ->assertJsonStructure([
                'success',
                'job_id',
                'message'
            ]);

        Storage::disk('public')->assertExists('temp/ingredients/' . $file->hashName());
    }

    public function test_upload_requires_image()
    {
        $user = User::factory()->create(['email_verified_at' => now()]);

        $response = $this->actingAs($user)
            ->postJson(route('cooking.ingredients.upload'), [
                'image' => 'not-an-image'
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['image']);
    }

    public function test_guest_cannot_upload()
    {
        $response = $this->postJson(route('cooking.ingredients.upload'), [
            'image' => UploadedFile::fake()->image('pantry.jpg')
        ]);

        $response->assertStatus(401);
    }
}
