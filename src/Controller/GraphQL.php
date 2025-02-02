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
            // Создаем схему GraphQL
            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery(self::getQueryType())
                    ->setMutation(self::getMutationType())
            );

            // Обработка запроса
            $rawInput = file_get_contents('php://input');
            $input = json_decode($rawInput, true);
            $query = $input['query'] ?? '';
            $variableValues = $input['variables'] ?? null;

            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variableValues);
            $output = $result->toArray();
        } catch (Throwable $e) {
            error_log("GraphQL Error: " . $e->getMessage());
            $output = ['error' => ['message' => 'Internal server error']];
        }        

        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($output);
    }

    private static function getQueryType() {
        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'categories' => [
                    'type' => Type::listOf(self::getCategoryType()),
                    'resolve' => function () {
                        $categories = self::fetchCategories();
                        if ($categories === false) {
                            error_log("Failed to fetch categories.");
                        }
                        return $categories;
                    },
                ],
                'category' => [
                    'type' => self::getCategoryType(),
                    'args' => [
                        'title' => ['type' => Type::nonNull(Type::string())],
                    ],
                    'resolve' => fn($root, $args) => self::fetchCategoryByTitle($args['title']),
                ],
                'products' => [
                    'type' => Type::listOf(self::getProductType()),
                    'resolve' => fn() => self::fetchProducts(),
                ],
                'product' => [
                    'type' => self::getProductType(),
                    'args' => [
                        'id' => ['type' => Type::nonNull(Type::string())],
                    ],
                    'resolve' => fn($root, $args) => self::fetchProductById($args['id']),
                ],
            ],
        ]);
    }

    private static function getMutationType() {
        return new ObjectType([
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
    }

    private static function getCategoryType() {
        return new ObjectType([
            'name' => 'Category',
            'fields' => [
                'id' => Type::int(),
                'name' => Type::string(),
                'products' => [
                    'type' => Type::listOf(self::getProductType()),
                    'resolve' => fn($root) => self::fetchProductsByCategory($root['id']),
                ],
            ],
        ]);
    }

    private static function getProductType() {
        return new ObjectType([
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
                    'type' => Type::listOf(new ObjectType([
                        'name' => 'Price',
                        'fields' => [
                            'amount' => Type::float(),
                            'currency' => new ObjectType([
                                'name' => 'Currency',
                                'fields' => [
                                    'symbol' => Type::string(),
                                ],
                            ]),
                        ],
                    ])),
                    'resolve' => fn($root) => self::fetchProductPrices($root['id']),
                ],
            ],
        ]);
    }

    private static function fetchCategories() {
        try {
            $pdo = self::getConnection();
            $stmt = $pdo->query("SELECT * FROM categories");
            $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (!$categories) {
                error_log("No categories found in database.");
            }
            return $categories;
        } catch (Throwable $e) {
            error_log("Database error in fetchCategories: " . $e->getMessage());
            return false;
        }
    }

    private static function fetchCategoryByTitle($title) {
        $pdo = self::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM categories WHERE name = :title");
        $stmt->bindParam(':title', $title);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    private static function fetchProducts() {
        $pdo = self::getConnection();
        $stmt = $pdo->query("SELECT * FROM products");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private static function fetchProductsByCategory($categoryId) {
        $pdo = self::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM products WHERE category_id = :categoryId");
        $stmt->bindParam(':categoryId', $categoryId);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
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

    private static function getConnection() {
        return new PDO('mysql:host=localhost;dbname=scandiweb', 'root', '', [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ]);
    }
}
