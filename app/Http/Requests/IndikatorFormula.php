<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IndikatorFormula extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['nullable'],
            'indikator_id' => ['required'],
            'formula_realisasi' => ['required'],
            'mapping_realisasi' => ['required'],
            'formula_kinerja' => ['required'],
            'mapping_kinerja' => ['required']
        ];
    }
}
