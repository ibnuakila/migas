<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PeriodeStoreRequest extends FormRequest
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
            'periode' => ['required','integer'],
            'status' => ['required']
        ];
    }

    public function messages()
    {
        return [
            'periode.required' => 'Periode wajib diisi!',
            'periode.integer' => 'Periode harus bilangan bulat',
            'status.required' => 'Status wajib dipilih!'
        ];
    }
}
