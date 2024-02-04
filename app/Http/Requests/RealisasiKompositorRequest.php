<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RealisasiKompositorRequest extends FormRequest
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
            'kompositor_id' => ['required'],
            'input_realisasi_id' => ['required'],
            'nilai' => ['nullable']
        ];
    }
}
