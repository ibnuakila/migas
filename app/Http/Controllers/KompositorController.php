<?php

namespace App\Http\Controllers;

use App\Models\Indeks;
use App\Models\KompositorParameter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
//use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\KompositorRequest;
use App\Models\Indikator;
use App\Models\Kompositor;
use App\Models\IndikatorKompositor;
use App\Models\InputRealisasi;
use App\Models\InputRealisasiPic;
use App\Models\KompositorOfKompositor;
use App\Models\KompositorPic;
use App\Models\RealisasiKompositor;
use App\Models\RealisasiKompositorPic;
use Illuminate\Support\Facades\DB;

class KompositorController extends Controller
{
    //var $request = Illuminate\Http\Request;

    public function create(\App\Models\Indikator $indikator, Request $request)
    {
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
            'indeks' => function () use ($indikator) {
                //$indeks = Indeks::where('nama_indeks', $indikator->nama_indikator)->first();
                $kompositor = Kompositor::query()
                    ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                    ->where('indikator_kompositor.indikator_id', '=', $indikator->id)->first();
                if (is_object($kompositor)) {
                    $indeks = Indeks::where('nama_indeks', '=', $kompositor->nama_kompositor .
                        ' (' . $indikator->level->nama_level . ')')->first();
                } else {
                    $indeks = null;
                }
                $query = "WITH RECURSIVE Hierarchy AS (
                                -- Base case: Select the root node
                                SELECT 
                                    indeks.id,
                                    nama_indeks,
                                    parent_id,
                                    level
                                FROM indeks
                                WHERE parent_id = ?                                
                                UNION ALL                                
                                -- Recursive case: Get child nodes
                                SELECT 
                                    t.id,
                                    t.nama_indeks,
                                    t.parent_id,
                                    t.level
                                FROM indeks t
                                INNER JOIN Hierarchy h ON t.parent_id = h.id
                            )
                            -- Retrieve the hierarchy
                            SELECT * FROM Hierarchy 
                            ORDER BY level, id;";
                if (is_object($indeks)) {
                    if ($indeks->parent_id !== 1) {
                        return DB::select($query, [$indeks->parent_id]);
                    } else {
                        return DB::table('indeks')->where('id', $indeks->id)->get();
                    }
                } else {
                    return DB::table('indeks')->where('nama_indeks', 'Root')->get();
                }
            }, //\App\Models\Indeks::all(),
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
            //'status_kompositor' => \App\Models\StatusKompositor::all(),
            'pics' => \App\Models\PIC::all(),
        ]);
    }

    public function destroy(Kompositor $kompositor, Request $request)
    {
        $this->authorize('kompositor-delete');
        DB::beginTransaction();
        $data['kompositor'] = $kompositor;
        try {
            // C1: check apakah sudah ada realisasi_kompositor
            if ($kompositor->realisasiKompositor()->exists()) {
                $data['C1'] = "Executed with True";
                // ---------------- hapus realisasi kompositor -------------------
                $realisasikompositor = $kompositor->realisasiKompositor()->get();
                // C1.1: check object realisasi kompositor ------------
                if($realisasikompositor->count()>0){
                    $data['C1.1'] = "Executed with True";
                    $data['D1'] = ['realisasi-kompositor' => $realisasikompositor];
                    foreach ($realisasikompositor as $item_realisasi) {
                        // $input_realisasi_id = $item_realisasi->input_realisasi_id;
                        // $input_realisasi = InputRealisasi::where('id', $input_realisasi_id)->first();
                        // $laporan_capaian_id = $input_realisasi->laporan_capaian_id;
                        // $triwulan_id = $input_realisasi->triwulan_id;
                        //$kompositor = Kompositor::find($realisasikompositor->kompositor_id);

                        // Q1: delete pic realisasi kompositor
                        $data['Q1'] = DB::table('realisasi_kompositor_pic')
                            ->where('realisasi_kompositor_id', '=', $item_realisasi->id)
                            ->delete();
                        // Q2: delete realisasi kompositor
                        $data['Q2'] = $item_realisasi->delete();
                    }
                }

            }
            // C2: Jika sumber_kompositor new (1)
            if ($kompositor->sumber_kompositor_id == 1) {
                $data['C2'] = "Executed with True";
                //> delete kompositor_pic 
                $kompositor_pic = \App\Models\KompositorPic::where('kompositor_id', $kompositor->id)->get();
                // C2.1: check eksistensi kompositor pic
                if($kompositor_pic->count()>0){
                    $data['C2.1'] = "Executed with True";
                    foreach ($kompositor_pic as $kom_pic) {
                        $data['Q3'] = $kom_pic->delete();
                    }
                }
                //> delete indikator_kompositor
                $indikator_kompositor = IndikatorKompositor::where('kompositor_id', $kompositor->id)->get();
                $data['D2'] = $indikator_kompositor;
                $indikator = Indikator::where('id', $indikator_kompositor->first()->indikator_id)
                    ->with('level')
                    ->first();
                // C2.2: check jumlah item
                if($indikator_kompositor->count()>0){
                    $data['C2.2'] = "Executed with True";
                    foreach($indikator_kompositor as $ind_komp){
                        $data['Q4'] = $ind_komp->delete();
                    }
                }
                //> Jika jenis kompositor agregasi
                $indeks = '';
                // C2.3: check jenis kompositor -----------------
                if ($kompositor->jenis_kompositor_id == 2) { //agregasi
                    $data['C2.3'] = "Executed with True";
                    //cari indeks
                    $indeks = \App\Models\Indeks::where('nama_indeks', $kompositor->nama_kompositor .
                        ' (' . $indikator->level->nama_level . ')')
                        ->where('level', $indikator->level_id)
                        ->first();

                    // C2.4: Jika jenis kompositor parameter
                } elseif ($kompositor->jenis_kompositor_id == 3) {
                    $data['C2.4'] = "Executed with True";
                    //> delete kompositor_parameter
                    $parameter = \App\Models\Parameter::where('id', $request->input('parameter_id'))->first();
                    // C2.3.1: check eksistensi objek
                    if ($parameter) {
                        $data['C2.3.1'] = "Executed with True";
                        $data['Q5'] = \App\Models\KompositorParameter::where([
                            //'kompositor_id' => $kompositor->id,
                            'parameter_id' => $request->input('parameter_id')
                        ])->delete();
                        //> delete parameter
                        $data['Q6']=$parameter->delete();
                    }
                }
                //> delete kompositor
                $data['Q7'] = $kompositor->delete();
                // C2.5: check eksistensi objek
                if ($indeks) {
                    $data['C2.5'] = "Executed with True";
                    if ($indeks->parent_id !== 0) {
                        // hapus indeks
                        $data['Q8']=$indeks->delete();
                    }
                }
                
                // C3: Jika sumber_kompositor existing indikator (2)
            } elseif ($kompositor->sumber_kompositor_id == 2) {
                $data['C3'] = "Executed with True";
                //> delete kompositor_pic
                $kompositor_pic = \App\Models\KompositorPic::where('kompositor_id', $kompositor->id)->get();
                // C3.1: check jumlah item
                if($kompositor_pic->count()>0){
                    $data['C3.1'] = "Executed with True";
                    foreach ($kompositor_pic as $kom_pic) {
                        $data['Q9']=$kom_pic->delete();
                    }
                }
                //> delete indikator_kompositor
                $indikator_kompositor = IndikatorKompositor::where('kompositor_id', $kompositor->id)->first();
                // C3.2: check eksistensi objek
                if($indikator_kompositor){
                    $data['Q10'] = $indikator_kompositor->delete();
                }
                //> delete kompositor
                $data['Q11'] = $kompositor->delete();

                // C4: Jika sumber_kompositor existing kompositor (3)
            } elseif ($kompositor->sumber_kompositor_id == 3) {
                $data['C4'] = "Executed with True";
                //> delete kompositor_pic
                $kompositor_pic = \App\Models\KompositorPic::where('kompositor_id', $kompositor->id)->get();
                // C4.1: check jumlah item
                if($kompositor_pic->count()>0){
                    $data['C4.1'] = "Executed with True";
                    foreach ($kompositor_pic as $kom_pic) {
                        $data['Q12'] = $kom_pic->delete();
                    }
                }
                //> delete kompositor_of_kompositor
                $kompositor_kompositor = KompositorOfKompositor::where('ref_kompositor_id', $kompositor->id)->first();
                // C4.2: check eksistensi objek
                if($kompositor_kompositor){
                    $data['C4.2'] = "Executed with True";
                    $data['Q13'] = $kompositor_kompositor->delete();
                }
                //> delete indikator_kompositor
                $indikator_kompositor = IndikatorKompositor::where('kompositor_id', $kompositor->id)->first();
                // C4.3: check eksistensi objek
                if($indikator_kompositor){
                    $data['C4.3'] = "Executed with True";
                    $data['Q14'] = $indikator_kompositor->delete();
                }
                //> delete kompositor
                $data['Q15'] = $kompositor->delete();
                
                // C5: Jika sumber_kompositor existing parameter
            } elseif ($kompositor->sumber_kompositor_id == 4) {
                $data['C5'] = "Executed with True";
                //> delete kompositor_pic
                $kompositor_pic = \App\Models\KompositorPic::where('kompositor_id', $kompositor->id)->get();

                foreach ($kompositor_pic as $kom_pic) {
                    $data['Q16'] = $kom_pic->delete();
                }
                //> delete kompositor_parameter
                $parameter = \App\Models\Parameter::where('id', $request->input('parameter_id'))->first();
                if (is_object($parameter)) {
                    $data['Q17'] = \App\Models\KompositorParameter::where([
                        //'kompositor_id' => $kompositor->id,
                        'parameter_id' => $request->input('parameter_id')
                    ])->delete();
                    //> delete parameter
                    $data['Q18'] = $parameter->delete();
                }
                //> delete indikator_kompositor
                $indikator_kompositor = IndikatorKompositor::where('kompositor_id', $kompositor->id)->first();
                $data['Q19'] = $indikator_kompositor->delete();
                //> delete kompositor
                $data['Q20'] = $kompositor->delete();
                
            }
            DB::commit();
            activity()
                ->causedBy(auth()->user())
                ->performedOn($kompositor)
                ->withProperties([
                    'ip' => request()->ip(),
                    'user_agent' => request()->header('User-Agent'),
                    'kompositor_id' => $kompositor->id                
                ])
                ->createdAt(now()->subDays(10))
                ->event('destroy')
                ->log('Kompositor Delete');
        } catch (\Illuminate\Database\QueryException $e) {
            DB::rollBack();
            $temp_message =  $e->errorInfo[2];
            $data['error'] = $temp_message;
            //return Redirect::back()->with('message', $temp_message);
            return $data;
        }
        $indikator_id = $request->input('indikator_id');
        //return $data;
        return Redirect::route('kompositor.index-indikator', $indikator_id);
    }

    public function _destroy(Kompositor $kompositor, Request $request)
    {
        $this->authorize('kompositor-delete');

        $indikator_id = $request->input('indikator_id');
        if ($kompositor->jenis_kompositor_id == 1) { //input
            try {
                DB::beginTransaction();
                $indikator_kompositor = IndikatorKompositor::where('kompositor_id', $kompositor->id)->first();
                $indikator_kompositor->delete(); //delete indikator kompositor
                //$indikator_id = $indikator_kompositor->indikator_id;
                if ($kompositor->sumber_kompositor_id == 2) { //existing indikator
                    $kom_of_kom = \App\Models\KompositorOfKompositor::where('kompositor_id', $kompositor->id)->first();
                    $kom_of_kom->delete();
                }
                if ($kompositor->sumber_kompositor_id == 3) { //existing kompositor
                    $kom_of_kom = \App\Models\KompositorOfKompositor::where('kompositor_id', $kompositor->id)->first();
                    $kom_of_kom->delete();
                }
                if ($kompositor->sumber_kompositor_id == 4) { //exixting parameter
                    $kom_param = KompositorParameter::where('kompositor_id', $kompositor->id)->first();
                    $kom_param->delete();
                }

                $kompositor_pic = \App\Models\KompositorPic::where('kompositor_id', $kompositor->id)->get();
                foreach ($kompositor_pic as $kom_pic) {
                    $kom_pic->delete();
                }
                $kompositor->delete(); //delete kompositor
                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                $message = ['message' => $e];
                return $message;
            }
        } else if ($kompositor->jenis_kompositor_id == 2) { //agregasi
            $indeks = \App\Models\Indeks::find($kompositor->indeks_id);
            $kompositors = Kompositor::where('indeks_id', $indeks->id)->get();
            try {
                DB::beginTransaction();

                /*$indeks_child = \App\Models\Indeks::where('parent_id', $indeks->id)->get();
                    foreach ($indeks_child as $value) {
                        $value->delete(); 
                    }*/
                //foreach ($kompositors as $komp) {
                $indikator_kompositor = IndikatorKompositor::where('kompositor_id', $kompositor->id)
                    ->where('indikator_id', $indikator_id)
                    ->first();
                //$indikator_id = $indikator_kompositor->indikator_id;

                if (is_object($indikator_kompositor)) {
                    $indikator_kompositor->delete();
                }
                //------------ review lagi pada saat delete agregasi tidak harus delete subnya --------------
                foreach ($indikator_kompositor as $idk_kom) {
                    $indikator_id = $idk_kom->indikator_id;
                    $idk_kom->delete(); //delete indikator_kompositor
                }
                //-------------------------------------------------------------------------------------
                //delete kompositor-pic
                $kompositor_pic = \App\Models\KompositorPic::where('kompositor_id', $kompositor->id)->get();
                foreach ($kompositor_pic as $kom_pic) {
                    $kom_pic->delete();
                }

                //delete kompositor
                $kompositor->delete();
                //delete indeks yang ada dibawahnya #jangan di delete
                //$indeks->delete();

                //}

                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                $message = ['message' => $e];
                return $message; //"Data tidak bisa dihapus karena berelasi!";//delete sub agregasi terlebih dahulu
            }
        } else if ($kompositor->jenis_kompositor_id == 3) { //parameter
            //pakai transaction -------------------------
            try {
                DB::beginTransaction();
                $indikator_kompositor = IndikatorKompositor::where('kompositor_id', $kompositor->id)->first();
                //$indikator_id = $indikator_kompositor->indikator_id;

                //1. delete kompositor parameter
                $komp_param = \App\Models\KompositorParameter::where([
                    //'kompositor_id' => $kompositor->id,
                    'parameter_id' => $request->input('parameter_id')
                ])->delete();
                // if (is_object($komp_param)) {
                //     $komp_param->delete();
                // }
                //2. delete parameter
                $parameter = \App\Models\Parameter::where('id', $request->input('parameter_id'))->first();
                if (is_object($parameter)) {
                    $parameter->delete();
                }
                //3. delete kompositor of kompositor if exist
                $komp_of_komp = \App\Models\KompositorOfKompositor::where('kompositor_id', $kompositor->id)->first();
                if (is_object($komp_of_komp)) {
                    //$komp_of_komp->delete();
                }
                //4. delete kompositor-pic
                $kompositor_pic = \App\Models\KompositorPic::where('kompositor_id', $kompositor->id)->get();
                foreach ($kompositor_pic as $kom_pic) {
                    $kom_pic->delete();
                }
                //5. delete indikator kompositor
                $indikator_kompositor->delete();

                //6. delete kompositor
                $kompositor->delete();

                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                return $e;
            }
        } else if ($kompositor->jenis_kompositor_id == 4) { //kompositor of kompositor
            try {
                DB::beginTransaction();
                $indikator_kompositor = IndikatorKompositor::where('kompositor_id', $kompositor->id)->first();
                //$indikator_id = $indikator_kompositor->indikator_id;

                //delete kompositor of kompositor if exist
                $komp_of_komp = \App\Models\KompositorOfKompositor::where('kompositor_id', $kompositor->id)->first();
                if ($komp_of_komp !== null) {
                    $komp_of_komp->delete();
                }
                $kompositor_pic = \App\Models\KompositorPic::where('kompositor_id', $kompositor->id)->get();
                foreach ($kompositor_pic as $kom_pic) {
                    $kom_pic->delete();
                }
                //5. delete indikator kompositor
                $indikator_kompositor->delete();

                //6. delete kompositor
                $kompositor->delete();

                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                return $e;
            }
        }
        return Redirect::route('kompositor.index-indikator', $indikator_id);
    }

    public function edit(Kompositor $kompositor, Request $request)
    {
        $this->authorize('kompositor-edit');

        //$ind_kompositor = IndikatorKompositor::where()
        $indikator_kompositor = $kompositor->indikatorKompositor()->firstOrNew();
        $kompositor_parameter = \App\Models\KompositorParameter::where('kompositor_id', $kompositor->id)->first();
        return Inertia::render('IndikatorKompositor/EditKompositor', [
            'kompositor' => new \App\Http\Resources\KompositorResource(
                $kompositor->with('kompositorParameter')->where('id', '=', $kompositor->id)->get()->first()
            ),

            'kompositors' => Kompositor::query()
                ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                ->where('indikator_kompositor.indikator_id', $indikator_kompositor->indikator_id)
                ->get(),

            'indikator' => new \App\Http\Resources\IndikatorResource(\App\Models\Indikator::where('id', $indikator_kompositor->indikator_id)->first()),
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
            'parameter' => $kompositor_parameter !== null ? \App\Models\Parameter::where('id', $kompositor_parameter->parameter_id)->first() : null,
            'parameters' => DB::table('parameter')
                ->join('indeks', 'parameter.indeks_id', '=', 'indeks.id')
                ->select('parameter.*', 'indeks.nama_indeks')
                ->get(),
            'sumber_kompositor' => \App\Models\SumberKompositor::all(),
            //'status_kompositor' => \App\Models\StatusKompositor::all(),
            'def_pics' => ($this->getPics($kompositor)),
            'pics' => \App\Models\PIC::all(),
        ]);
    }

    function getPics($kompositor)
    {
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

    public function index()
    {
        try {
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
                        'indeks.nama_indeks'
                    )
                    ->orderBy('indeks.nama_indeks', 'asc')
                    ->get(),
                'indikator' => '',
            ]);
        } catch (\Exception $e) {
            return Inertia::render('IndikatorKompositor/ListIndikatorKompositor', [
                'error' => 'Conflict occurred',
            ])->toResponse(request())->setStatusCode(409);
        }
    }

    public function indexIndikator(\App\Models\Indikator $indikator, Request $request)
    {
        $this->authorize('kompositor-list-of-indikator');
        $temp_indikator = Indikator::where('id', $indikator->id)
            ->with('level')->first();
        try {
            return Inertia::render('IndikatorKompositor/ListIndikatorKompositor', [
                'kompositors' => Kompositor::query()
                    ->join('indikator_kompositor', 'kompositor.id', '=', 'indikator_kompositor.kompositor_id')
                    ->join('indikator', 'indikator.id', '=', 'indikator_kompositor.indikator_id')
                    ->join('jenis_kompositor', 'kompositor.jenis_kompositor_id', '=', 'jenis_kompositor.id')
                    ->join('indeks', 'kompositor.indeks_id', '=', 'indeks.id')
                    ->join('level', 'indikator.level_id', '=', 'level.id')
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
                        'level.nama_level',
                        'indeks.nama_indeks'
                    )
                    ->where('indikator.id', '=', $indikator->id)
                    ->orderBy('indeks.id', 'asc')
                    ->get(),
                'indikator' => $temp_indikator,
            ]);
        } catch (\Exception $e) {
            return Inertia::render('IndikatorKompositor/ListIndikatorKompositor', [
                'error' => 'Conflict occurred',
            ])->toResponse(request())->setStatusCode(409);
        }
    }

    public function store(KompositorRequest $request)
    {
        $this->authorize('kompositor-create');

        $kompositor = null;
        $indeks = null;
        $data[] = null;
        try {
            DB::beginTransaction();
            // C-1: check sumber kompositor
            if ($request->input('sumber_kompositor_id') == '1') { //new
                $data['C-1'] = "Executed with True";
                //validasi
                // $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                //     'nama_kompositor' => ['required'],
                //     'satuan' => ['required'],
                //     'indeks_id' => ['required'],
                //     'jenis_kompositor_id' => ['required'],
                //     'indikator_id' => ['required'],
                //     'sumber_kompositor_id' => ['required']
                // ]);
                $request->scenario = 'New';
                $validated = $request->validated();

                //insert kompositor
                $kompositor = Kompositor::create($validated);
                $data['Q1'] = $kompositor;
                //insert indikator-kompositor
                $temp_data = [
                    'indikator_id' => $request->input('indikator_id'),
                    'kompositor_id' => $kompositor->id
                ];
                $data['Q2']=IndikatorKompositor::create($temp_data);
                $indikator = Indikator::query()
                    ->where('id', $request->input('indikator_id'))
                    ->with('level')
                    ->first();

                // C-1.1: check jenis kompositor
                if ($request->input('jenis_kompositor_id') == '2') { //agregasi
                    $data['C-1.1'] = "Executed with True";
                    $nama_level = '';
                    if ($indikator) {
                        $nama_level = $indikator->level->nama_level;
                    }
                    $data_indeks = [
                        'nama_indeks' => $request->input('nama_kompositor') . ' (' . $nama_level . ')',
                        'parent_id' => $request->input('indeks_id'),
                        'level' => $indikator->level_id
                    ];
                    //hapus nama indeks jika sudah ada
                    $data['Q3']= DB::table('indeks')
                        ->where('nama_indeks', '=', $request->input('nama_kompositor') . ' (' . $nama_level . ')')
                        ->where('parent_id', '=', $request->input('indeks_id'))
                        ->where('level', '=', $indikator->level_id)
                        ->delete();
                    //insert indeks baru
                    $data['Q4'] = \App\Models\Indeks::create($data_indeks);
                // C-1.2: parameter    
                } elseif ($request->input('jenis_kompositor_id') == '3') { //parameter
                    $data['C-1.2'] = "Executed with True";
                    $data_param = [
                        'parameter_id' => $request->input('parameter_id'),
                        'kompositor_id' => $kompositor->id
                    ];

                    // C-1.2.1: check parameter id
                    if ($data_param['parameter_id'] == '') { //parameter baru
                        $data['C-1.2.1'] = "Executed with True";
                        $parameter = \App\Models\Parameter::create([
                            'nama_parameter' => $request->input('nama_kompositor'),
                            'kalkulasi' => $request->input('kalkulasi'),
                            'value' => $request->input('value'),
                            'indeks_id' => $request->input('indeks_id')
                        ]);
                        $data['Q5'] = $parameter;
                        $data['Q6'] = \App\Models\KompositorParameter::create([
                            'parameter_id' => $parameter->id,
                            'kompositor_id' => $kompositor->id
                        ]);
                    }
                }
            // C-2: existing indikator
            } elseif ($request->input('sumber_kompositor_id') == '2') { //existing indikator *perlu evaluasi
                $data['C-2'] = "Executed with True";
                //tambahkan validasi
                // $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                //     'indikator_id' => 'required',
                //     'kompositor_id' => 'required',
                //     'indeks_id' => 'required'
                // ])->validate();
                $request->scenario = 'Existing Indikator';
                $request->validated();

                //get existing indikator-kompositor
                $kompositor = Kompositor::where('id', $request->input('kompositor_id'))->first();
                $data['Q7'] = $kompositor;
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
                $data['Q8'] = $new_kompositor;
                //insert indikator-kompositor
                //$validated = $validator->validated();            
                $data['Q9'] = IndikatorKompositor::create([
                    'indikator_id' => $request->input('indikator_id'),
                    'kompositor_id' => $new_kompositor->id //$request->input('kompositor_id')
                ]);

                //input kompositor of kompositor
                /*$data_kompositor_of = ['kompositor_id' => $new_kompositor->id,
                    'ref_kompositor_id' => $request->input('kompositor_id')];
                \App\Models\KompositorOfKompositor::create($data_kompositor_of);*/
            // C-3: existing kompositor
            } elseif ($request->input('sumber_kompositor_id') == '3') { //existing kompositor *tidak diguanakan lagi
                $data['C-3'] = "Executed with True";
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
                $data_kompositor_of = [
                    'kompositor_id' => $kompositor->id,
                    'ref_kompositor_id' => $request->input('kompositor_id')
                ];
                \App\Models\KompositorOfKompositor::create($data_kompositor_of);

                //input indikator kompositor
                $data_indikator_kompositor = [
                    'indikator_id' => $request->input('indikator_id'),
                    'kompositor_id' => $kompositor->id
                ];
                IndikatorKompositor::create($data_indikator_kompositor);
            // C-4: existing parameter
            } else if ($request->input('sumber_kompositor_id') == '4') { //existing parameter *tidak digunakan lagi
                $data['C-4'] = "Executed with True";
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
                $temp_data = [
                    'indikator_id' => $request->input('indikator_id'),
                    'kompositor_id' => $kompositor->id
                ];
                IndikatorKompositor::create($temp_data);

                //insert kompositor-parameter
                if ($parameter !== null) {
                    \App\Models\KompositorParameter::create([
                        'parameter_id' => $parameter->id,
                        'kompositor_id' => $kompositor->id
                    ]);
                }
            }
            // C-5: check objek kompositor
            if ($kompositor !== null) {
                $data['C-5'] = "Executed with True";
                $pics = $request->input('pics');
                if (is_array($pics)) {
                    $data['Q10'] = DB::table('kompositor_pic')
                        ->where('kompositor_id', '=', $kompositor->id)
                        ->delete();
                    foreach ($pics as $pic) {
                        $temp_data = [
                            'kompositor_id' => $kompositor->id,
                            'pic_id' => $pic['value'],
                            'nama_pic' => $pic['label']
                        ];
                        $data['Q11'] = DB::table('kompositor_pic')->insert($temp_data);
                    }
                }
            }

            DB::commit();
            activity()
                ->causedBy(auth()->user())
                ->performedOn($kompositor)
                ->withProperties([
                    'ip' => request()->ip(),
                    'user_agent' => request()->header('User-Agent'),
                    'kompositor_id' => $kompositor->id                
                ])
                ->createdAt(now()->subDays(10))
                ->event('store')
                ->log('Kompositor Delete');
        } catch (\Illuminate\Database\QueryException $e) {
            DB::rollBack();
            $data['error'] = $e->errorInfo[2];
            //return Redirect::back()->with('message', $message);
            return $data;
        }
        //return Redirect::back()->with('message', $indeks);
        //return $data;
        return Redirect::route('kompositor.index-indikator', $request->input('indikator_id'));
    }

    public function update(Kompositor $kompositor, Request $request)
    { //
        $this->authorize('kompositor-create');
        $data = [];
        try {
            DB::beginTransaction();
            // C-1: check sumber kompositor (=1)
            if ($request->input('sumber_kompositor_id') == '1') { //new
                $data['C-1'] = "Executed with True";
                //validasi
                $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                    'kompositor_id' => ['required'],
                    'nama_kompositor' => ['required'],
                    'satuan' => ['required'],
                    'indeks_id' => ['required'],
                    'jenis_kompositor_id' => ['required'],
                    'indikator_id' => ['required'],
                    'sumber_kompositor_id' => ['required'],
                    //'status_kompositor_id' => ['required']
                ]);
                $validated = $validator->validated();
                //update kompositor
                $kompositor = Kompositor::where('id', $request->input('kompositor_id'))->first();
                $data['D1'] = $kompositor;
                $data['Q1'] = $kompositor->update($validated);

                //update indikator-kompositor
                $temp_data = [
                    'indikator_id' => $request->input('indikator_id'),
                    'kompositor_id' => $kompositor->id
                ];
                //$indi_kompo = IndikatorKompositor::where('indikator_id', $request->input('indikator_id'));
                // C-1.1: check jenis kompositor = 2
                if ($request->input('jenis_kompositor_id') == '2') { //agregasi
                    $data['C-1.1'] = "Executed with True";
                    $data_indeks = [
                        'nama_indeks' => $request->input('nama_kompositor'),
                        'parent_id' => $request->input('indeks_id')
                    ];
                    //hapus nama indeks jika sudah ada
                    /* DB::table('indeks')
                      ->where('nama_indeks', '=', $request->input('nama_kompositor'))
                      ->where('parent_id', '=', $request->input('indeks_id'))
                      ->delete(); */
                    //insert indeks baru
                    //\App\Models\Indeks::create($data_indeks);

                // C-1.2: jenis kompositor = 3
                } elseif ($request->input('jenis_kompositor_id') == '3') { //parameter
                    $data['C-1.2'] = "Executed with True";
                    $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                        'parameter_id' => 'required',
                        'kompositor_id' => 'required'
                    ])->validate();

                    //simpan parameter
                    //if($data_param['parameter_id'] == ''){//parameter baru
                    $parameter = \App\Models\Parameter::where('id', $request->input('parameter_id'))->first();
                    $data['Q2'] = $parameter->update([
                        'nama_parameter' => $request->input('nama_kompositor'),
                        'kalkulasi' => $request->input('kalkulasi'),
                        'value' => $request->input('value'),
                        'indeks_id' => $request->input('indeks_id')
                    ]);

                    $kompo_param = \App\Models\KompositorParameter::where('kompositor_id', $request->input('kompositor_id'))->first();
                    $data['Q3'] = $kompo_param->update([
                        'parameter_id' => $parameter->id,
                        'kompositor_id' => $kompositor->id
                    ]);
                    //}
                }
            // C-2: sumber kompositor = 2
            } elseif ($request->input('sumber_kompositor_id') == '2') { //existing indikator *khusus update
                $data['C-2'] = "Executed with True";
                //tambahkan validasi
                $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                    'indikator_id' => 'required',
                    'kompositor_id' => 'required',
                    'indeks_id' => 'required'
                ])->validate();

                //bersihkan relasi yang terdapat pada New terlebih dahulu 
                //jika update berubah dari New ke Existing Indikator
                //
                //cari kompositor lama
                $old_kompositor = Kompositor::where('id', $request->input('kompositor_id'))->first();
                $data['D2'] = $old_kompositor;
                //ambil indeks_id
                $old_indeks_id = $old_kompositor->indeks_id;
                //cari data indeks
                //$old_indeks = Indeks::where('id', '=', $old_indeks_id)->first();
                $query = "WITH RECURSIVE Hierarchy AS (
                                -- Base case: Select the root node
                                SELECT 
                                    indeks.id,
                                    nama_indeks,
                                    parent_id,
                                    level
                                FROM indeks
                                WHERE parent_id = ?                                
                                UNION ALL                                
                                -- Recursive case: Get child nodes
                                SELECT 
                                    t.id,
                                    t.nama_indeks,
                                    t.parent_id,
                                    t.level
                                FROM indeks t
                                INNER JOIN Hierarchy h ON t.parent_id = h.id
                            )
                            -- Retrieve the hierarchy
                            SELECT * FROM Hierarchy 
                            WHERE parent_id = ?
                            ORDER BY level, id;";
                $indekses = DB::select($query, [$old_indeks_id, $old_indeks_id]);
                $data['Q4'] = $indekses;
                // C-2.1:
                if (count($indekses) > 0) {
                    $data['C-2.1'] = "Executed with True";
                    //$result['indeksis'] = $indekses;
                    //looping cari data kompositor yang menjadi sub dari indeks
                    foreach ($indekses as $indeks) {
                        $kompositor_with_idx = Kompositor::where('indeks_id', '=', $indeks->id)->first();
                        $data['D3'] = $kompositor_with_idx;
                        // C-2.2:
                        if (is_object($kompositor_with_idx)) {
                            $data['C-2.2'] = "Executed with True";
                            //cari realisasinya terlebih dahulu
                            $realisasi_kompositor = RealisasiKompositor::where('kompositor_id', '=', $kompositor_with_idx->id)->first();
                            // C-2.3:
                            if (is_object($realisasi_kompositor)) {
                                $data['C-2.3'] = "Executed with True";
                                //cari pic realisasinya dan hapus
                                $data['Q5'] = RealisasiKompositorPic::where('realisasi_kompositor_id', '=', $realisasi_kompositor->id)->delete();
                                //hapus realisasinya
                                $data['Q6'] = $realisasi_kompositor->delete();
                            }
                        }
                        //hapus indikator-kompositor
                        $data['Q7'] = IndikatorKompositor::where('kompositor_id', '=', $request->input('kompositor_id'))->delete();
                        //hapus pic kompositor
                        $data['Q8'] = KompositorPic::where('kompositor_id', '=', $request->input('kompositor_id'))->delete();
                        //hapus kompositornya
                        $data['Q9'] =$kompositor_with_idx->delete();
                    }
                }

                //get existing indikator-kompositor
                $ref_kompositor = Kompositor::where('id', $request->input('ref_kompositor_id'))->first();
                $data['D4'] = $ref_kompositor;
                $ref_kom_data = [
                    'nama_kompositor' => str($ref_kompositor->nama_kompositor),
                    'satuan' => str($ref_kompositor->satuan),
                    'indeks_id' => $request->input('indeks_id'),
                    'jenis_kompositor_id' => $ref_kompositor->jenis_kompositor_id,
                    'indikator_id' => $request->input('indikator_id'),
                    'sumber_kompositor_id' => str($request->input('sumber_kompositor_id')),
                    'status_kompositor_id' => $ref_kompositor->status_kompositor_id
                ];
                //tambahkan kompositor baru dari data kompositor existing ? bisa mengakibatkan double data
                $data['Q10'] = $old_kompositor->update($ref_kom_data);

                //update indikator-kompositor *tidak ada yg berubah
                $indi_kompo = IndikatorKompositor::where('kompositor_id', $request->input('kompositor_id'))->first();
                $data['D5'] = $indi_kompo;
                $data['Q11'] = $indi_kompo->update([
                    'kompositor_id' => $request->input('kompositor_id'),
                    'indikator_id' => $request->input('indikator_id')
                ]);
            // C-3: sumber kompositor = 3
            } elseif ($request->input('sumber_kompositor_id') == '3') { //existing kompositor *sementara tidak terpakai
                $data['C-3'] = "Executed with True";
                //tambahkan validasi
                $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                    'indeks_id' => 'required',
                    'kompositor_id' => 'required'
                ]);
                //cari kompositor existing
                $ref_kompositor = Kompositor::where('id', $request->input('kompositor_id'))->first();
                $data['D6'] = $ref_kompositor;
                $ref_kom_data = [
                    'nama_kompositor' => str($ref_kompositor->nama_kompositor),
                    'satuan' => str($ref_kompositor->satuan),
                    'indeks_id' => $request->input('indeks_id'),
                    'jenis_kompositor_id' => $request->input('jenis_kompositor_id'), //diubah
                    'indikator_id' => $ref_kompositor->indikator_id,
                    'sumber_kompositor_id' => ($request->input('sumber_kompositor_id'))
                ];
                //tambahkan kompositor baru dari data kompositor existing ? bisa mengakibatkan double data
                $data['Q12'] = $ref_kompositor->update($ref_kom_data);

                //update kompositor of kompositor
                $data_kompositor_of = [
                    'kompositor_id' => $kompositor->id,
                    'ref_kompositor_id' => $request->input('kompositor_id')
                ];
                //\App\Models\KompositorOfKompositor::create($data_kompositor_of);
                
                //update indikator kompositor
                $data_indikator_kompositor = [
                    'indikator_id' => $request->input('indikator_id'),
                    'kompositor_id' => $kompositor->id
                ];
                //IndikatorKompositor::create($data_indikator_kompositor);
            // C-4: sumber kompositor = 4
            } else if ($request->input('sumber_kompositor_id') == '4') { //existing parameter
                $data['C-4'] = "Executed with True";
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
                $data['D7'] = $kompositor;
                $data['Q13'] = $kompositor->update($validated);

                \Illuminate\Support\Facades\Validator::make($request->all(), [
                    'parameter_id' => ['required']
                ])->validate();
                //cari data parameter existing
                $parameter = \App\Models\Parameter::where('id', $request->input('parameter_id'))->first();
                $parameter->update([
                    'nama_parameter' => $request->input('nama_kompositor'),
                    'kalkulasi' => $request->input('kalkulasi'),
                    'value' => $request->input('value'),
                    'indeks_id' => $request->input('indeks_id')
                ]);
                // C-4.1: insert kompositor-parameter
                if ($parameter !== null) {
                    $data['C-4.1'] = "Executed with True";
                    $kompo_param = \App\Models\KompositorParameter::where('kompositor_id', $request->input('kompositor_id'))->first();
                    $data['Q14'] = $kompo_param->update([
                        'parameter_id' => $parameter->id,
                        'kompositor_id' => $kompositor->id
                    ]);
                }
            }

            $pics = $request->input('pics');
            // C-5: 
            if (is_array($pics)) {
                $data['C-5'] = "Executed with True";
                $data['Q15'] = DB::table('kompositor_pic')
                    ->where('kompositor_id', '=', $kompositor->id)
                    ->delete();
                foreach ($pics as $pic) {
                    $data_pic = [
                        'kompositor_id' => $kompositor->id,
                        'pic_id' => $pic['value'],
                        'nama_pic' => $pic['label']
                    ];
                    $data['Q16'] = DB::table('kompositor_pic')->insert($data_pic);
                }
            }
            DB::commit();
            activity()
                ->causedBy(auth()->user())
                ->performedOn($kompositor)
                ->withProperties([
                    'ip' => request()->ip(),
                    'user_agent' => request()->header('User-Agent'),
                    'kompositor_id' => $kompositor->id                
                ])
                ->createdAt(now()->subDays(10))
                ->event('update')
                ->log('Kompositor Update');
            //return $result;
        } catch (\Illuminate\Database\QueryException $e) {
            DB::rollBack();
            $data['error'] = $e->errorInfo[2];
            //return Redirect::back()->with('message', $message);
            return $data;
        }
        //return $data;
        return Redirect::route('kompositor.index-indikator', $request->input('indikator_id'));
    }

    public function agregasiKompositor(\App\Models\Indeks $indeks)
    {
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
                    'indeks.nama_indeks'
                )
                ->where('indeks.id', '=', $indeks->id)
                ->get(),
            //'indikator' => $indikator,
        ]);
    }

    public function getParameter(Kompositor $kompositor)
    {
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

    public function getOfKompositor(Kompositor $kompositor)
    {
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
