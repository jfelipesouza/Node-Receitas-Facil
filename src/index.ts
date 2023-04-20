import { app } from './services/config/server'

const port = process.env.PORT || 3001

const events = ['SIGINT', 'SIGTERM', 'SIGQUIT']

app.listen(port, () => {
  console.log(`the server is online in port ${port}`)
})
