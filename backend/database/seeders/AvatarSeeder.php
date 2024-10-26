<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Avatar;

class AvatarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Avatar::insert([
            [
                'avatar' => 'Avatar One',
                'price' => 12000
            ],
            [
                'avatar' => 'Avatar Two',
                'price' => 940598
            ],
            [
                'avatar' => 'Avatar Three',
                'price' => 63000
            ],
            [
                'avatar' => 'Avatar Four',
                'price' => 805252
            ],
            [
                'avatar' => 'Avatar Five',
                'price' => 6800000
            ],
        ]);
    }
}
