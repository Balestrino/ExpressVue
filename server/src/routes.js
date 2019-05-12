const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ProductsController = require('./controllers/ProductsController')
const BookmarksController = require('./controllers/BookmarksController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register, 
    AuthenticationController.register)
  
  app.post('/login', AuthenticationController.login)
    
  app.get('/status', (req, res) => {
    res.send({
        message: 'hello world'
    })
  })

  app.post('/products', ProductsController.post)
  app.get('/products/:productId', ProductsController.show)
  app.get('/products', ProductsController.index)
  app.put('/products/:productId', ProductsController.put)

  app.get('/bookmarks', BookmarksController.index)
  app.post('/bookmarks', BookmarksController.post)
  app.delete('/bookmarks/:bookmarkId', BookmarksController.delete)
}
