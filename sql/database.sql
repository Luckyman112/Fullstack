-- Создание базы данных
CREATE DATABASE IF NOT EXISTS scandiweb;
USE scandiweb;

-- Таблица категорий
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Таблица продуктов (исправлено поле id)
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    in_stock BOOLEAN NOT NULL,
    description TEXT,
    category_id INT NOT NULL,
    brand VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Таблица галерей (исправлено поле product_id)
CREATE TABLE IF NOT EXISTS galleries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Таблица атрибутов (исправлено поле product_id)
CREATE TABLE IF NOT EXISTS attributes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    type VARCHAR(50),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Таблица значений атрибутов
CREATE TABLE IF NOT EXISTS attribute_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attribute_id INT NOT NULL,
    display_value VARCHAR(255),
    value VARCHAR(255),
    FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE CASCADE
);

-- Таблица цен (исправлено поле product_id)
CREATE TABLE IF NOT EXISTS prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2),
    currency_label VARCHAR(10),
    currency_symbol VARCHAR(10),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Наполнение категорий
INSERT INTO categories (name) VALUES ('all'), ('clothes'), ('tech');

-- Наполнение продуктов
INSERT INTO products (id, name, in_stock, description, category_id, brand) VALUES
('huarache-x-stussy-le', 'Nike Air Huarache Le', true, '<p>Great sneakers for everyday use!</p>', 2, 'Nike x Stussy'),
('jacket-canada-goosee', 'Jacket', true, '<p>Awesome winter jacket</p>', 2, 'Canada Goose'),
('ps-5', 'PlayStation 5', true, '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>', 3, 'Sony'),
('xbox-series-s', 'Xbox Series S 512GB', false, '<ul><li>Hardware-beschleunigtes Raytracing...</li></ul>', 3, 'Microsoft'),
('apple-imac-2021', 'iMac 2021', true, 'The new iMac!', 3, 'Apple'),
('apple-iphone-12-pro', 'iPhone 12 Pro', true, 'This is iPhone 12. Nothing else to say.', 3, 'Apple'),
('apple-airpods-pro', 'AirPods Pro', false, '<h3>Magic like you’ve never heard</h3>', 3, 'Apple'),
('apple-airtag', 'AirTag', true, '<h1>Lose your knack for losing things.</h1>', 3, 'Apple');

-- Наполнение галерей (изображений)
INSERT INTO galleries (product_id, url) VALUES
('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087'),
('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg'),
('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg'),
('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg'),
('apple-imac-2021', 'https://store.storeimages.cdn-apple.com/is/imac-24-blue-selection-hero-202104.jpg'),
('apple-iphone-12-pro', 'https://store.storeimages.cdn-apple.com/is/iphone-12-pro-family-hero.jpg'),
('apple-airpods-pro', 'https://store.storeimages.cdn-apple.com/is/MWP22.jpg'),
('apple-airtag', 'https://store.storeimages.cdn-apple.com/is/airtag-double-select-202104.jpg');

-- Наполнение атрибутов
INSERT INTO attributes (product_id, name, type) VALUES
('huarache-x-stussy-le', 'Size', 'text'),
('jacket-canada-goosee', 'Size', 'text'),
('ps-5', 'Color', 'swatch'),
('ps-5', 'Capacity', 'text'),
('xbox-series-s', 'Color', 'swatch'),
('xbox-series-s', 'Capacity', 'text'),
('apple-imac-2021', 'Capacity', 'text'),
('apple-imac-2021', 'With USB 3 ports', 'text'),
('apple-iphone-12-pro', 'Color', 'swatch');

-- Наполнение значений атрибутов
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES
(1, '40', '40'),
(1, '41', '41'),
(1, '42', '42'),
(1, '43', '43'),
(2, 'Small', 'S'),
(2, 'Medium', 'M'),
(2, 'Large', 'L'),
(3, 'Green', '#44FF03'),
(3, 'Blue', '#030BFF'),
(4, '512G', '512G'),
(5, 'Green', '#44FF03'),
(5, 'White', '#FFFFFF'),
(6, '512G', '512G'),
(6, '1T', '1T'),
(7, 'Yes', 'Yes');

-- Наполнение цен
INSERT INTO prices (product_id, amount, currency_label, currency_symbol) VALUES
('huarache-x-stussy-le', 144.69, 'USD', '$'),
('jacket-canada-goosee', 518.47, 'USD', '$'),
('ps-5', 844.02, 'USD', '$'),
('xbox-series-s', 333.99, 'USD', '$'),
('apple-imac-2021', 1688.03, 'USD', '$'),
('apple-iphone-12-pro', 1000.76, 'USD', '$'),
('apple-airpods-pro', 300.23, 'USD', '$'),
('apple-airtag', 120.57, 'USD', '$');
