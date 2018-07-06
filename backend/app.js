const express = require('express'),
      app = express(),
      path = require('path'),
      Users = require('./db').Users,
      Listings = require('./db').Listings,
      Wishlist = require('./db').Wishlist,
      Messages = require('./db').Messages,
      bodyParser = require('body-parser'),
      multer  = require('multer'),
      upload = multer({dest: 'public/'});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

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
    Users.findOne({ where: { email: req.body.email} }).then(function (user) {
        if (user) {
            res.send(JSON.stringify({status : 'email', id: user.id}));
        } else {
            Users.create({
                id: req.body.id,
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                college: req.body.college,
                address: req.body.address,
                phone: req.body.phone
            }).then((user) => {
                res.send(JSON.stringify({status : 'success', id: user.id}));
            }).catch((error) => {
                res.send(false)
            })
        }
    });
})
//
// app.get('/users/:id', (req, res) => {
//     Users.findOne({ where: { id: req.params.id} }).then(user => {
//         res.send(user);
//     }).then(() => {
//
//     }).catch((error) => {
//         res.send({error})
//     })
// });


app.post('/listings/add', (req, res) => {
    if(req.body.imgUrl.length == 0){
        req.body.imgUrl = 'http://www.purse-hanger.com/wp-content/uploads/2018/01/cartoon-picture-of-book-pink-book-reading-clip-art-at-clker-vector-clip-art-online-coloring-pages-for-kids.png'
    }
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
        res.send(product);
    }).catch((error) => {
        res.send({error})
    })
});

app.get('/listings/:id', (req, res) => {
    Listings.find({ where: { id: req.params.id} }).then(items => {
        res.send(items);
    }).then(() => {

    }).catch((error) => {
        res.send({error})
    })
});

app.get('/mylistings/:id', (req, res) => {
    Listings.findAll({ where: { seller: req.params.id} }).then(items => {
        res.send(items);
    }).then(() => {

    }).catch((error) => {
        res.send({error})
    })
});


app.post('/removefromlistings', (req, res) => {
    Listings.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.send({status:'success'})
    }).catch((error) => {
        res.send({error})
    })
});

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
});


app.get('/wishlist/:id', (req, res) => {
    // req.body.userid = 1;
    Wishlist.findAll({ where: { userid: req.params.id } }).then(items => {
        res.send(items);
    }).then(() => {

    }).catch((error) => {
        res.send({error})
    })
})


app.get('/details/:id', (req, res) => {
    Users.findOne({ where: { id: req.params.id } }).then(user => {
        res.send(user);
    }).then(() => {

    }).catch((error) => {
        res.send({error})
    })
});

app.post('/addtowishlist', (req, res) => {
    Wishlist.findOrCreate({
        where: {
            userid: req.body.userid,
            bookid: req.body.bookid
        },
        userid: req.body.userid,
        bookid: req.body.bookid
    }).then((product) => {
        res.send({status:'success'})
    }).catch((error) => {
        res.send({error})
    })
});

app.post('/removefromwishlist', (req, res) => {
    Wishlist.destroy({
        where: {
            userid: req.body.userid,
            bookid: req.body.bookid
        }
    }).then(() => {
        res.send({status:'success'})
    }).catch((error) => {
        res.send({error})
    })
});

app.get('/message/:id', (req, res) => {
    Messages.findAll({
        where : {
            to: req.params.id
        }
    }).then((messages) => {
        res.send(messages);
    }).catch((error) => {
        res.send({error})
    })
});

app.get('/message/sent/:id', (req, res) => {
    Messages.findAll({
        where : {
            from: req.params.id
        }
    }).then((messages) => {
        res.send(messages);
    }).catch((error) => {
        res.send({error})
    })
});

app.post('/message', (req, res) => {
    Messages.create({
        from: req.body.from,
        to: req.body.to,
        text: req.body.text,
        recieverName : req.body.recieverName,
        recieverEmail : req.body.recieverEmail,
        senderName : req.body.senderName,
        senderEmail : req.body.senderEmail
    }).then((product) => {
        res.send({status: 'success'})
    }).catch((error) => {
        res.send({error})
    })
});

app.post('/message/delete', (req, res) => {
    Messages.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.send({status:'success'})
    }).catch((error) => {
        res.send({error})
    })
});


app.post('/upload', upload.any() ,(req, res) => {
    if(req.files[0] != undefined) {
        console.log(req.files[0]);
        let fileName = req.files[0].filename;
        let id = req.query.id;
        let path = 'http://localhost:2000/public/';
        Listings.find({ where: { id: id} }).then(item => {
            if(item) {
                item.imgUrl = path + fileName;
                item.save();
            }
        }).then(() => {
        }).catch((error) => {
            res.send({error})
        })
    }
    res.send('');
});

app.listen(2000, function () {
    console.log('Server started on http://localhost:2000/')
});
