<?php

namespace App\Factories;

use App\Models\Product\AbstractProduct;
use App\Models\Product\ClothesProduct;
use App\Models\Product\TechProduct;


class ProductFactory
{
    public static function create(array $row): AbstractProduct
    {
        return match ($row['category'] ?? '') {
            'tech'    => new TechProduct($row),
            'clothes' => new ClothesProduct($row),
            default   => new ClothesProduct($row),
        };
    }
}
