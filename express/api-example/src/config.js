const testConfig = {
  db: {
    host: 'localhost', user: 'root', database: 'test'
  },
  app: {
    port: 3000
  },
  token: {
    secret: 's3cr3t'
  }
}

const devConfig = {
  db: {
    host: 'localhost', user: 'root', database: 'devel'
  },
  app: {
    port: 3000
  },
  token: {
    secret: 's3cr3t'
  }
}

const productionConfig = {
  db: { /* ...  */ },
  server: { /* ... */ },
  token: { /* ... */ }
}

const selectConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'production':  productionConfig;
    case 'test': return testConfig;
    default: return devConfig;
  }  
}

module.exports = selectConfig()
