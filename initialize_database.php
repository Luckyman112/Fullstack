<?php

class DatabaseInitializer {
    private $host = 'fdb1028.awardspace.net';
    private $db_name = '4591947_scandiweb';
    private $username = '4591947_scandiweb';
    private $password = 'Kolobok2004';

    public function run() {
        try {
            $pdo = new PDO("mysql:host={$this->host}", $this->username, $this->password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql = file_get_contents(__DIR__ . '/sql/database.sql');

            $pdo->exec($sql);
            echo "База данных успешно создана и инициализирована!";
        } catch (PDOException $e) {
            echo "Ошибка: " . $e->getMessage();
        }
    }
}

$initializer = new DatabaseInitializer();
$initializer->run();
