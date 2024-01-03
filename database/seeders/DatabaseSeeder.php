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
            //'user-list',
            'user-create',
            'user-edit',
            'user-delete',
         
            'profile-edit',
            'profile-update',
            'profile-delete',
         
            'periode-list',
            'periode-edit',
            'periode-create',            
            'periode-delete',
         
            'indikator-list',
            'indikator-create',            
            'indikator-edit',            
            'indikator-delete',
         
            'kompositor-list',
            'kompositor-create',            
            'kompositor-edit',            
            'kompositor-delete',
            'kompositor-list-of-indikator',
         
            'hitung-kompositor-list',
            'hitung-kompositor-create',            
            'hitung-kompositor-edit',            
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
            'kategori-kinerja-delete',
         
            'input-kinerja-list',
            'input-kinerja-create',
            'input-kinerja-edit',
            'input-kinerja-delete',
            'input-kinerja-calculate-kinerja'
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
        foreach ($this->permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
        
        // Create admin User and assign the role to him.
        $user = \App\Models\User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('P@ssw0rd'),
            'pic_id' => 1,
        ]);
        $user = \App\Models\User::where('id', 1)->first();
        
        $role = Role::create(['name' => 'Administrator']);
        $role = Role::where('name', 'Administrator')->first();
        
        $permissions = Permission::pluck('id', 'id')->all();

        $role->syncPermissions($permissions);

        $user->assignRole([$role->id]);
        
    }
   
}
