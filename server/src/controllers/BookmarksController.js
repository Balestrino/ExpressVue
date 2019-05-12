// import User model, so can use in our callbacks
const {Bookmark} = require('../models')
const { Op } = require('sequelize');

module.exports = {
  async index (req, res) {
    try {
      let products = null
      const {productId, userId} = req.query

      const bookmark = await Bookmark.findOne({
        where: {
          ProductId: productId,
          UserId: userId
        }
      })
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'Bookmark Invalid information.'
      })
    }
  },
  async post (req, res) {
    try {
      let products = null
      const {productId, userId} = req.body

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
    console.log('req.params' , req.params)
    const {bookmarkId} = req.params
    console.log('bookmarkId', bookmarkId)

    try {
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId
        }
      })
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'Cannot find Bookmark id.'
      })
    }
  }
}
