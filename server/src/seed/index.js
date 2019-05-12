const {sequelize, Product, User, Bookmark} = require ('../models')

// assure that Promise function are going all the way until going on
const Promise = require('bluebird')

const users = require('./user.json')
const products = require('./product.json')
const bookmarks = require('./bookmark.json')

sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )
    await Promise.all(
      products.map(product => { Product.create(product) })
    )

    await Promise.all(
      bookmarks.map(bookmark => { Bookmark.create(bookmark) })
    )
  })

