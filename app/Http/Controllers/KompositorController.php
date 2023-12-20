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
            'indikators' => \App\Models\Indikator::all(),
            'indeks' => \App\Models\Indeks::all(),
            'jenis_kompositor' => \App\Models\JenisKompositor::all(),
            'kompositors' => Kompositor::all(),
            'parameters' => DB::table('parameter')
                ->join('indeks', 'parameter.indeks_id', '=', 'indeks.id')
                ->select('parameter.*', 'indeks.nama_indeks')
                ->get(),
            'sumber_kompositor' => \App\Models\SumberKompositor::all()
        ]);
    }

    public function destroy(Kompositor $kompositor, \Illuminate\Support\Facades\Request $request) {
        $indikator_id = 0;
        if($kompositor->jenis_kompositor_id == 1){//input
            $indikator_kompositor = IndikatorKompositor::where('kompositor_id', $kompositor->id)->first();
            $indikator_id = $indikator_kompositor->indikator_id;
            $indikator_kompositor->delete();//delete indikator kompositor
            $kompositor->delete();//delete kompositor
        }else if($kompositor->jenis_kompositor_id == 2){//agregasi
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
        }else{//parameter
            //delete kompositor parameter
            $komp_param = \App\Models\KompositorParameter::where([
                'kompositor_id' => $kompositor->id,
                'parameter_id' => $request->input('parameter_id')])->first();
            if($komp_param !== null){
                $komp_param->delete();
            }
            //delete parameter
            $parameter = \App\Models\Parameter::where('id', $request->input('parameter_id'))->first();
            if($komp_param !== null){
                $parameter->delete();
            }
            //delete kompositor of kompositor if exist
            $komp_of_komp = \App\Models\KompositorOfKompositor::where('kompositor_id', $kompositor->id)->first();
            if($komp_of_komp !== null){
                $komp_of_komp->delete();
            }
            //delete kompositor
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
            'indikator' => new \App\Http\Resources\IndikatorResource(\App\Models\Indikator::where('id',$indikator_kompositor->indikator_id)->first()),
            'indeks' => \App\Models\Indeks::all(),
            'jenis_kompositor' => \App\Models\JenisKompositor::all(),
            'parameter' => function(Kompositor $kompositor){ 
                    $kompositor_parameter = \App\Models\KompositorParameter::where('kompositor_id', $kompositor->id)->first();
                    if($kompositor_parameter !== null){
                        return \App\Models\Parameter::where('id', $kompositor_parameter->parameter_id)->first();
                    }else{
                        return null;
                    }
                },
            'parameters' => DB::table('parameter')
                ->join('indeks', 'parameter.indeks_id', '=', 'indeks.id')
                ->select('parameter.*', 'indeks.nama_indeks')
                ->get(),
            'sumber_kompositor' => \App\Models\SumberKompositor::all()
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
                 ->orderBy('indeks.nama_indeks', 'asc')
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
                         'indeks.id as _indeks_id',
                         'indeks.nama_indeks')
                 ->where('indikator.id', '=', $indikator->id)
                 ->orderBy('_indeks_id', 'asc')
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
            if($request->input('jenis_kompositor_id')=='2'){//agregasi
                $data_indeks = ['nama_indeks' => $request->input('nama_kompositor'),
                    'parent_id' => $request->input('indeks_id')];
                DB::table('indeks')
                        ->where('nama_indeks', '=', $request->input('nama_kompositor'))
                        ->where('parent_id', '=', $request->input('indeks_id'))
                        ->delete();
                \App\Models\Indeks::create($data_indeks);
            }elseif($request->input('jenis_kompositor_id')=='3'){//parameter
                $data_param = ['parameter_id' => $request->input('parameter_id'),
                    'kompositor_id' => $kompositor->id];
                
                //simpan parameter
                if($data_param['parameter_id'] == ''){//parameter baru
                    $parameter = \App\Models\Parameter::create([
                        'nama_parameter' => $request->input('nama_kompositor'),
                        'value' => $request->input('value'),
                        'indeks_id' => $request->input('indeks_id')]);
                    
                    \App\Models\KompositorParameter::create([
                        'parameter_id' => $parameter->id,
                        'kompositor_id' => $kompositor->id
                    ]);
                }else{//existing parameter
                    \App\Models\KompositorParameter::create($data_param);
                }
                
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
                'sumber_kompositor' => str($request->input('sumber_kompositor'))
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

    public function update(Kompositor $kompositor, \Illuminate\Http\Request $request) {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(),[
                    'nama_kompositor' => ['required'],
                    'satuan' => ['required'],
                    'indeks_id' => ['required'],
                    'jenis_kompositor_id' => ['required'],
                    'sumber_kompositor' => ['required']
                ]);
        $kompositor->update($validator->validated());
            if($request->input('jenis_kompositor_id')=='2'){//agregasi                
                $data_indeks = ['nama_indeks' => $request->input('nama_kompositor'),
                    'parent_id' => $request->input('indeks_id')];
                DB::table('indeks')
                        ->where('nama_indeks', '=', $request->input('nama_kompositor'))
                        ->where('parent_id', '=', $request->input('indeks_id'))
                        ->delete();
                \App\Models\Indeks::create($data_indeks);
            }elseif($request->input('jenis_kompositor_id')=='3'){//parameter
                $validator = \Illuminate\Support\Facades\Validator::make($request->all(),[
                    'value' => ['required'],
                    'kalkulasi' => ['required'],
                    'indeks_id' => ['required'],                   
                ]);
                $validated = $validator->validated();
                $data_param = ['parameter_id' => $request->input('parameter_id'),
                    'kompositor_id' => $request->input('kompositor_id')];
                DB::table('kompositor_parameter')
                        ->where('parameter_id', '=', $request->input('parameter_id'))
                        ->where('kompositor_id', '=', $request->input('kompositor_id'))
                        ->delete();
                \App\Models\KompositorParameter::create($data_param);
                
                $parameter = \App\Models\Parameter::where('id', $data_param['parameter_id'])
                        ->update([
                            'nama_parameter' => $request->input('nama_kompositor'),
                            'kalkulasi' => $request->input('kalkulasi'),
                            'value' => $request->input('value'),
                            'indeks_id' => $request->input('indeks_id')]);
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
