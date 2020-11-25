// truy van phuc tap
#lay ra so tien 1 user dax mua hang
SELECT u.name, u.email, SUM(od.amount*od.priceEach) as totalMoney
FROM orders o JOIN orderdetails od 
ON o.id = od.orderID
JOIN users u ON o.user_id = u.id
GROUP BY u.id
#lay ra thong tin va so luong cac san pham duoc order
SELECT p.name, p.category, SUM(amount) as amountOrders
FROM orders o JOIN orderdetails od 
ON o.id = od.orderID
JOIN products p ON od.product_id = p.id
GROUP BY p.id 
#lay ra thong tin chi tiet cua sp

SELECT p.*, pd.*, c.name, c.description
FROM products p 
JOIN productdetails pd ON p.id = pd.id
JOIN categories c ON p.category = c.name
#lay ra san pham maf 1 user da dat
SELECT u.name, u.email ,p.name as productName, od.amount
FROM users u 
JOIN orders o ON o.user_id = u.id
JOIN orderdetails od ON o.id = od.orderID
JOIN products p ON od.product_id = p.id
#tim ra sp ma dc dat nhieu nhat
SELECT p.name, COUNT(od.amount)
FROM orders o JOIN orderdetails od 
ON o.id = od.orderID
JOIN products p On p.id = od.product_id
GROUP BY p.id
LIMIT 1;
#tim ra san pham co gia cao nhat
SELECT p.name, MAX(p.price) as maxPrice
FROM products p
#tim ra category duoc dat hang nhieu nhat
SELECT p.category, SUM(od.amount) as amountProductOrders
FROM orders o JOIN orderdetails od 
ON o.id = od.orderID
JOIN products p ON p.id = od.product_id
GROUP BY p.category
ORDER BY amountProductOrders DESC;

