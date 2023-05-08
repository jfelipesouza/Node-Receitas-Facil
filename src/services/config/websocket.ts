import { io } from './server'

type UserDto = {
  id: string
  password: string
  profile: {
    nickname: string
  }
}

io.on('connection', socket => {
  socket.on('set_user', (user: UserDto) => {
    socket.data.user = user
  })

  socket.on('message', message => {
    const numberOfUser = io.of('/').sockets.size
    io.emit('received_message', {
      message: {
        text: message.message,
        dateTime: new Date().toLocaleTimeString()
      },
      userId: socket.data.user.userId,
      author: socket.data.user.nickname
    })
    io.emit('numberOfUser', { numberOfUser })
  })

  socket.on('disconect', reason => console.log(reason))
  console.log(socket.id)
})
