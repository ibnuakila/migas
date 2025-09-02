<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        
            return array_merge(parent::share($request), [
                'auth' => function() use ($request){
                    if($request->user() !== null){
                        return array_merge([
                            'user' => $request->user()->only('id', 'name', 'email'),                            
                            //'role' => $request->user()->getRoleNames(),
                            'roles' => method_exists($request->user(), 'getRoleNames')
                            ? $request->user()->getRoleNames() // Spatie roles
                            : [$request->user()->role],
                        ]);
                    }
                },
                'flash' => [
                    'message' => fn () => $request->session()->get('message')
                ],
                'ziggy' => function () use ($request) {
                    return array_merge((new Ziggy)->toArray(), [
                        'location' => $request->url(),
                    ]);
                },
            ]);
        
    }
}
