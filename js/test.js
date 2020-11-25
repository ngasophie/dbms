/**
 * order:
 *  orderDate
 *  orderid,
 *  userid
 */
/**
    orderdetails
    amount
    orderid
    productid
 */
/**
 * product
 * _id
 * name
 * author
 * price
 * 
 */
/**
    user
    id
    name
    email
    phone

 */
//  get total price of order
// let getTotalMoneyOrderId = (id) => {

//     // firebase.database().ref('orderdetails/')
//     //     // .once('value').then((snapshot) => {
//     //     //     console.log(snapshot.val())
//     //     // })
//     //     // }
//     //     .orderByChild('orderid').equalTo(id).on("child_added", function(snapshot) {
//     //         console.log(snapshot.val().productid)
//     //         let product_id = snapshot.val().productid;
//     firebase.database().ref('product/')
//         .orderByChild('id').equalTo('ksdfskfh222').on("child_added", function(snapshot) {
//             console.log(snapshot.val());
//         });
//     // });
// }
// getTotalMoneyOrderId(0);
// get orderdetail where userid = 1
// order join orderdetails on userd =id
function getOrderDetailByUserId(id) {
    firebase.database().ref('/order')
        .orderByChild('userid')
        .equalTo(id)
        .on("child_added", function(snapshot) {
            let orderid = snapshot.val().orderid
            console.log(orderid)
            firebase.database().ref('/orderdetails')
                .orderByChild('orderid')
                .equalTo(orderid)
                .on("child_added", function(snapshot) {
                    console.log(snapshot.val())
                })
        })
}
// total mony by order id
//  orderdetails join product on orderid  = id
function getTotalMoneyByOrderId(id) {
    let totalMoney = 0;
    firebase.database().ref('/orderdetails')
        .orderByChild('orderid')
        .equalTo(id)
        .on("child_added", function(snapshot) {
            let product_id = snapshot.val().productid
            let amount = snapshot.val().amount;
            console.log(orderid)
            firebase.database().ref('/product')
                .orderByChild('id')
                .equalTo(product_id)
                .on("child_added", function(snapshot) {
                    let price = snapshot.val().price;
                    totalMoney += amount * price;
                })
        })
}

function getUserOrderMaxAmount() {
    firebase.database().ref('/user')
        .once('value').then((snapshot) => {
            console.log(snapshot.val())
        })
}
//  get product order max
function getProductOrderMaxAmount() {

}
// get product max count
getUserOrderMaxAmount();