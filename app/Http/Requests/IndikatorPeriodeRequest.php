<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IndikatorPeriodeRequest extends FormRequest
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
            'indikator_id' => ['required','integer'],
            'periode_id' => ['required','integer'],
            'target' => ['required','decimal:2'],
            'pic_id' => ['required','integer']
        ];
    }
}
