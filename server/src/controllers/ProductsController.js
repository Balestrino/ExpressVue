// import User model, so can use in our callbacks
const {Product} = require('../models')
const { Op } = require('sequelize');

module.exports = {
  async index (req, res) {
    try {
      let products = null
      const search = req.query.search

      if (search) {
        products = await Product.findAll({
          where: {
            [Op.or]: [
              'title', 'author'
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
      } else {
        products = await Product.findAll({
          limit:10
        })
      }

      res.send(products)
    } catch (err) {
      res.status(500).send({
        error: 'Invalid information.'
      })
    }
  },
  async show (req, res) {
    try {
      const product = await Product.findByPk(req.params.productId)
      res.send(product)
    } catch (err) {
      res.status(500).send({
        error: 'Invalid information.'
      })
    }
  },
  async post (req, res) {
    try {
      const product = await Product.create(req.body)
      res.send(product)
    } catch (err) {
      res.status(500).send({
        error: 'Invalid information.'
      })
    }
  },
  async put (req, res) {
    try {
      const product = await Product.update(req.body, {
        where: {
          id: req.params.productId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'Invalid information.'
      })
    }
  }
}
