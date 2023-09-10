<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Enums\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        DB::table('roles')->insert(
            [

                [
                    'name_role' => Role::NormalUser->value,
                    'authority' => 'can buy product',
                ],
                [
                    'name_role' => Role::StoreOwner->value,
                    'authority' => 'owner of the shop and can upload product in individual store',
                ],
                [
                    'name_role' => Role::Admin->value,
                    'authority' => 'Can Do Anything',
                ],
            ]
        );
    }
}
