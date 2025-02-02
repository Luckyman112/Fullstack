<?php

namespace App\Models\Product;

class ClothesProduct extends AbstractProduct
{
    public function getTypeName(): string
    {
        return 'clothes';
    }
}
