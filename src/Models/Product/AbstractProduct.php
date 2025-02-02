<?php

namespace App\Models\Product;

/**
 * Абстрактная модель продукта.
 * Поля:
 *  id, name, in_stock, category, brand,
 *  description, gallery(json), attributes(json),
 *  price, currency_label, currency_symbol
 *
 * Метод getTypeName() будет переопределён в подклассах
 * (ClothesProduct, TechProduct).
 */
abstract class AbstractProduct
{
    protected string $id;
    protected string $name;
    protected bool $inStock;
    protected string $category;
    protected ?string $brand;
    protected string $description;
    protected array $gallery;
    protected array $attributes;
    protected float $price;
    protected ?string $currencyLabel;
    protected ?string $currencySymbol;

    public function __construct(array $data)
    {
        $this->id = $data['id'];
        $this->name = $data['name'];
        $this->inStock = (bool)$data['in_stock'];
        $this->category = $data['category'] ?? '';
        $this->brand = $data['brand'] ?? null;
        $this->description = $data['description'] ?? '';

        // JSON поля
        $this->gallery = \json_decode($data['gallery'] ?? '[]', true) ?? [];
        $this->attributes = \json_decode($data['attributes'] ?? '[]', true) ?? [];

        $this->price = isset($data['price']) ? (float)$data['price'] : 0.0;
        $this->currencyLabel = $data['currency_label'] ?? null;
        $this->currencySymbol = $data['currency_symbol'] ?? null;
    }

    // Геттеры
    public function getId(): string { return $this->id; }
    public function getName(): string { return $this->name; }
    public function isInStock(): bool { return $this->inStock; }
    public function getCategory(): string { return $this->category; }
    public function getBrand(): ?string { return $this->brand; }
    public function getDescription(): string { return $this->description; }
    public function getGallery(): array { return $this->gallery; }
    public function getAttributesData(): array { return $this->attributes; }

    public function getPrice(): float { return $this->price; }
    public function getCurrencyLabel(): ?string { return $this->currencyLabel; }
    public function getCurrencySymbol(): ?string { return $this->currencySymbol; }

    // Полиморфный метод - каждый subclass может возвращать свой typeName
    abstract public function getTypeName(): string;
}

