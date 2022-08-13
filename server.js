const App = require('./app.js')

const config = {
  port: process.env.PORT || 4000,
  env: process.env.NODE_ENV || 'development',
}

const helloRoute = {
  path: '/',
  router: (req, res) => res.json('hello world')
}

const middlewares = []

const app = new App({
  port: config.port,
  env: config.env,
  routes: [helloRoute],
  middlewares
})

app.run()
