<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory;
    protected $fillable = [
        'language', 'short_form', 'native_state', 'goal_state'
    ];

    public function nativePlayers()
    {
        return $this->hasMany(Player::class, 'nlang_id');
    }

    public function learningPlayers()
    {
        return $this->hasMany(Player::class, 'glang_id');
    }

}
