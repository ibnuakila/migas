<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IndikatorRequest extends FormRequest
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
            //'id' => ['required'],
            'nama_indikator' => ['required'],
            'satuan_id' => ['required'],
            'level_id' => ['required'],
            'ordering' => ['required'],
            //'numbering' => ['required'],
            'parent_id' => ['required'],
            'pics' => ['required']
        ];
    }

    public function messages()
    {
        return [
            'nama_indikator.required' => 'Nama indikator wajib diisi!',
            'satuan_id.required' => 'Satuan wajib diisi!',
            'level_id.required' => 'Level wajib dipilih!',
            'ordering.required' => 'Order wajib diisi!',
            'parent_id.required' => 'Parent wajib diisi!',
            'pics.required' => 'PIC wajib diisi'            
        ];
    }
}
