import Common from '../../../lib/Common'

export const config = {
  path: 'template/test',
  name: '模板'
}

export default (store) => ({
  path: config.path,
  onEnter: (props, replace) => {
    Common.pageEnter(config, store, props, replace)
  },
  onLeave: (props, replace) => {
    Common.pageLeave(config, store, props, replace)
  },
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const base = require('../../../store/data/base')
      const page = require('./components').default
      Common.pageView(store, cb, page, [base])
    })
  }
})
