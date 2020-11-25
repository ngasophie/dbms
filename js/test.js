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

async function getUserOrderMaxAmount() {
    let user = null;
    let amount = 0;
    let isFirstRun = true;
    firebase.database().ref('/user')
        .once('value').then((snapshot) => {
            // if (isFirstRun) {
            //     isFirstRun = false;
            //     return;
            // }
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
                                document.getElementsByClassName('container')[0].innerHTML = user.name
                            }
                            console.log(snapshot.val())
                        })
                } catch (e) {}
            }
        })
}
//  get product order max
function getProductOrderMaxAmount() {
    firebase.database().ref('/orderdetails/')
        .once('value').then((snapshot) => {
            let arr = snapshot.val();
            for (let i = 0; i < arr.length; i++) {
                let count = 0;
                for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i] == arr[j]) {
                        count++;
                        arr.splice(j, 1);
                    }

                }
            }

        })

}

// get product max count
// getUserOrderMaxAmount();
// getProductOrderMaxAmount();
let arr = [1, 1, 1, 1, 1, 4, 4, 4]
let max = 0;
let value = null;
for (let i = 0; i < arr.length; i++) {
    let count = 1;
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
            count++;
            arr.splice(j, 1);
            if (count > max) {
                max = count;
                value = arr[i];
            }
            console.log(arr)

        }

    }

}
console.log(max)
console.log(value)