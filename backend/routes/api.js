const   router = require('express').Router(),
        Users = require('../db').Users,
        Listings = require('../db').Listings,
        Wishlist = require('../db').Wishlist,
        Messages = require('../db').Messages,
        multer  = require('multer'),
        upload = multer({dest: 'public/images'});

const app = router;

var sessionChecker = (req, res, next) => {
    // console.log(req.headers['authorization']);
    Users.findOne({ where: { token: req.headers['authorization']} }).then(function (user) {
        if (!user) {
            res.redirect('/');
        } else {
            next();
        }
    });
};

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    Users.findOne({ where: { email: email, password: password } }).then(function (user) {
        if (!user) {
            res.send('');
        } else {
            res.send({check : 'valid', id: user.id, token: user.token});
        }
    });
})

app.post('/signup', (req, res) => {
    var token = '';
    require('crypto').randomBytes(48, function(err, buffer) {
        token = buffer.toString('hex');
    });
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
                phone: req.body.phone,
                token: token
            }).then((user) => {
                res.send(JSON.stringify({status : 'success', id: user.id, token: token}));
            }).catch((error) => {
                res.send(false)
            })
        }
    });
})

app.get('/gettoken/:id', (req, res) => {
    Users.findOne({ where: { id: req.params.id} }).then(function (user) {
        if (!user) {
            res.send({check : 'invalid'});
        } else {
            res.send({check : 'valid', token: user.token});
        }
    });
});

app.post('/listings/add', sessionChecker, (req, res) => {
    if(req.body.imgUrl.length == 0){
        req.body.imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUeR3inb2aWsUD3dj1sFSRvoQZqU3VyjWuqyO6KTVW9rEz82QO';
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

app.get('/listings/:id', sessionChecker, (req, res) => {
    Listings.find({ where: { id: req.params.id} }).then(items => {
        res.send(items);
    }).then(() => {

    }).catch((error) => {
        res.send({error})
    })
});

app.get('/mylistings/:id', sessionChecker, (req, res) => {
    Listings.findAll({ where: { seller: req.params.id} }).then(items => {
        res.send(items);
    }).then(() => {

    }).catch((error) => {
        res.send({error})
    })
});


app.post('/removefromlistings', sessionChecker, (req, res) => {
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

app.get('/listings', sessionChecker, (req, res) => {
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

app.get('/wishlist/:id', sessionChecker, (req, res) => {
    // req.body.userid = 1;
    Wishlist.findAll({ where: { userid: req.params.id } }).then(items => {
        res.send(items);
    }).then(() => {

    }).catch((error) => {
        res.send({error})
    })
})

app.get('/details/:id', sessionChecker, (req, res) => {
    Users.findOne({ where: { id: req.params.id } }).then(user => {
        res.send(user);
    }).then(() => {

    }).catch((error) => {
        res.send({error})
    })
});

app.post('/addtowishlist', sessionChecker, (req, res) => {
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

app.post('/removefromwishlist', sessionChecker, (req, res) => {
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

app.get('/message/:id', sessionChecker, (req, res) => {
    console.log(req.headers['authorization']);
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

app.get('/message/sent/:id', sessionChecker, (req, res) => {
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

app.post('/message', sessionChecker, (req, res) => {
    Messages.create({
        from: req.body.from,
        to: req.body.to,
        text: req.body.text,
        recieverName : req.body.recieverName,
        recieverEmail : req.body.recieverEmail,
        senderName : req.body.senderName,
        senderEmail : req.body.senderEmail,
        productId: req.body.productId
    }).then((product) => {
        res.send({status: 'success'})
    }).catch((error) => {
        res.send({error})
    })
});

app.post('/message/delete', sessionChecker, (req, res) => {
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
        let fileName = req.files[0].filename;
        let id = req.query.id;
        let path = '/images/';
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

// app.get('/allmessages/:id', (req, res) => {
//     Messages.findAll({
//         where : Sequelize.or(
//             {to: req.params.id},
//             {from: req.params.id},
//         ),
//         attributes: ['to'],
//         distict: true
//     }).then((messages) => {
//         res.send(messages);
//     }).catch((error) => {
//         res.send({error})
//     })
// });

exports = module.exports = router;