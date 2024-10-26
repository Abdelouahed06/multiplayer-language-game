<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Player extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'id', 'name', 'gender', 'email', 'password', 'country', 'avatar_id', 'nlang_id', 'glang_id'
        , 'level', 'points', 'wins', 'losses', 'coins', 'state'
    ];

    public function nativeLanguage()
    {
        return $this->belongsTo(Language::class, 'nlang_id');
    }

    public function goalLanguage()
    {
        return $this->belongsTo(Language::class, 'glang_id');
    }

    public function avatar() {
        return $this->belongsTo(Avatar::class);
    }

    public function avatars() {
        return $this->belongsToMany(Avatar::class);
    }
    
    public function invitations()
    {
        return $this->belongsToMany(Player::class, 'invitations', 'player_id', 'inviter_id');
    }

    public function friends()
    {
        return $this->belongsToMany(Player::class, 'friends', 'player_id', 'friend_id');
    }

}
