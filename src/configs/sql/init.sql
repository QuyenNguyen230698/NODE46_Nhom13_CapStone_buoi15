DROP DATABASE IF EXISTS db_express_buoi10;
CREATE DATABASE db_express_buoi10;
USE db_express_buoi10;

CREATE TABLE restaurant (
    res_id INT PRIMARY KEY AUTO_INCREMENT,
    res_name VARCHAR(255),
    img VARCHAR(255),
    description VARCHAR(255)
);

INSERT INTO restaurant (res_name, img, description) VALUES
    ('grand marina', 'http:marina.png', 'sang nhat q1'),
    ('landmark81', 'http:land81.png', 'caonhatSG'),
    ('whiteplace', 'http:damcuoi.png', 'nhận đặt bàn đám cưới');
