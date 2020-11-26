<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</head>

<body>
    <div class="container">
        <ul class="nav mt-3">
            <li class="nav-item">
                <a class="nav-link active" href="#">Trang chủ</a>
            </li>
        </ul>
    </div>
    <div class="container"> Chọn orderid nếu muốn xem tổng số tiền trên order có id nhập vào/ Chọn userid nếu muốn lấy chi tiết đơn đặt hàng của user có id nhập vào
        <form id="form" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>"
        name ="form1"
        >
            <div class="form-row col-md-12">
                <div class="form-group col-md-2">
                    <label for="inputState">By</label>
                    <select id="inputState" class="form-control" name='select'>
                  <option selected>Choose...</option>
                  <option>orderid</option>
                  <option>userid</option>
                </select>
                </div>
                <div class="form-group col-md-2">
                    <label for="inputCity">input id</label>
                    <input type="number" class="form-control" min=0 id="inputCity" name='id'>
                </div>

                <div class="time" style="margin-left:50px; font-size:25px">Time: </div>
            </div>
            <button type="submit" class="btn btn-primary">Check</button>
        </form>
        <form id = 'getProduct' method="post"

        action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>"
        value="getProduct"
        >
         <input type="submit"  class="btn btn-success mt-5" name="form2" value = "Lấy ra sản phẩm có giá cao nhất"></input>

    </form>
        <form id = 'getUser' method="post"
        action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>"
        value="getUser"
        >
        <input type="submit"  class="btn btn-success mt-5" name = 'form3' value = "Lấy người order nhiều nhất"></input>

    </form>
    </div>
    <div class=" container mt-3 ">
        <div class="title " style="font-size: 25px; font-weight:bold; text-align: center; "></div>

    </div>
    <?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hqt";
// Create connection

$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

// Check connection
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['select'])) {

        $select = $_POST["select"];
        $id = $_POST["id"];
        if ($select != 'Choose...' && $id != '') {
            if ($select == 'userid') {
                $t1 = microtime();
                $sql = "SELECT o.orderId,od.amount, o.orderDate
                                 FROM orders o
                                 JOIN orderdetails od ON o.orderId= od.orderid
                                 WHERE o.userid = '$id';
                         ";
                $data = $conn->query($sql, PDO::FETCH_NUM);
                try {

                    $t2 = microtime();
                    $time = $t2 - $t1;
                    echo "Time: " . $time;
                } catch (Exception $e) {}
                $html = '';
                echo '
                         <table class="table">
                         <thead>
                         <tr>
                             <th scope="col ">Mã sản phẩm</th>
                             <th scope="col ">Tên sản phẩm</th>
                             <th scope="col ">Giá sản phẩm</th>
                         </tr>
                     </thead>
                     <tbody>
                         ';
                foreach ($data as $row) {
                    echo "
                            <tr>
                                 <td>$row[0]</td>
                                 <td>$row[1]</td>
                                 <td>$row[2]</td>
                             </tr>
                            ";
                }
                echo '</tbody> </table>';

            } else if ($select == 'orderid') {
                $t1 = microtime();
                $_id = 'order0' . $id;
                $sql = "SELECT od.orderId, SUM(p.price*od.amount)
                                 FROM orders o
                                 JOIN orderdetails od ON o.orderId= od.orderid
                                 JOIN product p ON od.productid= p.id
                                 WHERE o.orderId= '$_id';
                         ";
                $data = $conn->query($sql, PDO::FETCH_NUM);
                try {

                    $t2 = microtime();
                    $time = $t2 - $t1;
                    echo "Time: " . $time;
                } catch (Exception $e) {}
                $html = '';
                echo '
                         <table class="table">
                         <thead>
                         <tr>
                             <th scope="col ">Mã đơn hàng</th>
                             <th scope="col ">Tổng tiền</th>
                         </tr>
                     </thead>
                     <tbody>
                         ';
                foreach ($data as $row) {
                    echo "
                            <tr>
                                 <td>$row[0]</td>
                                 <td>$row[1]</td>
                             </tr>
                            ";
                }
                echo '</tbody> </table>';

            }
        }
    } else if (isset($_POST['form2'])) {

        if ($_POST["form2"] != '') {
            $t1 = microtime();
            $sql = "SELECT * FROM product ORDER BY price LIMIT 1
                        ";
            $data = $conn->query($sql, PDO::FETCH_NUM);
            try {

                $t2 = microtime();
                $time = $t2 - $t1;
                echo "Time: " . $time;
            } catch (Exception $e) {}
            $html = '';
            echo '
                        <table class="table">
                        <thead>
                        <tr>
                            <th scope="col ">Mã sản phẩm</th>
                            <th scope="col ">Tên sản phẩm</th>
                            <th scope="col ">Giá sản phẩm</th>
                        </tr>
                    </thead>
                    <tbody>
                        ';
            foreach ($data as $row) {
                echo "
                           <tr>
                                <td>$row[0]</td>
                                <td>$row[1]</td>
                                <td>$row[2]</td>
                            </tr>
                           ";
            }
            echo '</tbody> </table>';
        }
    } else if (isset($_POST['form3'])) {
        if ($_POST["form3"] != '') {
            $t1 = microtime();
            $sql = "SELECT u.name, u.email,COUNT(o.userid) as amount
                                 FROM user u JOIN orders o ON u.id = o.userid
                                 GROUP BY u.id
                                 ORDER BY amount DESC LIMIT 1;
                         ;
                         ";
            $data = $conn->query($sql, PDO::FETCH_NUM);
            try {

                $t2 = microtime();
                $time = $t2 - $t1;
                echo "Time: " . $time;
            } catch (Exception $e) {}
            $html = '';
            echo '
                         <table class="table">
                         <thead>
                         <tr>
                             <th scope="col ">Tên</th>
                             <th scope="col ">Email</th>
                             <th scope="col ">Số sản phẩm đã đặt</th>
                         </tr>
                     </thead>
                     <tbody>
                         ';
            foreach ($data as $row) {
                echo "
                            <tr>
                                 <td>$row[0]</td>
                                 <td>$row[1]</td>
                                 <td>$row[2]</td>
                             </tr>
                            ";
            }
            echo '</tbody> </table>';
        }
    }

}

?>
</body>

</html>