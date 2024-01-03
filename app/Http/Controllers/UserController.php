<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserController extends Controller
{
    function __construct() {
        //$this->middleware('permission:user-list', ['only' => ['index','show']]);
        //$user->hasPermission('user-list');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->user()->hasPermissionTo('user-list')){
            return Inertia::render('');
        }else{
            return "Unauthorized Access!";
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        if($request->user()->hasPermissionTo('user-create')){
            return Inertia::render('User/FormUser',[
                'pics' => \App\Models\PIC::all(),
            ]);
        }else{
            return "Unauthorized Access!";
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($request->user()->hasPermissionTo('user-create')){
            return "Hello from user index";
        }else{
            return "Unauthorized Access!";
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user, Request $request)
    {
        if($request->user()->hasPermissionTo('user-list')){
            return "Hello from user index";
        }else{
            return "Unauthorized Access!";
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user, Request $request)
    {
        if($request->user()->hasPermissionTo('user-edit')){
            return "Hello from user index";
        }else{
            return "Unauthorized Access!";
        }
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
        if($request->user()->hasPermissionTo('user-edit')){
            return "Hello from user index";
        }else{
            return "Unauthorized Access!";
        }
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
}
