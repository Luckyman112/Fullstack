<?php

namespace App\Controller;

use GraphQL\Type\Definition\InputObjectType; 
use App\Database;
use App\Entities\Category;
use App\Entities\Order;
use App\Factories\ProductFactory;
use App\Models\Product\AbstractProduct;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use PDO;
use Throwable;

/**
 * 
 *
 * 
 *
 * @package App\Controller
 */
class GraphQLController
{
    /**
     * 
     *
     * @return void
     */
    public static function handle(): void
    {
        try {
            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery(self::buildQueryType())
                    ->setMutation(self::buildMutationType()) 
            );

            $input = json_decode(file_get_contents('php://input'), true);
            $query = $input['query'] ?? '';
            $variables = $input['variables'] ?? [];

            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variables);
            $output = $result->toArray();
        } catch (Throwable $e) {
            error_log($e->getMessage());
            $output = [
                'errors' => [
                    ['message' => $e->getMessage()]
                ]
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($output);
    }

    /**
     * 
     *
     * @return ObjectType
     */
    private static function buildQueryType(): ObjectType
    {
        $currencyType = new ObjectType([
            'name' => 'Currency',
            'fields' => ['symbol' => Type::string()],
        ]);

        $priceType = new ObjectType([
            'name' => 'Price',
            'fields' => [
                'amount' => Type::float(),
                'currency' => $currencyType,
            ],
        ]);

        $attributeItemType = new ObjectType([
            'name' => 'AttributeItem',
            'fields' => [
                'id' => Type::string(),
                'value' => Type::string(),
                'displayValue' => Type::string(),
            ],
        ]);

        $attributeType = new ObjectType([
            'name' => 'Attribute',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'type' => Type::string(),
                'items' => Type::listOf($attributeItemType),
            ],
        ]);

        $categoryType = new ObjectType([
            'name' => 'Category',
            'fields' => [
                'name' => Type::string(),
            ],
            'resolveField' => function ($rootValue, $args, $context, $info) {
                $fieldName = $info->fieldName;
                return match ($fieldName) {
                    'name' => $rootValue->getName(),
                    default => null,
                };
            }
        ]);

        $productType = new ObjectType([
            'name' => 'Product',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'inStock' => Type::boolean(),
                'category' => Type::string(),
                'brand' => Type::string(),
                'description' => Type::string(),
                'gallery' => Type::listOf(Type::string()),
                'attributes' => Type::listOf($attributeType),
                'price' => Type::float(),
                'currencyLabel' => Type::string(),
                'currencySymbol' => Type::string(),
                'typeName' => Type::string(),
                'prices' => [
                    'type' => Type::listOf($priceType),
                    'resolve' => function ($rootValue) {
                        return [[
                            'amount' => (float)$rootValue->getPrice(),
                            'currency' => ['symbol' => $rootValue->getCurrencySymbol() ?? '$']
                        ]];
                    },
                ],
            ],
            'resolveField' => function ($productValue, $args, $context, $info) {
                $product = $productValue;
                $fieldName = $info->fieldName;
                return match ($fieldName) {
                    'id' => $product->getId(),
                    'name' => $product->getName(),
                    'inStock' => $product->isInStock(),
                    'category' => $product->getCategory(),
                    'brand' => $product->getBrand(),
                    'description' => $product->getDescription(),
                    'gallery' => $product->getGallery(),
                    'attributes' => $product->getAttributesData(),
                    'price' => $product->getPrice(),
                    'currencyLabel' => $product->getCurrencyLabel(),
                    'currencySymbol' => $product->getCurrencySymbol(),
                    'typeName' => $product->getTypeName(),
                    default => null,
                };
            }
        ]);

        $orderType = new ObjectType([
            'name' => 'Order',
            'fields' => [
                'id' => Type::int(),
                'createdAt' => Type::string(),
            ]
        ]);

        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'categories' => [
                    'type' => Type::listOf($categoryType),
                    'resolve' => fn() => self::fetchAllCategories(),
                ],
                'products' => [
                    'type' => Type::listOf($productType),
                    'resolve' => fn() => self::fetchAllProducts(),
                ],
                'product' => [
                    'type' => $productType,
                    'args' => ['id' => Type::nonNull(Type::string())],
                    'resolve' => fn($root, $args) => self::fetchProductById($args['id']),
                ],
            ],
        ]);
    }

    /**
     * 
     *
     * @return ObjectType
     */
    private static function buildMutationType(): ObjectType
    {
        $orderItemInput = new InputObjectType([
            'name' => 'OrderItemInput',
            'fields' => [
                'productId' => Type::nonNull(Type::string()),
                'quantity' => Type::nonNull(Type::int()),
            ]
        ]);

        return new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'addProduct' => [
                    'type' => Type::boolean(),
                    'args' => [
                        'id' => Type::nonNull(Type::string()),
                        'name' => Type::nonNull(Type::string()),
                        'inStock' => Type::nonNull(Type::boolean()),
                        'category' => Type::nonNull(Type::string()),
                        'brand' => Type::string(),
                        'description' => Type::string(),
                        'price' => Type::float(),
                        'currencyLabel' => Type::string(),
                        'currencySymbol' => Type::string(),
                    ],
                    'resolve' => fn($root, $args) => self::addProduct($args),
                ],
                'deleteProducts' => [
                    'type' => Type::boolean(),
                    'args' => [
                        'ids' => Type::nonNull(Type::listOf(Type::nonNull(Type::string())))
                    ],
                    'resolve' => fn($root, $args) => self::deleteProducts($args['ids']),
                ],
                'createOrder' => [
                    'type' => Type::nonNull(Type::int()),
                    'args' => [
                        'items' => Type::nonNull(Type::listOf($orderItemInput)),
                    ],
                    'resolve' => fn($root, $args) => self::createOrder($args['items']),
                ],
            ],
        ]);
    }

    /**
     * 
     *
     * @return array
     */
    private static function fetchAllCategories(): array
    {
        $pdo = Database::getConnection();
        $stmt = $pdo->query("SELECT DISTINCT category FROM products WHERE category IS NOT NULL");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $result = [];
        foreach ($rows as $r) {
            $catName = $r['category'];
            if ($catName) {
                $result[] = new Category($catName);
            }
        }
        return $result;
    }

    /**
     * 
     *
     * @return array
     */
    private static function fetchAllProducts(): array
    {
        $pdo = Database::getConnection();
        $stmt = $pdo->query("SELECT * FROM products");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $list = [];
        foreach ($rows as $row) {
            $list[] = ProductFactory::create($row);
        }
        return $list;
    }

    /**
     * 
     *
     * @param string $id
     * @return AbstractProduct|null
     */
    private static function fetchProductById(string $id): ?AbstractProduct
    {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM products WHERE id = :id");
        $stmt->bindValue(':id', $id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            return null;
        }
        return ProductFactory::create($row);
    }

    /**
     * 
     *
     * @return array
     */
    private static function fetchAllOrders(): array
    {
        $pdo = Database::getConnection();
        $stmt = $pdo->query("SELECT * FROM orders ORDER BY id DESC");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $orders = [];
        foreach ($rows as $r) {
            $orders[] = new Order($r['id'], $r['created_at']);
        }
        return $orders;
    }

    /**
     * 
     *
     * @param array $args
     * @return bool
     */
    private static function addProduct(array $args): bool
    {
        $pdo = Database::getConnection();
        $sql = "INSERT INTO products
          (id, name, in_stock, category, brand, description, price, currency_label, currency_symbol)
          VALUES
          (:id, :name, :inStock, :category, :brand, :description, :price, :cLabel, :cSym)";
        $stmt = $pdo->prepare($sql);

        return $stmt->execute([
            ':id' => $args['id'],
            ':name' => $args['name'],
            ':inStock' => $args['inStock'] ? 1 : 0,
            ':category' => $args['category'],
            ':brand' => $args['brand'] ?? null,
            ':description' => $args['description'] ?? '',
            ':price' => $args['price'] ?? 0,
            ':cLabel' => $args['currencyLabel'] ?? null,
            ':cSym' => $args['currencySymbol'] ?? null,
        ]);
    }

    /**
     * 
     *
     * @param array $ids
     * @return bool
     */
    private static function deleteProducts(array $ids): bool
    {
        if (empty($ids)) {
            return false;
        }
        $pdo = Database::getConnection();
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $stmt = $pdo->prepare("DELETE FROM products WHERE id IN ($placeholders)");
        return $stmt->execute($ids);
    }

    /**
     * 
     * 
     *
     * @param array $items
     * @return int
     * @throws \Exception
     */
    private static function createOrder(array $items): int
    {
        $pdo = Database::getConnection();
        $pdo->beginTransaction();
        try {
            $pdo->exec("INSERT INTO orders (created_at) VALUES (NOW())");
            $orderId = (int)$pdo->lastInsertId();

            $stmt = $pdo->prepare("INSERT INTO order_items (order_id, product_id, quantity)
                                   VALUES (:oid, :pid, :qty)");
            foreach ($items as $it) {
                $stmt->execute([
                    ':oid' => $orderId,
                    ':pid' => $it['productId'],
                    ':qty' => $it['quantity'],
                ]);
            }

            $pdo->commit();
            return $orderId;
        } catch (\Exception $e) {
            $pdo->rollBack();
            throw $e;
        }
    }
}
