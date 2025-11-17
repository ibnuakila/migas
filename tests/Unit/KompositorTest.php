<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Http\Controllers\KompositorController;
use App\Models\Kompositor;
use Illuminate\Http\Request;

class KompositorTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertTrue(true);
    }

    public function test_destroy(){
        $komp = new KompositorController();
        $kompositor = Kompositor::find(99);
        $request = new Request([]);
        $result = $komp->destroy($kompositor, $request);
        return $result;
    }

}
