<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class StoreProductRequest extends FormRequest
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
            'product_name' => ['string', 'required', 'min:3', 'max:255'],
            'description' => ['string', 'required', 'min:3', 'max:255'],
            'category' => ['string', 'required', 'min:3'],
            'image' => ['required', File::image()->min('1kb')->max('10mb')],
            'price' => ['numeric', 'required', 'min:3'],
            'discount' => ['numeric','nullable'],
            'release_date' => ['date','nullable'],
        ];
    }
}
