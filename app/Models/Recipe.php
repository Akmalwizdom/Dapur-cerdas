<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'image_url',
        'cooking_time',
        'difficulty',
        'ingredients',
        'instructions',
        'nutrition',
        'is_favorite',
    ];

    protected $casts = [
        'ingredients' => 'array',
        'instructions' => 'array',
        'nutrition' => 'array',
        'is_favorite' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
