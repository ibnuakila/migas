<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KompositorRequest extends FormRequest
{
    public string $scenario = 'New';
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
        if($this->scenario === 'New'){
            return [
                'nama_kompositor' => ['required'],
                'satuan' => ['required'],
                'indeks_id' => ['required'],
                'jenis_kompositor_id' => ['required'],
                'indikator_id' => ['required'],
                //'type_kompositor' => ['required'],
                'pics' => ['required'],
                'sumber_kompositor' => ['required']
            ];
        }elseif($this->scenario === 'Existing Indikator'){
            return [
                //'nama_kompositor' => ['required'],
                //'satuan' => ['required'],
                'indeks_id' => ['required'],
                //'jenis_kompositor_id' => ['required'],
                'indikator_id' => ['required'],
                'kompositor_id' => ['required'],
                'pics' => ['required'],
                //'sumber_kompositor' => ['required']
            ];
        }elseif($this->scenario === 'Existing Kompositor'){
            return [
                //'nama_kompositor' => ['required'],
                //'satuan' => ['required'],
                'indeks_id' => ['required'],
                //'jenis_kompositor_id' => ['required'],
                //'indikator_id' => ['required'],
                //'type_kompositor' => ['required'],
                'pics' => ['required'],
                'kompositor_id' => ['required']
            ];
        }else{
            return [
                'nama_kompositor' => ['required'],
                'satuan' => ['required'],
                'indeks_id' => ['required'],
                'jenis_kompositor_id' => ['required'],
                'indikator_id' => ['required'],
                //'type_kompositor' => ['required'],
                'pics' => ['required'],
                'sumber_kompositor' => ['required']
            ];
        }
    }

    public function messages()
    {
        if($this->scenario === 'New'){
            return [
                'nama_kompositor.required' => 'Nama kompositor wajib diisi!',
                'satuan.required' => 'Satuan wajib diisi!',
                'indeks_id.required' => 'Indeks wajib dipilih!',
                'jenis_kompositor_id.required' => 'Jenis kompositor wajib dipilih!',
                'sumber_kompositor.required' => 'Sumber kompositor wajib dipilih!',
                'pics.required' => 'PIC wajib diisi!'
            ];
        }elseif($this->scenario === 'Existing Indikator'){
            return [
                //'nama_kompositor.required' => 'Nama kompositor wajib diisi!',
                //'satuan.required' => 'Satuan wajib diisi!',
                'indikator_id.required' => 'Indikator wajib dipilih!',
                'kompositor_id.required' => 'Kompositor wajib dipilih!',
                'indeks_id.required' => 'Indeks wajib dipilih!',
                'pics.required' => 'PIC wajib diisi!'
            ];
        }elseif($this->scenario === 'Existing Kompositor'){
            return[
                'indeks_id.required' => 'Indeks wajib dipilih!',
                'kompositor_id.required' => 'Kompositor wajib dipilih!',
                'pics.required' => 'PIC wajib diisi!'
            ];
        }else{
            return [
                'nama_kompositor.required' => 'Nama kompositor wajib diisi!',
                'satuan.required' => 'Satuan wajib diisi!',
                'indeks_id.required' => 'Indeks wajib dipilih!',
                'jenis_kompositor_id.required' => 'Jenis kompositor wajib dipilih!',
                'sumber_kompositor.required' => 'Sumber kompositor wajib dipilih!',
                'pics.required' => 'PIC wajib diisi!'
            ];
        }
    }
}
