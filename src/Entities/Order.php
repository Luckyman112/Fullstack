<?php

namespace App\Entities;

class Order
{
    private int $id;
    private string $createdAt;

    public function __construct(int $id, string $createdAt)
    {
        $this->id = $id;
        $this->createdAt = $createdAt;
    }

    public function getId(): int { return $this->id; }
    public function getCreatedAt(): string { return $this->createdAt; }
}
