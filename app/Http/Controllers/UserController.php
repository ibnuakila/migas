<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    private $admin_permissions = [
            'user-list',
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
    
    private $user_permissions = [
            //'user-list',
            //'user-create',
            //'user-edit',
            //'user-delete',
         
            'profile-edit',
            'profile-update',
            'profile-delete',
         
            'periode-list',
            //'periode-edit',
            //'periode-create',            
            //'periode-delete',
         
            'indikator-list',
            //'indikator-create',            
            //'indikator-edit',            
            //'indikator-delete',
         
            'kompositor-list',
            //'kompositor-create',            
            //'kompositor-edit',            
            //'kompositor-delete',
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
            //'laporan-capaian-create',
            'laporan-capaian-edit',
            //'laporan-capaian-delete',
            //'laporan-capaian-importindikator',
                     
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
            //'level-create',
            //'level-edit',
            //'level-delete',
         
            'indeks-list',
            //'indeks-create',
            //'indeks-edit',
            //'indeks-delete',
         
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
    
    function __construct() {
        
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('user-list');
        //if($request->user()->hasPermissionTo('user-list')){
            return Inertia::render('User/ListUser',[
                'users' => User::query()
                    ->with('roles')
                    ->with('pic')
                    ->get()
            ]);
        /*}else{
            return "Unauthorized Access!";
        }*/
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $this->authorize('user-create');
        //if($request->user()->hasPermissionTo('user-create')){
            return Inertia::render('User/FormUser',[
                'pics' => \App\Models\PIC::all(),
                'roles' => \Spatie\Permission\Models\Role::all()
            ]);
        /*}else{
            return "Unauthorized Access!";
        }*/
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('user-create');
        //if($request->user()->hasPermissionTo('user-create')){
            $validator = \Illuminate\Support\Facades\Validator::make($request->all(),[
                'name' => ['required'],
                'email' => ['required'],
                'password' => ['required'],
                'pic_id' => ['required'],
                'role' => ['required']
            ])->validate();
            //insert user
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'pic_id' => $request->input('pic_id'),
            ]);
            
            //role
            $role = \Spatie\Permission\Models\Role::findById($request->input('role'));
            $user->assignRole([$role->id]);
            $message = "User Created!";
            return Redirect::back()->with('message', $message);
        /*}else{
            $message = "Unauthorized Access!";
            return Redirect::back()->with('message', $message);
        }*/
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user, Request $request)
    {
        $this->authorize('user-list');
        //if($request->user()->hasPermissionTo('user-list')){
            //return "Hello from user index";
        /*}else{
            return "Unauthorized Access!";
        }*/
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user, Request $request)
    {
        $this->authorize('user-edit');
        //if($request->user()->hasPermissionTo('user-edit')){
            return "Hello from user index";
        /*}else{
            return "Unauthorized Access!";
        }*/
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(User $user, Request $request)
    {
        $this->authorize('user-edit');
        //if($request->user()->hasPermissionTo('user-edit')){
            return "Hello from user index";
        /*}else{
            return "Unauthorized Access!";
        }*/
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user, Request $request)
    {
        if($request->user()->hasPermissionTo('user-delete')){
            return "Hello from user index";
        }else{
            return "Unauthorized Access!";
        }
    }
    
    public function createRole()
    {
        //$role = \Spatie\Permission\Models\Role::create(['name' => 'User']);
        //$role = Role::where('name', 'Administrator')->first();
        
        //$permissions = Permission::pluck('id', 'id')->all();

        //$role->syncPermissions($this->user_permissions);
        return "Role Created";
    }
}
