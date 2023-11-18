<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KompositorRequest extends FormRequest
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
            'nama_kompositor' => ['required'],
            'satuan' => ['required'],
            'indeks_id' => ['required'],
            'jenis_kompositor_id' => ['required'],
            'indikator_id' => ['required'],
            'type_kompositor' => ['required']
        ];
    }
}
