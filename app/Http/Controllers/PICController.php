<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use App\Models\PIC;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\PicResource;
use App\Http\Requests\PicRequest;

class PICController extends Controller //implements ICrud
{
    //
    public function create() {
        return Inertia::render('Pic/FormPic');
    }

    
    public function index(): Response {
        return Inertia::render('Pic/ListPic', [
            'pics' => PIC::query()
                ->paginate(10)
                ]);
    }

    public function update(PIC $pic, PicRequest $request) {
        $pic->update(
            $request->validated()
        );
        return Redirect::route('pic.index');
    }

    public function destroy(PIC $pic) {
        $pic->delete();
        return Redirect::route('pic.index');
    }

    public function edit(PIC $pic) {
        return Inertia::render('Pic/EditPic', [
            'pic' => new PicResource($pic)            
        ]);
    }

    public function store(PicRequest $request) {
        $valid = $request->validated();
        $obj = new PIC();        
        $obj->create($valid);
        return Redirect::route('pic.index');
    }
}
