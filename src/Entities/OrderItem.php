<?php

namespace App\Entities;

class OrderItem
{
    private int $id;
    private int $orderId;
    private string $productId;
    private int $quantity;

    public function __construct(int $id, int $orderId, string $productId, int $quantity)
    {
        $this->id = $id;
        $this->orderId = $orderId;
        $this->productId = $productId;
        $this->quantity = $quantity;
    }

    public function getId(): int { return $this->id; }
    public function getOrderId(): int { return $this->orderId; }
    public function getProductId(): string { return $this->productId; }
    public function getQuantity(): int { return $this->quantity; }
}
