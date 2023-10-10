<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InputRealisasiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'indikator_kompositor_id' => ['require','integer'],
            'realisasi' => ['require','decimal:2'],
            'satuan' => ['require'],
            'triwulan_id' => ['require','integer'],
            'pic_id' => ['require','integer'],
            'periode_id' => ['require','integer']
        ];
    }
}
