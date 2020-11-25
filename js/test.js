window.onload = function() {

    let form = document.getElementById('form');
    form.onsubmit = function(e) {
        e.preventDefault();
        let select = form.select.value;
        let id = form.id.value;
        console.log(select, id)
        if (select == "orderid") {
            getTotalMoneyByOrderId(Number(id))
        } else if (select == "userid") {
            console.log(1)
            getOrderDetailByUserId(Number(id))
        }
    }
    document.getElementById('getProduct').addEventListener('click', function() {
        console.log(1)

        getProductMaxPrice();
    })
    document.getElementById('getUser').addEventListener('click', function() {
                        console.log(1)

        getUserOrderMaxAmount()
    })
}

function getOrderDetailByUserId(id) {
    var t0 = performance.now()
    let content = ``;
    firebase.database().ref('/order')
        .orderByChild('userid')
        .equalTo(id)
        .on("child_added", function(snapshot) {
            let orderid = snapshot.val().orderid;
            let orderDate = snapshot.val().orderDate;
            console.log(orderid)
            firebase.database().ref('/orderdetails')
                .orderByChild('orderid')
                .equalTo(orderid)
                .on("child_added", function(snapshot) {
                    console.log(snapshot.val())
                    content += `
                    <tr>
                        <td>${snapshot.val().productid}</td>
                        <td>${snapshot.val().amount}</td>
                        <td>${orderDate}</td>
                    </tr>
                    `
                    let html = `
                    <thead>
                    <tr>
                        <th scope="col ">Mã sản phẩm</th>
                        <th scope="col ">Số lượng</th>
                        <th scope="col ">Ngày đặt hàng</th>
                    </tr>
                </thead>
                <tbody>
                    ${content}
                </tbody>
                    `;
                    document.getElementsByClassName('table')[0].innerHTML = html;
                    var t1 = performance.now()
                    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
                    document.getElementsByClassName('time')[0].innerHTML = `Time: ${(t1 - t0)} milliseconds.`
                })
        })

}
// total mony by order id
//  orderdetails join product on orderid  = id
function getTotalMoneyByOrderId(id) {
    let content = ``;

    var t0 = performance.now()
    let totalMoney = 0;
    firebase.database().ref('/orderdetails')
        .orderByChild('orderid')
        .equalTo(id)
        .on("child_added", function(snapshot) {
            let orderid = snapshot.val().orderid;
            let product_id = snapshot.val().productid
            let amount = snapshot.val().amount;
            console.log(orderid)
            firebase.database().ref('/product')
                .orderByChild('id')
                .equalTo(product_id)
                .on("child_added", function(snapshot) {
                    let price = snapshot.val().price;
                    totalMoney += amount * price;
                    content += `
                    <tr>
                        <td>${orderid}</td>
                        <td>${totalMoney}</td>
                    </tr>
                    `;
                    let html = `
                    <thead>
                    <tr>
                        <th scope="col ">Mã đơn hàng</th>
                        <th scope="col ">Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    ${content}
                </tbody>
                    `;
                    document.getElementsByClassName('table')[0].innerHTML = html;
                    var t1 = performance.now()
                    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
                    document.getElementsByClassName('time')[0].innerHTML = `Time: ${(t1 - t0)} milliseconds.`
                })
        })
}

function getUserOrderMaxAmount() {
    let user = null;
    let amount = 0;
    var t0 = performance.now()
    let content = ``;
    firebase.database().ref('/user')
        .once('value').then((snapshot) => {
            console.log(snapshot.val())
            for (let v of Object.values(snapshot.val())) {
                let tmp = 0;
                console.log(v.id)
                try {

                    firebase.database().ref('/order/')
                        .orderByChild('userid')
                        .equalTo(v.id)
                        .on("child_added", function(snapshot) {
                            tmp++;
                            if (tmp > amount) {
                                amount = tmp
                                user = v;
                                document.getElementsByClassName('container')[0].innerHTML = user.name;
                                content += `
                                <tr>
                                    <td>${v.name}</td>
                                    <td>${v.email}</td>
                                    <td>${amount}</td>
                                </tr>
                                `;
                                let html = `
                                <thead>
                                <tr>
                                    <th scope="col ">Tên người đặt</th>
                                    <th scope="col ">email</th>
                                    <th scope="col ">Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${content}
                            </tbody>
                                `;
                                document.getElementsByClassName('table')[0].innerHTML = html;
                                var t1 = performance.now()
                                console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
                                document.getElementsByClassName('time')[0].innerHTML = `Time: ${(t1 - t0)} milliseconds.`
                            }
                            console.log(snapshot.val())
                        })
                } catch (e) {}
            }
        })
}
// get product max price
function getProductMaxPrice() {
    let content = ``;
    let ref = firebase.database().ref("/product");
    ref.orderByChild("price").on("child_added", function(snapshot) {
        content += `
        <tr>
            <td>${snapshot.id}</td>
            <td>${snapshot.name}</td>
            <td>${snapshot.price}</td>
        </tr>
        `;
        let html = `
        <thead>
        <tr>
            <th scope="col ">Mã sản phẩm</th>
            <th scope="col ">Tên sản phẩm</th>
            <th scope="col ">Giá sản phẩm</th>
        </tr>
    </thead>
    <tbody>
        ${content}
    </tbody>
        `;
        document.getElementsByClassName('table')[0].innerHTML = html;
        var t1 = performance.now()
        console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
        document.getElementsByClassName('time')[0].innerHTML = `Time: ${(t1 - t0)} milliseconds.`
    });
}