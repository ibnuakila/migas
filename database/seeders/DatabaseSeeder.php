<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    
     private $permissions = [
            /*'profile-edit',
            //'profile-update',
            'profile-delete',
            'periode-list',
            'periode-edit',
            'periode-create',
            //'periode-store',
            //'periode-update',
            'periode-delete',
            'indikator-list',
            'indikator-create',
            //'indikator-store',
            'indikator-edit',
            //'indikator-update',
            'indikator-delete',
            'indikator-kompositor-list',
            'indikator-kompositor-create',
            //'indikator-kompositor-store',
            'indikator-kompositor-edit',
            //'indikator-kompositor-update',
            'indikator-kompositor-delete',
            'indikator-kompositor-list-indikator',
            'hitung-kompositor-list',
            'hitung-kompositor-create',
            //'hitung-kompositor-store',
            'hitung-kompositor-edit',
            //'hitung-kompositor-update',
            'hitung-kompositor-delete',
            'pic-list',
            'pic-create',
            'pic-edit',
            'pic-delete',
            'laporan-capaian-list',
            'laporan-capaian-create',
            'laporan-capaian-edit',
            'laporan-capaian-delete',
            'laporan-capaian-importindikator',
            'laporan-capaian-calculatekinerja',
            'input-realisasi-list',
            'input-realisasi-create',
            'input-realisasi-edit',
            'input-realisasi-delete',
            'input-realisasi-importkompositor',
            'input-realisasi-calculaterealization',
            'satuan-list',
            'satuan-create',
            'satuan-edit',
            'satuan-delete',
            'level-list',
            'level-create',
            'level-edit',
            'level-delete',
            'indeks-list',
            'indeks-create',
            'indeks-edit',
            'indeks-delete',
            'kategori-kinerja-list',
            'kategori-kinerja-create',
            'kategori-kinerja-edit',
            'kategori-kinerja-delete'*/
        ];
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        /*foreach ($this->permissions as $permission) {
            Permission::create(['name' => $permission]);
        }*/
        
        // Create admin User and assign the role to him.
        $user = \App\Models\User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('P@ssw0rd'),
        ]);
        $role = Role::create(['name' => 'Administrator']);

        $permissions = Permission::pluck('id', 'id')->all();

        $role->syncPermissions($permissions);

        $user->assignRole([$role->id]);
        
    }
   
}
