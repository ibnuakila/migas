<?php

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/PHPInterface.php to edit this template
 */

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Response;
/**
 *
 * @author ibnua
 */
interface ICrud {
    //put your code here
    public function create();
    public function store();
    public function index();
    public function edit();
    public function update();
    public function destroy();
}
