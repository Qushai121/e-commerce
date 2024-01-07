<?php

namespace Database\Seeders;

use App\Models\SpecialAccess;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpecialAccessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // SpecialAccess::factory(10)->create();


        DB::table('special_accesss')->insert(
            [
                [
                    'special_access' => 'Shop Owner',
                    'price' => 0,
                    'permission' => 'shop_owner',
                    'duration' => fake()->date(),
                    'stock' => 10000000000000000,
                    'description' => 'with this you can make and manage you owner store with products in individual store',
                    'image' => 'special_access/special_access.jpg',
                    'created_at' => fake()->date(),
                    'updated_at' => fake()->date(),
                ],
                [
                    'special_access' => 'Make 3 Store',
                    'price' => 500,
                    'permission' => 'store_3',
                    'duration' => fake()->date(),
                    'stock' => 20,
                    'description' => 'with this you can have not one store on one account but 3 store in one account',
                    'image' => 'special_access/special_access.jpg',
                    'created_at' => fake()->date(),
                    'updated_at' => fake()->date(),
                ],
            ]
        );
    }
}
