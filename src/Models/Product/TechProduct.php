<?php

namespace App\Models\Product;

class TechProduct extends AbstractProduct
{
    public function getTypeName(): string
    {
        return 'tech';
    }
}
