// import User model, so can use in our callbacks
const {History, Product} = require('../models')
const { Op } = require('sequelize');
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id

      const histories = await History.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Product
          }
        ]
      })
      .map(history => history.toJSON())
      .map(history => _.extend(
        {},
        history.Product,
        history
      ))

      res.send(_.uniqBy(histories, history => history.ProductId))
    } catch (err) {
      res.status(500).send({
        error: 'History Invalid information.'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const {productId} = req.body

      const history = await History.create({
        ProductId: productId,
        UserId: userId
      })
      res.send(history)
    } catch (err) {
      res.status(500).send({
        error: 'History Invalid information.'
      })
    }
  }
}
