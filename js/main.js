var app = new Vue({
    el: "article",
    data: {
        products: [
            { 
                id: 1, 
                title: "Slicer Cucumber TAG 1000 (TAG 950)", 
                short_text: 'Slicer Cucumber', 
                image: 'img/cucumber1.png',
                char: "<b>Resistance</b> <br>HR: Downy mildew, Anthracnose <br> IR: Whitefly, Thrips",
                plant: "<li><span>Long and slender, suitable for slicing.</span></li><li><span>High yields throughout the season.</span></li><li><span>Early-maturing variety.</span></li>",
                fruit: "<li><span>Deep green color with firm texture.</span></li><li><span>Typically grows up to 25-30 cm.</span></li><li><span>Great for salads and sandwiches.</span></li>",
                cycle: "<li><span>Spring</span></li><li><span>Summer</span></li>",
                color: "Deep Green"
            },
            {
                id: 2, 
                title: "Pickling Cucumber TAG 1000 (TAG 753)", 
                short_text: 'Pickling Cucumber', 
                image: 'img/cucumber2.png', 
                char: "<b>Resistance</b> <br>HR: Powdery mildew, Fusarium wilt <br> IR: Aphids, Leaf spot",
                plant: "<li><span>Compact growth with high productivity.</span></li><li><span>Ideal for small gardens and containers.</span></li><li><span>Mid-season variety.</span></li>",
                fruit: "<li><span>Perfect for pickling.</span></li><li><span>Produces smaller cucumbers, typically 10-15 cm in length.</span></li><li><span>Firm texture with a crispy bite.</span></li>",
                cycle: "<li><span>Spring</span></li><li><span>Summer</span></li>",
                color: "Green"
            },
            {
                id: 3, 
                title: "Burpless Cucumber TAG 1000 (TAG 878)", 
                short_text: 'Burpless Cucumber', 
                image: 'img/cucumber3.png', 
                char: "<b>Resistance</b> <br>HR: Downy mildew, Anthracnose <br> IR: Spider mites, Leaf spot",
                plant: "<li><span>Vigorous growth with high yields.</span></li><li><span>Perfect for slicing and salads.</span></li><li><span>Mid to late-season variety.</span></li>",
                fruit: "<li><span>Long and slender, typically 25-35 cm in length.</span></li><li><span>Less bitter and easier to digest.</span></li><li><span>Ideal for fresh consumption.</span></li>",
                cycle: "<li><span>Spring</span></li><li><span>Summer</span></li>",
                color: "Green"
            },
            {
                id: 4, 
                title: "Mini Cucumber TAG 1000 (TAG 933)", 
                short_text: 'Mini Cucumber', 
                image: 'img/cucumber4.png', 
                char: "<b>Resistance</b> <br>HR: Powdery mildew, Fusarium wilt <br> IR: Whitefly, Thrips",
                plant: "<li><span>Compact growth, ideal for small gardens and containers.</span></li><li><span>High productivity with small-sized cucumbers.</span></li><li><span>Mid-season variety.</span></li>",
                fruit: "<li><span>Typically 10-15 cm in length.</span></li><li><span>Crunchy texture, perfect for snacks.</span></li><li><span>Great for salads and pickling.</span></li>",
                cycle: "<li><span>Spring</span></li><li><span>Summer</span></li>",
                color: "Bright Green"
            },
            {
                id: 5, 
                title: "Seedless Cucumber TAG 1000 (TAG 912)", 
                short_text: 'Seedless Cucumber', 
                image: 'img/cucumber5.png', 
                char: "<b>Resistance</b> <br>HR: Downy mildew, Fusarium wilt <br> IR: Spider mites, Thrips",
                plant: "<li><span>Vigorous growth with long, slender cucumbers.</span></li><li><span>Ideal for fresh consumption.</span></li><li><span>Late-season variety.</span></li>",
                fruit: "<li><span>Long cucumbers with no seeds.</span></li><li><span>Typically 25-30 cm in length.</span></li><li><span>Great for slicing and salads.</span></li>",
                cycle: "<li><span>Spring</span></li><li><span>Summer</span></li>",
                color: "Deep Green"
            }
        ],
        product: {},
        btnVisible: 0,
        cart: {},
        contactFields: {
            name: '',
            companyName: '',
            position: '',
            city: '',
            country: '',
            telephone: '',
            email: '',
            userType: 'seed producer',
            otherType: '',
            interest: ''
        },
        orderInfo: {
            name: '',
            companyName: '',
            position: '',
            city: '',
            country: '',
            telephone: '',
            email: '',
            userType: 'seed producer',
            otherType: '',
            interest: ''
        },
        showOrderInfo: false,
        showTableHeaders: true
    },
    mounted: function() {
        this.getProduct();
        this.getCart();
        this.checkInCart();
    },
    methods: {
        addItem: function(id) {
            window.localStorage.setItem('prod', id);
        },
        getProduct: function() {
            console.log(this.product);
            if (window.location.hash) {
                var id = window.location.hash.replace('#', '');
                if (this.products && this.products.length > 0) {
                    for (i in this.products) {
                        if (this.products[i] && this.products[i].id && id == this.products[i].id) {
                            this.product = this.products[i];
                        }
                    }
                }
            }
        },
        addToCart: function(id) {
            var cart = [];
            if (window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }

            if (cart.indexOf(String(id)) == -1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join());
                this.btnVisible = 1;
            }
        },
        checkInCart: function() {
            if (this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) != -1) {
                this.btnVisible = 1;
            }
        },
        getCart: function() {
            var cartItems = localStorage.getItem('cart');
            if (cartItems) {
                var cartIds = cartItems.split(',');
                this.cart = this.products.filter(product => cartIds.includes(String(product.id)));
            }
        },
        removeFromCart: function(id) {
            this.cart = this.cart.filter(item => item.id !== id);
            var cartItems = localStorage.getItem('cart');
            if (cartItems) {
                var cartIds = cartItems.split(',').filter(itemId => itemId !== String(id));
                localStorage.setItem('cart', cartIds.join());
            }
        },
        makeOrder: function() {
            this.orderInfo = { ...this.contactFields };
            this.cart = [];
            localStorage.removeItem('cart');
            
            this.contactFields = {
                name: '',
                companyName: '',
                position: '',
                city: '',
                country: '',
                telephone: '',
                email: '',
                userType: 'seed producer',
                otherType: '',
                interest: ''
            };

            this.showOrderInfo = true;
            this.showTableHeaders = false;
        }
    }
});
