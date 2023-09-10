<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class UpdateStoreRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'store_name' => ['string', 'required', 'min:3', 'max:255'],
            'store_description' => ['string', 'required', 'min:3'],
            'store_banner' => ['nullable', File::image()->min('1kb')->max('10mb')],
        ];
    }
}
