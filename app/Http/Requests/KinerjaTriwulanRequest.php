<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KinerjaTriwulanRequest extends FormRequest
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
            'laporan_capaian_id' => ['required'],                
            'triwulan_id' => ['required'],
            'kinerja' => ['nullable'],
            'kinerja_format' => ['required']
        ];
    }
}
