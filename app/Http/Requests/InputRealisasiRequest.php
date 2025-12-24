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
            'realisasi' => ['required','decimal:2'],
            'realisasi_format' => ['required'],
            'triwulan_id' => ['required','integer'],            
            'laporan_capaian_id' => ['required','integer']
        ];
    }

    public function messages()
    {
        return [
            'realisasi.required' => 'Realisasi wajib diisi!',
            'realisasi_format.required' => 'Realisasi Format wajib diisi!',
            'triwulan_id.required' => 'Triwulan wajib dipilih!',
            'laporan_capaian_id.required' => 'Laporan Capaian Id wajib diisi!'
                      
        ];
    }
}
