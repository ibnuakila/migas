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
            
            'periode_id' => ['required', 'integer'],               
            'indikator_id' => ['required', 'integer'],
            'kategori_kinerja_id' =>['nullable'],
            'target' => ['required', 'decimal:5'],
            'target_format' => ['required'],
            'status_kinerja' => ['nullable'],
            'kinerja_tahunan' => ['nullable'],
            'sumber_data' => ['nullable'],
        ];
    }
}
