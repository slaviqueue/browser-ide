import execute from './base'

export default code =>
  execute('nodejs', `node -e '${ code }'`)
