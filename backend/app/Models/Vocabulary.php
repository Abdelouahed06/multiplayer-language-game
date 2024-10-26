<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vocabulary extends Model
{
    use HasFactory;

    protected $fillable = ['image_id','definition', 'op1', 'op2', 'op3', 'op4', 'glang_id', 'level'];

   
    public function image() {
        return $this->belongsTo(Image::class);
    }

    public function goalLanguage() {
        return $this->belongsTo(Language::class, 'glang_id');
    }

}
