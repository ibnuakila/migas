<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\KompositorRequest;
use App\Models\Kompositor;
use App\Models\IndikatorKompositor;
use Illuminate\Support\Facades\DB;

class KompositorController extends Controller
{
    public function create(\App\Models\Indikator $indikator) {
        return Inertia::render('IndikatorKompositor/FormKompositor',[
            'indikator' => new \App\Http\Resources\IndikatorResource($indikator),
            'indeks' => \App\Models\Indeks::all(),
            'jenis_kompositor' => \App\Models\JenisKompositor::all(),
            'kompositors' => Kompositor::all(),
            'parameters' => DB::table('parameter')
                ->join('indeks', 'parameter.indeks_id', '=', 'indeks.id')
                ->select('parameter.*', 'indeks.nama_indeks')
                ->get()
        ]);
    }

    public function destroy(Kompositor $kompositor) {
        $indikator_id = 0;
        if($kompositor->jenis_kompositor_id == 2){
            $indeks = \App\Models\Indeks::find($kompositor->indeks_id);            
            $kompositors = Kompositor::where('indeks_id', $indeks->id)->get();
            foreach ($kompositors as $komp) {
                $indikator_kompositor = IndikatorKompositor::where('kompositor_id', $komp->id)->get();
                foreach ($indikator_kompositor as $idk_kom) {
                    $indikator_id = $idk_kom->indikator_id;

                    $idk_kom->delete();//delete indikator_kompositor
                }
                    $komp->delete();//delete kompositor
            }
            $indeks_child = \App\Models\Indeks::where('parent_id', $indeks->id)->get();
            foreach ($indeks_child as $value) {
                $value->delete();//delete indeks
            }
        }else{
            $indikator_kompositor = IndikatorKompositor::where('kompositor_id', $kompositor->id)->first();
            $indikator_id = $indikator_kompositor->indikator_id;
            $indikator_kompositor->delete();
            $kompositor->delete();
        }
        return Redirect::route('kompositor.index-indikator', $indikator_id);
    }

    public function edit(Kompositor $kompositor) {
        //$ind_kompositor = IndikatorKompositor::where()
        $indikator_kompositor = $kompositor->indikatorKompositor()->firstOrNew();
        return Inertia::render('IndikatorKompositor/EditKompositor',[
            'kompositor' => new \App\Http\Resources\KompositorResource(
                    $kompositor->with('kompositorParameter')->where('id','=',$kompositor->id)->get()->first()),
            'kompositors' => Kompositor::all(),
            'indikator' => new \App\Http\Resources\IndikatorResource(\App\Models\Indikator::where('id',$indikator_kompositor->indikator_id)->get()),
            'indeks' => \App\Models\Indeks::all(),
            'jenis_kompositor' => \App\Models\JenisKompositor::all(),
            'parameters' => DB::table('parameter')
                ->join('indeks', 'parameter.indeks_id', '=', 'indeks.id')
                ->select('parameter.*', 'indeks.nama_indeks')
                ->get()
         ]);
    }

    public function index() {
         return Inertia::render('IndikatorKompositor/ListIndikatorKompositor',[
             'kompositors' => DB::table('kompositor')
                 ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                 ->join('indikator', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                 ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                 ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                 ->select(
                         'kompositor.*',
                         'indikator.nama_indikator',
                         'jenis_kompositor.nama_jenis_kompositor',
                         'indeks.nama_indeks')
                 //->where('indikator.id', '=', $indikator->id)
                 ->get(),             
             'indikator' => '',       
         ]);
    }
    
    public function indexIndikator(\App\Models\Indikator $indikator) {
         return Inertia::render('IndikatorKompositor/ListIndikatorKompositor',[
             'kompositors' => DB::table('kompositor')
                 ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                 ->join('indikator', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                 ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                 ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                 ->select(
                         'kompositor.*',
                         'indikator.nama_indikator',
                         'jenis_kompositor.nama_jenis_kompositor',
                         'indeks.nama_indeks')
                 ->where('indikator.id', '=', $indikator->id)
                 ->get(),             
             'indikator' => $indikator,
         ]);
    }

    public function store(Request $request) {
        
        if($request->input('sumber_kompositor') == 'New'){
            $validator = \Illuminate\Support\Facades\Validator::make($request->all(),[
                'nama_kompositor' => ['required'],
                'satuan' => ['required'],
                'indeks_id' => ['required'],
                'jenis_kompositor_id' => ['required'],
                'indikator_id' => ['required'],                
                'sumber_kompositor' => ['required']
            ]);
            $validated = $validator->validated();
            $kompositor = Kompositor::create($validated);
            
            $data = ['indikator_id' => $request->input('indikator_id'),
                'kompositor_id' => $kompositor->id];
            IndikatorKompositor::create($data);
            if($request->input('jenis_kompositor_id')=='2'){
                $data_indeks = ['nama_indeks' => $request->input('nama_kompositor'),
                    'parent_id' => $request->input('indeks_id')];
                DB::table('indeks')
                        ->where('nama_indeks', '=', $request->input('nama_kompositor'))
                        ->where('parent_id', '=', $request->input('indeks_id'))
                        ->delete();
                \App\Models\Indeks::create($data_indeks);
            }elseif($request->input('jenis_kompositor_id')=='3'){
                $data_param = ['parameter_id' => $request->input('parameter_id'),
                    'kompositor_id' => $request->input('kompositor_id')];
                DB::table('kompositor_parameter')
                        ->where('parameter_id', '=', $request->input('kompositor_id'))
                        ->where('kompositor_id', '=', $request->input('kompositor_id'))
                        ->delete();
                \App\Models\KompositorParameter::create($data_param);
            }
            
        }elseif($request->input('sumber_kompositor') == 'Existing Indikator'){//existing indikator
            //tambahkan validasi
            $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                'indikator_id' => 'required',
                'kompositor_id' => 'required'
            ]);
            $validated = $validator->validated();            
            IndikatorKompositor::create($validated);
            
        }else{//existing kompositor
            //tambahkan validasi
            $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                //'indikator_id' => 'required',
                'kompositor_id' => 'required'
            ]);
            //cari kompositor existing
            $ref_kompositor = Kompositor::where('id',$request->input('kompositor_id'))->first();
            $ref_kom_data = [
                'nama_kompositor' => str($ref_kompositor->nama_kompositor),
                'satuan' => str($ref_kompositor->satuan),
                'indeks_id' => $request->input('indeks_id'),
                'jenis_kompositor_id' => $ref_kompositor->jenis_kompositor_id, //diubah
                'indikator_id' => $ref_kompositor->indikator_id,                
                'sumber_kompositor' => str($request->input('type_kompositor'))
            ];
            //tambahkan kompositor baru dari data kompositor existing
            $kompositor = Kompositor::create($ref_kom_data);
            
            //input kompositor of kompositor
            $data_kompositor_of = ['kompositor_id' => $kompositor->id,
                'ref_kompositor_id' => $request->input('kompositor_id')];
            \App\Models\KompositorOfKompositor::create($data_kompositor_of);
            
            //input indikator kompositor
            $data_indikator_kompositor = ['indikator_id' => $request->input('indikator_id'),
                'kompositor_id' => $kompositor->id];
            IndikatorKompositor::create($data_indikator_kompositor);            
            
        }
        
        return Redirect::route('kompositor.index-indikator',$request->input('indikator_id'));
    }

    public function update(Kompositor $kompositor, KompositorRequest $request) {
        $kompositor->update($request->validated());
            if($request->input('jenis_kompositor_id')=='2'){                
                $data_indeks = ['nama_indeks' => $request->input('nama_kompositor'),
                    'parent_id' => $request->input('indeks_id')];
                DB::table('indeks')
                        ->where('nama_indeks', '=', $request->input('nama_kompositor'))
                        ->where('parent_id', '=', $request->input('indeks_id'))
                        ->delete();
                \App\Models\Indeks::create($data_indeks);
            }elseif($request->input('jenis_kompositor_id')=='3'){
                $data_param = ['parameter_id' => $request->input('parameter_id'),
                    'kompositor_id' => $request->input('kompositor_id')];
                DB::table('kompositor_parameter')
                        ->where('parameter_id', '=', $request->input('kompositor_id'))
                        ->where('kompositor_id', '=', $request->input('kompositor_id'))
                        ->delete();
                \App\Models\KompositorParameter::create($data_param);
            }
        /*$data = ['indikator_id' => $request->input('indikator_id'),
            'kompositor_id' => $object->id];
        IndikatorKompositor::create($data);*/
        return Redirect::route('kompositor.index-indikator', $request->input('indikator_id'));
    }
    
    public function agregasiKompositor(\App\Models\Indeks $indeks) {
         return Inertia::render('IndikatorKompositor/ListIndikatorKompositor',[
             'kompositors' => DB::table('kompositor')
                 ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                 ->join('indikator', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                 ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                 ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                 ->select(
                         'kompositor.*',
                         'indikator.nama_indikator',
                         'jenis_kompositor.nama_jenis_kompositor',
                         'indeks.nama_indeks')
                 ->where('indeks.id', '=', $indeks->id)
                 ->get(),             
             //'indikator' => $indikator,
         ]);
    }
}
