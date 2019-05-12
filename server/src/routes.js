const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ProductsController = require('./controllers/ProductsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoriesController = require('./controllers/HistoriesController')
const isAutheticated = require('./policies/isAuthenticated')

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

  app.get('/bookmarks', isAutheticated, BookmarksController.index)
  app.post('/bookmarks', isAutheticated, BookmarksController.post)
  app.delete('/bookmarks/:bookmarkId', isAutheticated, BookmarksController.delete)

  app.get('/histories', isAutheticated, HistoriesController.index)
  app.post('/histories', isAutheticated, HistoriesController.post)
}
