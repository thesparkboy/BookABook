const express = require('express'),
      app = express(),
      Users = require('./db').Users
      Listings = require('./db').Listings
      Wishlist = require('./db').Wishlist

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.get('/', function (req, res) {
    res.send('index.html')
})

app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    Users.findOne({ where: { email: email, password: password } }).then(function (user) {
        if (!user) {
            res.send('');
        } else {
            res.send({check : 'valid', id: user.id});
        }
    });
})

app.post('/signup', (req, res) => {
    Users.create({
        id: req.body.id,
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        college: req.body.college,
        address: req.body.address,
        phone: req.body.phone
    }).then((product) => {
        res.send(true);
    }).catch((error) => {
        res.send(false)
    })
})


app.post('/upload', (req, res) => {
    console.log(req.files);
})

app.post('/listings/add', (req, res) => {
    // console.log(req.body);
    Listings.create({
        id: req.body.id,
        seller: req.body.seller,
        bookName: req.body.bookName,
        authorName: req.body.authorName,
        price: req.body.price,
        condition: req.body.condition,
        imgUrl: req.body.imgUrl,
        imgPath: req.body.imgPath
    }).then((product) => {

    }).catch((error) => {
        res.send({error})
    })
})

app.get('/listings/:id', (req, res) => {
    // console.log(req.params.id);
    Listings.find({ where: { id: req.params.id} }).then(items => {
        res.send(items);
    }).then(() => {

    }).catch((error) => {
        res.send({error})
    })
})


app.get('/listings', (req, res) => {
    Listings.findAll()
        .then((items) => {
            res.send(items)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Books could not be fetched."
            })
        })
})


app.get('/wishlist/:id', (req, res) => {
    // req.body.userid = 1;
    Wishlist.findAll({ where: { userid: req.params.id } }).then(items => {
        res.send(items);
    }).then(() => {

    }).catch((error) => {
        res.send({error})
    })
})

app.post('/addtowishlist', (req, res) => {
    // console.log(req.body);
    Wishlist.create({
        userid: req.body.userid,
        bookid: req.body.bookid
    }).then((product) => {
        res.send({status:'success'})
    }).catch((error) => {
        res.send({error})
    })
})

app.listen(2000, function () {
    console.log('Server started on http://localhost:2000/')
})
