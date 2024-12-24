<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use App\Models\IndikatorPeriode;
use App\Http\Resources\IndikatorPeriodeCollection;
use App\Http\Resources\IndikatorPeriodeResource;
use App\Http\Requests\IndikatorPeriodeRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;

class IndikatorPeriodeController extends Controller //implements ICrud 
{
    //
    public function create() {
        return Inertia::render('IndikatorPeriode/FormIndikatorPeriode', [
                    'periodes' => \App\Models\Periode::all(),
                    'indikators' => \App\Models\Indikator::all(),
                    'pics' => \App\Models\PIC::all(),
        ]);
    }

    public function destroy(IndikatorPeriode $indikatorperiode) {
        $indikatorperiode->delete();
        return Redirect::route('indikator-periode.index');
    }

    public function edit(IndikatorPeriode $indikatorperiode) {//perhatikan format penulisan case
    return Inertia::render('IndikatorPeriode/EditIndikatorPeriode', [        
        'indikator' => new IndikatorPeriodeCollection($indikatorperiode
                ->with('indikatorPeriodePic')
                ->where('indikator_periode.id', '=', $indikatorperiode->id)
                ->get()),
        'indikators' => \App\Models\Indikator::all(),
        'periodes' => \App\Models\Periode::all(),
        'pics' => \App\Models\PIC::all(),
    ]);
    }

    public function index() {
        return Inertia::render('IndikatorPeriode/ListIndikatorPeriode', [
                    'filter' => Request::all('search'),
                    'indikator_periodes' => new IndikatorPeriodeCollection(
                            IndikatorPeriode::query()
                                    ->when(Request::input('search'), function ($query, $search) {
                                        $query->join('indikator', 'indikator_periode.indikator_id','=', 'indikator.id')
                                        ->where('indikator.nama_indikator', 'like', "%{$search}%");
                                    })
                                    ->addSelect(['periode' => \App\Models\Periode::select('periode')
                                        ->whereColumn('id', 'indikator_periode.periode_id')])
                                    ->addSelect(['nama_indikator' => \App\Models\Indikator::select('nama_indikator')
                                        ->whereColumn('id', 'indikator_periode.indikator_id')])                                    
                                    ->with('indikatorPeriodePic')//relationship ----------
                                            //->with('pic')
                                    ->paginate(10)
                                    ->withQueryString()
                    )
        ]);
        //return 'Indikator periode';
    }

    public function store(IndikatorPeriodeRequest $request) {
        $validRequest = $request->validated();
        $object = new IndikatorPeriode();
        $object->create($validRequest);
        return Redirect::route('indikator-periode.index')->with('success', 'Indikator Periode created.');
    }

    public function update(IndikatorPeriode $indikatorperiode, IndikatorPeriodeRequest $request) {
        $indikatorperiode->update(
            $request->validated()
        );
        //$req = $request->input();
        $pics = $request->input('pics');
        if(is_array($pics)){
            DB::table('indikator_periode_pic')
                    ->where('indikator_periode_id', '=', $indikatorperiode->id)
                    ->delete();
            foreach($pics as $pic){
                $data = ['indikator_periode_id' => $indikatorperiode->id,
                    'pic_id' => $pic['value'],
                    'nama_pic' => $pic['label']];
                DB::table('indikator_periode_pic')->insert($data);
            }        
        }else{
            
        }
        //return $pics;
        return Redirect::route('indikator-periode.index');
    }

    public function importIndikator() {
        
            //check active periode
            $periode = DB::table('periode')
                    ->where('status', '=', 'Active')
                    ->get();

            //retrieve indikators data
            $indikators = null;
            $data['message'] = 'Undefined message';
            if ($periode->count() == 1) {
                //loop through indikators
                $indikators = DB::table('indikator')
                        ->select('indikator.*')
                        ->leftJoin('indikator_periode', 'indikator.id', '=', 'indikator_periode.indikator_id')
                        ->whereNull('indikator_periode.id')
                        ->get();

                //insert or update into indikator periode
                if ($indikators->count() > 1) {
                    for ($i = 0; $i < $indikators->count(); $i++) {
                        $indikator = $indikators[$i];
                        $obj_ind_periode = new IndikatorPeriode();
                        $obj_ind_periode->indikator_id = $indikator->id;
                        $obj_ind_periode->periode_id = $periode->first()->id;
                        $res = $obj_ind_periode->save();

                        if ($res) {
                            $data['message'] = 'Import successfull';
                            //echo 'imported</br>';
                        }
                    }
                } else {
                    $data['message'] = 'No indikator left';
                }
            } else {
                $data['message'] = 'No Active Periode Found';
            }
            $json_data = json_encode($data);
            return Redirect::back()->with($json_data);
        
    }
}
