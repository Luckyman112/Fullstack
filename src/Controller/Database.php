<?php

namespace Controller;

use PDO;
use PDOException;

class Database {
    private $host = 'localhost';
    private $db_name = 'scandiweb';
    private $username = 'root';
    private $password = 'Kolobok20041';
    private $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
        } catch (PDOException $exception) {
            throw new PDOException("❌ Ошибка подключения к БД: " . $exception->getMessage());
        }

        return $this->conn;
    }
}

