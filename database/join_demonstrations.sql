-- ============================================
-- TINDA TRACK
-- JOIN DEMONSTRATIONS
-- Database: tinda_track
-- ============================================

USE tinda_track;

-- ============================================
-- 1. INNER JOIN
-- Display products with their category and unit.
-- Only matching records are displayed.
-- ============================================

SELECT
    p.product_id,
    p.product_name,
    c.category_name,
    u.unit_name
FROM products p
INNER JOIN categories c
    ON p.category_id = c.category_id
LEFT JOIN units u
    ON p.unit_id = u.unit_id;


-- ============================================
-- 2. LEFT JOIN
-- Display all customers, including customers
-- who do not have sales.
-- ============================================

SELECT
    c.customer_id,
    c.customer_name,
    s.sale_id,
    s.total_amount
FROM customers c
LEFT JOIN sales s
    ON c.customer_id = s.customer_id;


-- ============================================
-- 3. RIGHT JOIN
-- Display all sales, including sales without
-- an associated customer (walk-in sales).
-- ============================================

SELECT
    c.customer_id,
    c.customer_name,
    s.sale_id,
    s.total_amount
FROM customers c
RIGHT JOIN sales s
    ON c.customer_id = s.customer_id;


-- ============================================
-- 4. FULL OUTER JOIN EQUIVALENT
-- MySQL does not directly support FULL OUTER JOIN.
-- Combine LEFT JOIN and RIGHT JOIN using UNION.
-- Display all customers and all sales.
-- ============================================

SELECT
    c.customer_id,
    c.customer_name,
    s.sale_id,
    s.total_amount
FROM customers c
LEFT JOIN sales s
    ON c.customer_id = s.customer_id

UNION

SELECT
    c.customer_id,
    c.customer_name,
    s.sale_id,
    s.total_amount
FROM customers c
RIGHT JOIN sales s
    ON c.customer_id = s.customer_id;


-- ============================================
-- END OF JOIN DEMONSTRATIONS
-- ============================================
