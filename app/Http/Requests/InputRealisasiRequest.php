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
            'indikator_kompositor_id' => ['required','integer'],
            'realisasi' => ['required','decimal:2'],
            'satuan' => ['required'],
            'triwulan_id' => ['required','integer'],
            //'pic_id' => ['required','integer'],
            'periode_id' => ['required','integer'],
            'laporan_capaian_id' => ['required','integer']
        ];
    }
}
