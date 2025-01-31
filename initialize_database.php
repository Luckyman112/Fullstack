<?php

class DatabaseInitializer {
    private $host = 'localhost';
    private $db_name = 'scandiweb';
    private $username = 'root';
    private $password = 'Kolobok20041';

    public function run() {
        try {
            // Подключение к MySQL
            $pdo = new PDO("mysql:host={$this->host}", $this->username, $this->password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Чтение SQL-скрипта
            $sql = file_get_contents(__DIR__ . '/sql/database.sql');

            // Выполнение SQL-скрипта
            $pdo->exec($sql);
            echo "База данных успешно создана и инициализирована!";
        } catch (PDOException $e) {
            echo "Ошибка: " . $e->getMessage();
        }
    }
}

// Запуск инициализации
$initializer = new DatabaseInitializer();
$initializer->run();
