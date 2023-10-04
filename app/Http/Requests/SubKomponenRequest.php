<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubKomponenRequest extends FormRequest
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
            'komponen_id' => ['required','integer'],
            'nama_sub_komponen' => ['required','string'],
            'bobot' => ['required','decimal:2'],
            'ordering' => ['required'],
            'numbering' => ['required']
        ];
    }
}
