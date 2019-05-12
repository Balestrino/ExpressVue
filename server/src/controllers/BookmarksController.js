// import User model, so can use in our callbacks
const {Bookmark, Product} = require('../models')
const { Op } = require('sequelize');
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id  // taking id from the JWT, proven to be valid!
      const {productId} = req.query

      const where = { UserId: userId }
      if (productId) {
        where.ProductId = productId
      }

      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [
          {
            model: Product
          }
        ]
      })
      .map(bookmark => bookmark.toJSON())
      .map(bookmark => _.extend(
        {},
        bookmark.Product,
        bookmark
      ))

      res.send(bookmarks)
    } catch (err) {
      res.status(500).send({
        error: 'Bookmark Invalid information.'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const {productId} = req.body

      const bookmark = await Bookmark.findOne({
        where: {
          ProductId: productId,
          UserId: userId
        }
      })
      if (bookmark) {
        return res.status(400).send({
          error: 'you already have a bookmark on this!'
        })
      }

      const newBookmark = await Bookmark.create({
        ProductId: productId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (err) {
      res.status(500).send({
        error: 'Bookmark Invalid information.'
      })
    }
  },
  async delete (req, res) {
    const userId = req.user.id
    console.log('req.params' , req.params)
    const {bookmarkId} = req.params
    console.log('bookmarkId', bookmarkId)

    try {
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: userId
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'You dont have access to this bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'Cannot find Bookmark id.'
      })
    }
  }
}
