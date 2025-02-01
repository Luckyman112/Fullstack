<?php

namespace App\Controller;

use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use PDO;
use Throwable;

class GraphQL {
    static public function handle() {
        try {
            // Тип Category
            $categoryType = new ObjectType([
                'name' => 'Category',
                'fields' => [
                    'id' => Type::int(),
                    'name' => Type::string(),
                ],
            ]);

            // Тип Currency
            $currencyType = new ObjectType([
                'name' => 'Currency',
                'fields' => [
                    'symbol' => Type::string(),
                ],
            ]);

            // Тип Price
            $priceType = new ObjectType([
                'name' => 'Price',
                'fields' => [
                    'amount' => Type::float(),
                    'currency' => [
                        'type' => $currencyType,
                        'resolve' => fn($root) => ['symbol' => $root['currency_symbol']],
                    ],
                ],
            ]);

            // Тип Product
            $productType = new ObjectType([
                'name' => 'Product',
                'fields' => [
                    'id' => Type::string(),
                    'name' => Type::string(),
                    'inStock' => Type::boolean(),
                    'description' => Type::string(),
                    'categoryId' => Type::int(),
                    'brand' => Type::string(),
                    'gallery' => [
                        'type' => Type::listOf(Type::string()),
                        'resolve' => fn($root) => self::fetchProductGallery($root['id']),
                    ],
                    'prices' => [
                        'type' => Type::listOf($priceType),
                        'resolve' => fn($root) => self::fetchProductPrices($root['id']),
                    ],
                ],
            ]);

            // Query
            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'categories' => [
                        'type' => Type::listOf($categoryType),
                        'resolve' => fn() => self::fetchCategories(),
                    ],
                    'products' => [
                        'type' => Type::listOf($productType),
                        'resolve' => fn() => self::fetchProducts(),
                    ],
                    'product' => [
                        'type' => $productType,
                        'args' => [
                            'id' => ['type' => Type::nonNull(Type::string())],
                        ],
                        'resolve' => fn($root, $args) => self::fetchProductById($args['id']),
                    ],
                ],
            ]);

            // Mutation
            $mutationType = new ObjectType([
                'name' => 'Mutation',
                'fields' => [
                    'addCategory' => [
                        'type' => Type::boolean(),
                        'args' => [
                            'name' => ['type' => Type::nonNull(Type::string())],
                        ],
                        'resolve' => fn($root, $args) => self::addCategory($args['name']),
                    ],
                    'addProduct' => [
                        'type' => Type::boolean(),
                        'args' => [
                            'id' => ['type' => Type::nonNull(Type::string())],
                            'name' => ['type' => Type::nonNull(Type::string())],
                            'inStock' => ['type' => Type::nonNull(Type::boolean())],
                            'description' => ['type' => Type::string()],
                            'categoryId' => ['type' => Type::nonNull(Type::int())],
                            'brand' => ['type' => Type::string()],
                        ],
                        'resolve' => fn($root, $args) => self::addProduct($args),
                    ],
                ],
            ]);

            // Схема
            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery($queryType)
                    ->setMutation($mutationType)
            );

            // Обработка запроса
            $rawInput = file_get_contents('php://input');
            $input = json_decode($rawInput, true);
            $query = $input['query'] ?? '';
            $variableValues = $input['variables'] ?? null;

            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variableValues);
            $output = $result->toArray();
        } catch (Throwable $e) {
            error_log($e->getMessage());
            $output = ['error' => ['message' => 'Internal server error']];
        }

        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($output);
    }

    private static function fetchCategories() {
        $pdo = self::getConnection();
        $stmt = $pdo->query("SELECT * FROM categories");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private static function fetchProducts() {
        $pdo = self::getConnection();
        $stmt = $pdo->query("
            SELECT p.id, p.name, p.in_stock, p.description, p.category_id, p.brand,
                   COALESCE(NULLIF(GROUP_CONCAT(DISTINCT g.url SEPARATOR '|'), ''), '') AS gallery,
                   COALESCE(NULLIF(GROUP_CONCAT(DISTINCT pr.currency_label, '|', pr.amount SEPARATOR ';'), ''), '') AS prices
            FROM products p
            LEFT JOIN galleries g ON p.id = g.product_id
            LEFT JOIN prices pr ON p.id = pr.product_id
            GROUP BY p.id
        ");
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($products as &$product) {
            $product['inStock'] = isset($product['in_stock']) ? (bool)$product['in_stock'] : null;
            unset($product['in_stock']);

            $product['gallery'] = array_filter(explode('|', $product['gallery'] ?? ''));
            $product['prices'] = array_map(function($price) {
                $priceParts = explode('|', $price);
                return [
                    'currency' => ['symbol' => $priceParts[0]],
                    'amount' => (float)$priceParts[1]
                ];
            }, array_filter(explode(';', $product['prices'] ?? '')));
        }

        return $products;
    }

    private static function fetchProductById($id) {
        $pdo = self::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM products WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    private static function fetchProductGallery($productId) {
        $pdo = self::getConnection();
        $stmt = $pdo->prepare("SELECT url FROM galleries WHERE product_id = :productId");
        $stmt->bindParam(':productId', $productId);
        $stmt->execute();
        return array_column($stmt->fetchAll(PDO::FETCH_ASSOC), 'url');
    }

    private static function fetchProductPrices($productId) {
        $pdo = self::getConnection();
        $stmt = $pdo->prepare("SELECT amount, currency_symbol FROM prices WHERE product_id = :productId");
        $stmt->bindParam(':productId', $productId);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private static function addCategory($name) {
        $pdo = self::getConnection();
        $stmt = $pdo->prepare("INSERT INTO categories (name) VALUES (:name)");
        $stmt->bindParam(':name', $name);
        return $stmt->execute();
    }

    private static function addProduct($args) {
        $pdo = self::getConnection();
        $stmt = $pdo->prepare("
            INSERT INTO products (id, name, in_stock, description, category_id, brand)
            VALUES (:id, :name, :inStock, :description, :categoryId, :brand)
        ");
        return $stmt->execute($args);
    }

    private static function getConnection() {
        return new PDO('mysql:host=localhost;dbname=scandiweb', 'root', 'Kolobok20041', [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ]);
    }
}
