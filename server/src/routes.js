const AuthenticationController = require('./controllers/AuthenticationController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register, 
    AuthenticationController.register)
    
  app.get('/status', (req, res) => {
    res.send({
        message: 'hello world'
    })
  })
}
