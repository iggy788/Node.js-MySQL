DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
  item_id INT NOT NULL
  AUTO_INCREMENT,
  product_name VARCHAR
  (150) NOT NULL,
  department_name VARCHAR
  (150) NOT NULL,
  price DECIMAL
  (10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY
  (item_id)
);

  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("basketball", "sports", 29.99, 100);

  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("football", "sports", 19.99, 150);

  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("dog food", "pet supplies", 48.99, 100);

  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("cat food", "pet supplies", 11.99, 500);

  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("shirts", "clothing", 2.50, 100);

  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("khakis", "clothing", 2.50, 100);

  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("Nike Air Jordan Air 12 Retro", "shoes", 394.95, 25);

  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("Nike Air Jordan 11", "shoes", 654.99, 2);

  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("headphones", "music", 2.50, 100);

  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("speakers", "music", 2.50, 100);

  select item_id, product_name
  from products;

  SELECT product_name, stock_quantity, COUNT(*) AS stock_quantity_count
  FROM products
  GROUP BY product_name
  HAVING stock_quantity_count > 10;

-- A query which returns all data for shoes
select *
from products
where department_name = "shoes";

-- A query which returns all data for pet supplies
select *
from products
where department_name = "pet supplies";

-- A query which returns all data for clothing
select *
from products
where department_name = "clothing";

-- A query which returns all data for music
select *
from products
where department_name = "music";

/* A query which returns all data for songs sung by a specific artist */
select *
from top5000 t
where t.artist = 'hanson';

/* A query which returns all artists who appear within the top 5000 more than once */
SELECT artist, COUNT(*) AS artist_count
FROM top5000
GROUP BY artist
HAVING artist_count > 1;

/* A query which returns all data contained within a specific range */
SELECT *
FROM top5000 t
WHERE t.year >= 2005 and t.year < 2010;

/* A query which searches for a specific song in the top 5000 and returns the data for it */
SELECT song, COUNT(*) AS song_count
FROM top5000
GROUP BY song
HAVING song_count > 1;