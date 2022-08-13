const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

module.exports = class App {
  constructor(config = {}) {
    this.#setApp()
    this.#setConfig(config)
    this.#setMiddlewares(config.middlewares)
    this.#setRoutes(config.routes)
  }

  #setApp() {
    this.app = express()
  }

  #setConfig(config = {}) {
    this.app.set('port', config.port || 4000)
    this.app.set('env', config.env || 'development')
  }

  #setMiddlewares(middlewares = []) {
    this.app.use(cors())
    this.app.use(morgan(this.app.get('env') === 'development' ? 'dev' : 'combined'))

    for (const middleware of middlewares) {
      this.app.use(middleware)
    }
  }

  #setRoutes(routes = []) {
    for (const { path, router } of routes) {
      this.app.use(path, router)
    }
  }

  run(cb) {
    const port = this.app.get('port')

    this.app.listen(port, () => {
      if (cb) {
        cb(port)
      } else {
        console.log(`server running at ${port}`)
      }
    })
  }
}
