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
            $dsn = 'mysql:host=fdb1028.awardspace.net;dbname=4591947_scandiweb;charset=utf8';
            $user = '4591947_scandiweb';
            $pass = 'Kolobok2004'; 

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

