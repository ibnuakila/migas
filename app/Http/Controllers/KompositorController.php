<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
//use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\KompositorRequest;
use App\Models\Kompositor;
use App\Models\IndikatorKompositor;
use Illuminate\Support\Facades\DB;

class KompositorController extends Controller {
    //var $request = Illuminate\Http\Request;
    
    public function create(\App\Models\Indikator $indikator, Request $request) {
        $this->authorize('kompositor-create');
        
            return Inertia::render('IndikatorKompositor/FormKompositor', [
                        'indikator' => new \App\Http\Resources\IndikatorResource($indikator),
                        'indikators' => \App\Models\Indikator::query()
                                ->with('level')
                                ->join('indikator_kompositor', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                                ->join('kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                                ->where('kompositor.jenis_kompositor_id', 2)
                                ->whereColumn('kompositor.nama_kompositor', 'indikator.nama_indikator')
                                ->select('indikator.*', 'indikator_kompositor.kompositor_id', 'kompositor.nama_kompositor')
                                ->get(),
                        'indeks' => \App\Models\Indeks::all(),
                        'jenis_kompositor' => \App\Models\JenisKompositor::all(),
                        'kompositors' => Kompositor::query()->with('jenisKompositor')
                                ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                                ->where('indikator_kompositor.indikator_id', $indikator->id)
                                ->get(),
                        'parameters' => DB::table('parameter')
                                ->join('indeks', 'parameter.indeks_id', '=', 'indeks.id')
                                ->select('parameter.*', 'indeks.nama_indeks')
                                ->get(),
                        'sumber_kompositor' => \App\Models\SumberKompositor::all(),
                        //'def_pics' => ($this->getPics($kompositor)),
                        'pics' => \App\Models\PIC::all(),
            ]);
       
    }

    public function destroy(Kompositor $kompositor, Request $request) {
        $this->authorize('kompositor-delete');
        
            $indikator_id = 0;
            if ($kompositor->jenis_kompositor_id == 1) {//input
                try{
                    DB::beginTransaction();
                    $indikator_kompositor = IndikatorKompositor::where('kompositor_id', $kompositor->id)->first();
                    $indikator_id = $indikator_kompositor->indikator_id;
                    $indikator_kompositor->delete(); //delete indikator kompositor
                    $kompositor->delete(); //delete kompositor
                    DB::commit();
                } catch (\Exception $e){
                    DB::rollBack();
                    return $e;
                }
            } else if ($kompositor->jenis_kompositor_id == 2) {//agregasi
                $indeks = \App\Models\Indeks::find($kompositor->indeks_id);
                $kompositors = Kompositor::where('indeks_id', $indeks->id)->get();
                try{
                    DB::beginTransaction();
                    foreach ($kompositors as $komp) {
                        $indikator_kompositor = IndikatorKompositor::where('kompositor_id', $komp->id)->get();
                        foreach ($indikator_kompositor as $idk_kom) {
                            $indikator_id = $idk_kom->indikator_id;

                            $idk_kom->delete(); //delete indikator_kompositor
                        }
                        
                        $kompositor_pic = \App\Models\KompositorPic::where('kompositor_id', $komp->id)->get();
                        foreach($kompositor_pic as $kom_pic){
                            $kom_pic->delete();
                        }
                        $komp->delete(); //delete kompositor
                    }
                    $indeks_child = \App\Models\Indeks::where('parent_id', $indeks->id)->get();
                    foreach ($indeks_child as $value) {
                        $value->delete(); //delete indeks
                    }
                    DB::commit();
                } catch (\Exception $e){
                    DB::rollBack();
                    return $e;
                }
            } else if ($kompositor->jenis_kompositor_id == 3) {//parameter
                //pakai transaction -------------------------
                try{
                    DB::beginTransaction();
                    $indikator_kompositor = IndikatorKompositor::where('kompositor_id', $kompositor->id)->first();
                    $indikator_id = $indikator_kompositor->indikator_id;
                    
                    //1. delete kompositor parameter
                    $komp_param = \App\Models\KompositorParameter::where([
                                'kompositor_id' => $kompositor->id,
                                'parameter_id' => $request->input('parameter_id')])->first();
                    if ($komp_param !== null) {
                        $komp_param->delete();
                    }
                    //2. delete parameter
                    $parameter = \App\Models\Parameter::where('id', $request->input('parameter_id'))->first();
                    if ($komp_param !== null) {
                        $parameter->delete();
                    }
                    //3. delete kompositor of kompositor if exist
                    $komp_of_komp = \App\Models\KompositorOfKompositor::where('kompositor_id', $kompositor->id)->first();
                    if ($komp_of_komp !== null) {
                        $komp_of_komp->delete();
                    }
                    //4. delete indikator kompositor
                    $indikator_kompositor->delete(); 
                    //5. delete kompositor
                    $kompositor->delete();
                    
                    DB::commit();
                } catch (\Exception $e){
                    DB::rollBack();
                    return $e;
                }
            }else if ($kompositor->jenis_kompositor_id == 4) {
                
            }
            return Redirect::route('kompositor.index-indikator', $indikator_id);
        
    }

    public function edit(Kompositor $kompositor, Request $request) {
        $this->authorize('kompositor-edit');
        
            //$ind_kompositor = IndikatorKompositor::where()
            $indikator_kompositor = $kompositor->indikatorKompositor()->firstOrNew();
            $kompositor_parameter = \App\Models\KompositorParameter::where('kompositor_id', $kompositor->id)->first();
            return Inertia::render('IndikatorKompositor/EditKompositor', [
                        'kompositor' => new \App\Http\Resources\KompositorResource(
                                $kompositor->with('kompositorParameter')->where('id', '=', $kompositor->id)->get()->first()),
                        'kompositors' => Kompositor::query()
                                ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                                ->where('indikator_kompositor.indikator_id', $indikator_kompositor->indikator_id)
                                ->get(),
                        'indikator' => new \App\Http\Resources\IndikatorResource(\App\Models\Indikator::where('id', $indikator_kompositor->indikator_id)->first()),
                        'indeks' => \App\Models\Indeks::all(),
                        'jenis_kompositor' => \App\Models\JenisKompositor::all(),
                        'parameter' => $kompositor_parameter !== null ? \App\Models\Parameter::where('id', $kompositor_parameter->parameter_id)->first() : null,
                        'parameters' => DB::table('parameter')
                                ->join('indeks', 'parameter.indeks_id', '=', 'indeks.id')
                                ->select('parameter.*', 'indeks.nama_indeks')
                                ->get(),
                        'sumber_kompositor' => \App\Models\SumberKompositor::all(),
                        'def_pics' => ($this->getPics($kompositor)),
                        'pics' => \App\Models\PIC::all(),
            ]);
        
    }

    function getPics($kompositor) {
        //$indikator_kompositor = \App\Models\Kompositor::where('id', $inputrealisasi->kompositor_id)->first();
        $temp_res = \App\Models\KompositorPic::query()
                        ->where('kompositor_id', '=', $kompositor->id)->get();
        $def_pics = [];
        $i = 0;
        foreach ($temp_res as $row) {
            $def_pics[$i] = ['value' => $row->pic_id, 'label' => $row->nama_pic];
            $i++;
        }
        return $def_pics;
    }

    public function index() {
        return Inertia::render('IndikatorKompositor/ListIndikatorKompositor', [
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

    public function indexIndikator(\App\Models\Indikator $indikator, Request $request) {
        $this->authorize('kompositor-list-of-indikator');
        
            return Inertia::render('IndikatorKompositor/ListIndikatorKompositor', [
                        'kompositors' => Kompositor::query()
                                ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                                ->join('indikator', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                                ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                                ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                                ->with('kompositorPics')
                                ->when($request->input('findeks'), function ($query, $search) {
                                    if ($search != '') {
                                        $query->where('indeks.nama_indeks', 'like', "%{$search}%");
                                    }
                                })
                                ->when($request->input('fkompositor'), function ($query, $search) {
                                    if ($search != '') {
                                        $query->where('kompositor.nama_kompositor', 'like', "%{$search}%");
                                    }
                                })
                                //->with('parameter')
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
        $this->authorize('kompositor-create');
        
            $kompositor = null;
            if ($request->input('sumber_kompositor_id') == '1') {
                //validasi
                $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                            'nama_kompositor' => ['required'],
                            'satuan' => ['required'],
                            'indeks_id' => ['required'],
                            'jenis_kompositor_id' => ['required'],
                            'indikator_id' => ['required'],
                            'sumber_kompositor_id' => ['required']
                ]);
                $validated = $validator->validated();
                //insert kompositor
                $kompositor = Kompositor::create($validated);

                //insert indikator-kompositor
                $data = ['indikator_id' => $request->input('indikator_id'),
                    'kompositor_id' => $kompositor->id];
                IndikatorKompositor::create($data);

                //check jenis kompositor
                if ($request->input('jenis_kompositor_id') == '2') {//agregasi
                    $data_indeks = ['nama_indeks' => $request->input('nama_kompositor'),
                        'parent_id' => $request->input('indeks_id')];
                    //hapus nama indeks jika sudah ada
                    DB::table('indeks')
                            ->where('nama_indeks', '=', $request->input('nama_kompositor'))
                            ->where('parent_id', '=', $request->input('indeks_id'))
                            ->delete();
                    //insert indeks baru
                    \App\Models\Indeks::create($data_indeks);
                } elseif ($request->input('jenis_kompositor_id') == '3') {//parameter
                    $data_param = ['parameter_id' => $request->input('parameter_id'),
                        'kompositor_id' => $kompositor->id];

                    //simpan parameter
                    if ($data_param['parameter_id'] == '') {//parameter baru
                        $parameter = \App\Models\Parameter::create([
                                    'nama_parameter' => $request->input('nama_kompositor'),
                                    'kalkulasi' => $request->input('kalkulasi'),
                                    'value' => $request->input('value'),
                                    'indeks_id' => $request->input('indeks_id')]);

                        \App\Models\KompositorParameter::create([
                            'parameter_id' => $parameter->id,
                            'kompositor_id' => $kompositor->id
                        ]);
                    }
                }
            } elseif ($request->input('sumber_kompositor_id') == '2') {//existing indikator *perlu evaluasi
                //tambahkan validasi
                $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                            'indikator_id' => 'required',
                            'kompositor_id' => 'required',
                            'indeks_id' => 'required'
                        ])->validate();
                //get existing kompositor
                $indikator_kompositor = $kompositor = Kompositor::where('id', $request->input('kompositor_id'))->first();

                $ref_kom_data = [
                    'nama_kompositor' => str($kompositor->nama_kompositor),
                    'satuan' => str($kompositor->satuan),
                    'indeks_id' => $request->input('indeks_id'),
                    'jenis_kompositor_id' => $kompositor->jenis_kompositor_id, //diubah
                    'indikator_id' => $request->input('indikator_id'),
                    'sumber_kompositor_id' => str($request->input('sumber_kompositor_id'))
                ];
                //tambahkan kompositor baru dari data kompositor existing ? bisa mengakibatkan double data
                $new_kompositor = Kompositor::create($ref_kom_data);
                //insert indikator-kompositor
                //$validated = $validator->validated();            
                IndikatorKompositor::create([
                    'indikator_id' => $request->input('indikator_id'),
                    'kompositor_id' => $new_kompositor->id
                ]);
            } elseif ($request->input('sumber_kompositor_id') == '3') {//existing kompositor
                //tambahkan validasi
                $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                            'indeks_id' => 'required',
                            'kompositor_id' => 'required'
                ]);
                //cari kompositor existing
                $ref_kompositor = Kompositor::where('id', $request->input('kompositor_id'))->first();
                $ref_kom_data = [
                    'nama_kompositor' => str($ref_kompositor->nama_kompositor),
                    'satuan' => str($ref_kompositor->satuan),
                    'indeks_id' => $request->input('indeks_id'),
                    'jenis_kompositor_id' => $ref_kompositor->jenis_kompositor_id, //diubah
                    'indikator_id' => $ref_kompositor->indikator_id,
                    'sumber_kompositor_id' => str($request->input('sumber_kompositor_id'))
                ];
                //tambahkan kompositor baru dari data kompositor existing ? bisa mengakibatkan double data
                $kompositor = Kompositor::create($ref_kom_data);

                //input kompositor of kompositor
                $data_kompositor_of = ['kompositor_id' => $kompositor->id,
                    'ref_kompositor_id' => $request->input('kompositor_id')];
                \App\Models\KompositorOfKompositor::create($data_kompositor_of);

                //input indikator kompositor
                $data_indikator_kompositor = ['indikator_id' => $request->input('indikator_id'),
                    'kompositor_id' => $kompositor->id];
                IndikatorKompositor::create($data_indikator_kompositor);
            } else if ($request->input('sumber_kompositor_id') == '4') {//existing parameter
                //insert kompositor
                //validasi
                $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                            'parameter_id' => ['required'],
                            'nama_kompositor' => ['required'],
                            'indeks_id' => ['required'],
                            'satuan' => ['required'],
                            'indikator_id' => ['required'],
                            'sumber_kompositor_id' => ['required'],
                            'indikator_id' => ['required']
                        ])->validate();

                //cari data parameter existing
                $parameter = \App\Models\Parameter::where('id', $request->input('parameter_id'))->first();

                //insert kompositor
                $kompositor = Kompositor::create([
                            'nama_kompositor' => $request->input('nama_kompositor'),
                            'jenis_kompositor_id' => '3',
                            'indeks_id' => $request->input('indeks_id'),
                            'satuan' => $request->input('satuan'),
                            'sumber_kompositor_id' => $request->input('sumber_kompositor_id')
                ]);

                //insert indikator-kompositor
                $data = ['indikator_id' => $request->input('indikator_id'),
                    'kompositor_id' => $kompositor->id];
                IndikatorKompositor::create($data);

                //insert kompositor-parameter
                if ($parameter !== null) {
                    \App\Models\KompositorParameter::create([
                        'parameter_id' => $parameter->id,
                        'kompositor_id' => $kompositor->id]);
                }
            }

            if ($kompositor !== null) {
                $pics = $request->input('pics');
                if (is_array($pics)) {
                    DB::table('kompositor_pic')
                            ->where('kompositor_id', '=', $kompositor->id)
                            ->delete();
                    foreach ($pics as $pic) {
                        $data = ['kompositor_id' => $kompositor->id,
                            'pic_id' => $pic['value'],
                            'nama_pic' => $pic['label']];
                        DB::table('kompositor_pic')->insert($data);
                    }
                }
            }

            return Redirect::route('kompositor.index-indikator', $request->input('indikator_id'));
        
    }

    public function update(Kompositor $kompositor, Request $request) {//
        $this->authorize('kompositor-create');
        
            if ($request->input('sumber_kompositor_id') == '1') {//new
                //validasi
                $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                            'kompositor_id' => ['required'],
                            'nama_kompositor' => ['required'],
                            'satuan' => ['required'],
                            'indeks_id' => ['required'],
                            'jenis_kompositor_id' => ['required'],
                            'indikator_id' => ['required'],
                            'sumber_kompositor_id' => ['required']
                ]);
                $validated = $validator->validated();
                //update kompositor
                $kompositor = Kompositor::where('id', $request->input('kompositor_id'))->first();
                $kompositor->update($validated);

                //update indikator-kompositor
                $data = ['indikator_id' => $request->input('indikator_id'),
                    'kompositor_id' => $kompositor->id];
                //$indi_kompo = IndikatorKompositor::where('indikator_id', $request->input('indikator_id'));
                //check jenis kompositor
                if ($request->input('jenis_kompositor_id') == '2') {//agregasi
                    $data_indeks = ['nama_indeks' => $request->input('nama_kompositor'),
                        'parent_id' => $request->input('indeks_id')];
                    //hapus nama indeks jika sudah ada
                    /* DB::table('indeks')
                      ->where('nama_indeks', '=', $request->input('nama_kompositor'))
                      ->where('parent_id', '=', $request->input('indeks_id'))
                      ->delete(); */
                    //insert indeks baru
                    //\App\Models\Indeks::create($data_indeks);
                } elseif ($request->input('jenis_kompositor_id') == '3') {//parameter
                    $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                                'parameter_id' => 'required',
                                'kompositor_id' => 'required'])->validate();

                    //simpan parameter
                    //if($data_param['parameter_id'] == ''){//parameter baru
                    $parameter = \App\Models\Parameter::where('id', $request->input('parameter_id'))->first();
                    $parameter->update([
                        'nama_parameter' => $request->input('nama_kompositor'),
                        'kalkulasi' => $request->input('kalkulasi'),
                        'value' => $request->input('value'),
                        'indeks_id' => $request->input('indeks_id')]);

                    $kompo_param = \App\Models\KompositorParameter::where('kompositor_id', $request->input('kompositor_id'))->first();
                    $kompo_param->update([
                        'parameter_id' => $parameter->id,
                        'kompositor_id' => $kompositor->id
                    ]);
                    //}
                }
            } elseif ($request->input('sumber_kompositor_id') == '2') {//existing indikator
                //tambahkan validasi
                $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                            'indikator_id' => 'required',
                            'kompositor_id' => 'required'
                ]);
                $validated = $validator->validated();
                $indi_kompo = IndikatorKompositor::where('kompositor_id', $request->input('kompositor_id'))->first();
                $indi_kompo->update($validated);
            } elseif ($request->input('sumber_kompositor_id') == '3') {//existing kompositor
                //tambahkan validasi
                $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                            'indeks_id' => 'required',
                            'kompositor_id' => 'required'
                ]);
                //cari kompositor existing
                $ref_kompositor = Kompositor::where('id', $request->input('kompositor_id'))->first();
                $ref_kom_data = [
                    'nama_kompositor' => str($ref_kompositor->nama_kompositor),
                    'satuan' => str($ref_kompositor->satuan),
                    'indeks_id' => $request->input('indeks_id'),
                    'jenis_kompositor_id' => $request->input('jenis_kompositor_id'), //diubah
                    'indikator_id' => $ref_kompositor->indikator_id,
                    'sumber_kompositor_id' => ($request->input('sumber_kompositor_id'))
                ];
                //tambahkan kompositor baru dari data kompositor existing ? bisa mengakibatkan double data
                $ref_kompositor->update($ref_kom_data);

                //update kompositor of kompositor
                $data_kompositor_of = ['kompositor_id' => $kompositor->id,
                    'ref_kompositor_id' => $request->input('kompositor_id')];
                //\App\Models\KompositorOfKompositor::create($data_kompositor_of);
                //update indikator kompositor
                $data_indikator_kompositor = ['indikator_id' => $request->input('indikator_id'),
                    'kompositor_id' => $kompositor->id];
                //IndikatorKompositor::create($data_indikator_kompositor);            
            } else if ($request->input('sumber_kompositor_id') == '4') {//existing parameter
                //insert kompositor
                //validasi
                $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                            'nama_kompositor' => ['required'],
                            'satuan' => ['required'],
                            'indeks_id' => ['required'],
                            'jenis_kompositor_id' => ['required'],
                            'indikator_id' => ['required'],
                            'sumber_kompositor_id' => ['required'],
                ]);
                $validated = $validator->validated();
                //insert kompositor
                $kompositor = Kompositor::where('id', $request->input('kompositor_id'))->first();
                $kompositor->update($validated);

                \Illuminate\Support\Facades\Validator::make($request->all(), [
                    'parameter_id' => ['required']])->validate();
                //cari data parameter existing
                $parameter = \App\Models\Parameter::where('id', $request->input('parameter_id'))->first();
                $parameter->update([
                    'nama_parameter' => $request->input('nama_kompositor'),
                    'kalkulasi' => $request->input('kalkulasi'),
                    'value' => $request->input('value'),
                    'indeks_id' => $request->input('indeks_id')]);
                //insert kompositor-parameter
                if ($parameter !== null) {
                    $kompo_param = \App\Models\KompositorParameter::where('kompositor_id', $request->input('kompositor_id'))->first();
                    $kompo_param->update([
                        'parameter_id' => $parameter->id,
                        'kompositor_id' => $kompositor->id]);
                }
            }

            $pics = $request->input('pics');
            if (is_array($pics)) {
                DB::table('kompositor_pic')
                        ->where('kompositor_id', '=', $kompositor->id)
                        ->delete();
                foreach ($pics as $pic) {
                    $data = ['kompositor_id' => $kompositor->id,
                        'pic_id' => $pic['value'],
                        'nama_pic' => $pic['label']];
                    DB::table('kompositor_pic')->insert($data);
                }
            }
            return Redirect::route('kompositor.index-indikator', $request->input('indikator_id'));
        
    }

    public function agregasiKompositor(\App\Models\Indeks $indeks) {
        return Inertia::render('IndikatorKompositor/ListIndikatorKompositor', [
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

    public function getParameter(Kompositor $kompositor) {
        $kompo_param = \App\Models\KompositorParameter::where('kompositor_id', $kompositor->id)->first();
        $parameter = \App\Models\Parameter::where('id', $kompo_param->parameter_id)->first();
        if ($parameter !== null) {
            $data['response'] = true;
            $data['value'] = $parameter->value;
        } else {
            $data['response'] = false;
            $data['value'] = $parameter->value;
        }
        return json_encode($data);
    }

    public function getOfKompositor(Kompositor $kompositor) {
        $kompo_of_kompo = \App\Models\KompositorOfKompositor::where('kompositor_id', $kompositor->id)->first();
        $kompositor = \App\Models\RealisasiKompositor::where('kompositor_id', $kompo_of_kompo->ref_kompositor_id)->first();
        if ($kompositor !== null) {
            $data['response'] = true;
            $data['value'] = $kompositor->nilai;
        } else {
            $data['response'] = false;
            $data['value'] = $kompositor->nilai;
        }
        return json_encode($data);
    }
}
