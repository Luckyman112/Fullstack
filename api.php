<?php

require_once '../src/Controller/Database.php';

use Controller\Database;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Для разрешения запросов с фронтенда

$database = new Database();
$conn = $database->getConnection();

// Получить все категории
if ($_SERVER['REQUEST_URI'] === '/api/categories' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->query("SELECT * FROM categories");
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($categories);
    exit;
}

// Получить все продукты
if ($_SERVER['REQUEST_URI'] === '/api/products' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->query("SELECT * FROM products");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($products);
    exit;
}

// Получить продукт по ID
if (preg_match('/^\\/api\\/products\\/(.+)$/', $_SERVER['REQUEST_URI'], $matches) && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $productId = $matches[1];
    $stmt = $conn->prepare("SELECT * FROM products WHERE id = :id");
    $stmt->bindParam(':id', $productId);
    $stmt->execute();
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        echo json_encode($product);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Product not found"]);
    }
    exit;
}

// Если маршрут не найден
http_response_code(404);
echo json_encode(["error" => "Route not found"]);
