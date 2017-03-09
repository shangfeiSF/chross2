var path = require('path')

module.exports = {
  remote: {
    path: '/remote',
    dir: path.join(__dirname, '../../', '_bundle.remote_')
  },

  site: {
    path: '/webSite',
    dir: path.join(__dirname, '../', 'webSite')
  },
  tasks: {
    path: '/tasks',
    dir: path.join(__dirname, '../', 'tasks')
  },
  noFound: {
    path: '/noFound.js'
  },

  getTabStore: {
    path: '/getTabStore',
    dir: path.join(__dirname, '../', 'tabStore')
  },
  recordTabStore: {
    path: '/recordTabStore',
    dir: path.join(__dirname, '../', 'tabStore')
  },
  getNewestTabStore: {
    path: '/tabstore/newest.json',
  },

  testAssets: {
    path: 'test/assets',
    dir: path.join(__dirname, '../../', 'test/assets')
  },
  testRemote: {
    path: 'test/remote',
    dir: path.join(__dirname, '../../', 'test/remote')
  },
}