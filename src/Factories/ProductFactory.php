<?php

namespace App\Factories;

use App\Models\Product\AbstractProduct;
use App\Models\Product\ClothesProduct;
use App\Models\Product\TechProduct;

/**
 * Фабрика, чтобы создать нужный подкласс продукта
 * без if/switch в коде приложения. Смотрим поле 'category'.
 */
class ProductFactory
{
    public static function create(array $row): AbstractProduct
    {
        // поле 'category' может быть 'clothes', 'tech', ...
        // Если не совпало, пусть будет Clothes.
        return match ($row['category'] ?? '') {
            'tech'    => new TechProduct($row),
            'clothes' => new ClothesProduct($row),
            default   => new ClothesProduct($row),
        };
    }
}
