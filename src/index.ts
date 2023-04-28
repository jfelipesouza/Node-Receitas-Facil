import { app } from './services/config/server'

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`the server is online in port ${port}`)
})
