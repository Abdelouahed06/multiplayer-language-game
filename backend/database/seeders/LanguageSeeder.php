<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Language;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Language::insert([
            [
                'language' => 'English',
                'native_state' => true,
                'goal_state' => true,
                'short_form' => 'EN'
            ],
            [
                'language' => 'Arabic',
                'native_state' => true,
                'goal_state' => true,
                'short_form' => 'AR'
            ],
            [
                'language' => 'Frensh',
                'native_state' => true,
                'goal_state' => true,
                'short_form' => 'FR'
            ],
            [
                'language' => 'Spanish',
                'native_state' => true,
                'goal_state' => false,
                'short_form' => 'ES'
            ],
            [
                'language' => 'Germany',
                'native_state' => true,
                'goal_state' => false,
                'short_form' => 'GR'
            ],
            [
                'language' => 'Russian',
                'native_state' => false,
                'goal_state' => true,
                'short_form' => 'RU'
            ],
        ]);
    }
}
