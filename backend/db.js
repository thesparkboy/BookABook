const Sequelize = require('sequelize')

const db = new Sequelize('bookabook', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
    }
})

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING
    },
    college: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    }
})

const Listings = db.define('listings', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    seller: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bookName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    authorName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    condition: {
        type: Sequelize.ENUM,
        values: ['New','Almost New','Slightly Damaged','Worn'],
        allowNull: false
    },
    imgUrl: {
        type: Sequelize.STRING,
        defaultValue: 'http://www.purse-hanger.com/wp-content/uploads/2018/01/cartoon-picture-of-book-pink-book-reading-clip-art-at-clker-vector-clip-art-online-coloring-pages-for-kids.png'
    },
    imgPath: {
        type: Sequelize.STRING
    }
})

const Wishlist = db.define('wishlist', {
    userid: {
        type: Sequelize.INTEGER
    },
    bookid: {
        type: Sequelize.INTEGER
    }

})

const Messages = db.define('message', {
    from: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    recieverName: {
        type: Sequelize.STRING
    },
    recieverEmail: {
        type: Sequelize.STRING
    },
    to: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    senderName: {
        type: Sequelize.STRING
    },
    senderEmail: {
        type: Sequelize.STRING
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

db.sync()
    .then(() => console.log('Database synchronized successfully'))
    .catch((err) => console.error("Error creating database"))

exports = module.exports = {
    Users, Listings, Wishlist, Messages
}