<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HitungKompositorRequest extends FormRequest
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
            'field' => ['required','string'],
            'f_type' => ['required','string'],
            'p_field_id' => ['required','integer'],
            'indikator_kompositor_id' => ['required','integer']
        ];
    }
}
