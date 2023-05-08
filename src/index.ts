import { server } from './services/config/server'
import './services/config/websocket'

const port = process.env.PORT || 3001

server.listen(port, () => {
  console.log(`the server is online in port ${port}`)
})
