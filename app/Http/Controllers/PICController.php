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
        return Inertia::render('Pic/FormPic',[
                'parent' => PIC::all()]);
    }

    
    public function index(): Response {
        return Inertia::render('Pic/ListPic', [
            'pics' => PIC::query()
                ->paginate()
                ]);
    }

    public function update(PIC $pic, PicRequest $request) {
        $pic->update(
            $request->validated()
        );
        activity()
                ->causedBy(auth()->user())
                ->performedOn($pic)
                ->withProperties([
                    'ip' => request()->ip(),
                    'user_agent' => request()->header('User-Agent'),
                    'pic_id' => $pic->id                
                ])
                ->createdAt(now()->subDays(10))
                ->event('update')
                ->log('PIC Update');
        return Redirect::route('pic.index');
    }

    public function destroy(PIC $pic) {
        $pic->delete();
        activity()
                ->causedBy(auth()->user())
                ->performedOn($pic)
                ->withProperties([
                    'ip' => request()->ip(),
                    'user_agent' => request()->header('User-Agent'),
                    'pic_id' => $pic->id                
                ])
                ->createdAt(now()->subDays(10))
                ->event('destroy')
                ->log('PIC Delete');
        return Redirect::route('pic.index');
    }

    public function edit(PIC $pic) {
        return Inertia::render('Pic/EditPic', [
            'pic' => new PicResource($pic),
            'parent' => PIC::all()
        ]);
    }

    public function store(PicRequest $request) {
        $valid = $request->validated();
        $obj = new PIC();        
        $obj->create($valid);
        activity()
                ->causedBy(auth()->user())
                ->performedOn($obj)
                ->withProperties([
                    'ip' => request()->ip(),
                    'user_agent' => request()->header('User-Agent'),
                    'pic_id' => $obj->id                
                ])
                ->createdAt(now()->subDays(10))
                ->event('store')
                ->log('PIC Insert');
        return Redirect::route('pic.index');
    }
}
