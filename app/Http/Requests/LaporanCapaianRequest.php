<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LaporanCapaianRequest extends FormRequest
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
            'triwulan_id' => ['required', 'integer'],
            'realisasi' => ['required', 'decimal:2'],
            //'kinerja' => ['required'],
            'periode_id' => ['required', 'integer'],
            //'kategori_kinerja_id', [''],
            'indikator_id' => ['required', 'integer'],
            'target' => ['required', 'decimal:2'],
            'persentasi_kinerja' => ['required'],
            'sumber_data' => [''],
            'target' => [''],
            'target_format' => [''],
            'file_path' => ['']
        ];
    }
}
