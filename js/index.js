//  write data
function addUser(id, )
firebase.database().ref('users/1').set({
    name: "nga",
    email: "ttntrinhnga@gmail.com",
    password: "123456",
    dateModified: new Date().toLocaleString(),
    authorization: 1
});
firebase.database().ref('products/1').set({
    name: "Samsung galaxy S20 Ultra",
    price: 25700000,
    briefDescription: "Tặng kèm galaxy buds+, bảo hành 1 đổi 1 12 tháng",
    images: ["phone1.jpeg", "phone2.jpeg", "phone3.jpeg", "phone4.jpeg"],
    dateModified: new Date().toLocaleString(),
    category: "Samsung",
    quantityInstock: 20,
    productdetails_id: 1
        // screen: "Dynamic AMOLED 2X, 120Hz(1080p), HDR10+",
        // camera: "4 camera zoom 100x",
        // cpu: "Exynos 990 7nm",
        // ram: "12GB",
        // rom: "256GB",
        // pin: "4200 mah.Có sạc nhanh",
        // youtube: "https://www.youtube.com/embed/71lpO1asWcQ",
        // isdeleted: null
});
firebase.database().ref('productdetails/1').set({
    screen: "Dynamic AMOLED 2X, 120Hz(1080p), HDR10+",
    camera: "4 camera zoom 100x",
    cpu: "Exynos 990 7nm",
    ram: "12GB",
    rom: "256GB",
    pin: "4200 mah.Có sạc nhanh",
    youtube: "https://www.youtube.com/embed/71lpO1asWcQ",
    isdeleted: null
})
firebase.database().ref('orders/1').set({
    user_id: 1,
    dateModified: new Date().toLocaleString(),
    phoneNumber: "12356789",
    address: "Trung Văn- Nam Từ Liêm",
    status: false
        // get amount of products ????

});
firebase.database().ref('orderdetails/1').set({
    order_id: 1,
    product_id: 1,
    amount: 3,
    priceEach: 2000000,
})
firebase.database().ref('categories/1').set({
    name: "samsung",
    dateModified: new Date().toLocaleString(),
    description: ""
})