<?php
namespace App;

use PDO;
use PDOException;

class Database
{
    private static ?PDO $conn = null;

    public static function getConnection(): PDO
    {
        if (!self::$conn) {
            $dsn = 'mysql:host=localhost;dbname=scandiweb;charset=utf8';
            $user = 'root';
            $pass = 'Kolobok20041'; 

            try {
                self::$conn = new PDO($dsn, $user, $pass, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                ]);
            } catch (PDOException $e) {
                die("DB Connection failed: " . $e->getMessage());
            }
        }
        return self::$conn;
    }
}

