<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;
use Inertia\Inertia;

class LogController extends Controller //implements ICrud
{
    //
    public function create()
    {
        
    }

    public function store()
    {

    }

    public function edit()
    {
        
    }

    public function update()
    {
        
    }

    public function index(Request $request)
    {
        $logs = Activity::with('causer')
        ->when($request->date, function ($query, $start) {
            $query->whereDate('created_at', '=', $start);
        })
        // ->when($request->nama, function ($query, $end) {
        //     $query->where('causer_id', '=', $end);
        // })
        ->when($request->filled('nama'),function ($query) use ($request){
            $query->whereHas('causer', function ($q) use ($request){
                $q->where('name', 'ILIKE', "%{$request->nama}%");
            });
        })
        // ->when($request->filled(['start_date', 'end_date']), function ($query) use ($request) {
        //     $query->whereBetween('created_at', [
        //         $request->start_date,
        //         $request->end_date,
        //     ]);
        // })
        ->latest()
        ->paginate(15);

        return Inertia::render('AuditLogs/ListLog', [
            'logs' => $logs,
        ]);
    }

    public function destroy()
    {
        
    }
}
