const requireAll = context => context.keys().map(context)
const components = require.context('./', true, /[^.]\/index.js$/)

export default function register(controlkey) {
  const component = requireAll(components).filter(item => {
    return item.default.name === controlkey
  })
  return component[0].default.install()
}
