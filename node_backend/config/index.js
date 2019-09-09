const path = require('path')

module.exports = {
  port: process.env.PORT || 4000,
  db: {
    database: process.env.SQL_DATABASE || 'tapiwa',
    user: process.env.SQL_USER || 'root',
    password: process.env.SQL_PASSWORD || '',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.SQL_HOST || '127.0.0.1',
      storage: path.resolve(__dirname, '../../tapiwa.sql'),
      operatorsAliases: false,
      logging: false
    }
  },

  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  },
  development:{
    database: process.env.SQL_DATABASE || 'tapiwa',
    username: process.env.SQL_USER || 'root',
    password: process.env.SQL_PASSWORD || '',
    dialect: process.env.DIALECT || 'mysql',
    host: process.env.SQL_HOST || '127.0.0.1',
  },
  production:{
    database: process.env.SQL_DATABASE || 'tapiwa',
    username: process.env.SQL_USER || 'root',
    password: process.env.SQL_PASSWORD || '',
    dialect: process.env.DIALECT || 'mysql',
    host: process.env.SQL_HOST || '127.0.0.1',
  },
}
