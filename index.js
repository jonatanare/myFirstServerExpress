import express from 'express'
import kodersRouter from './routers/koders.router.js'
import mentorRouter from './routers/mentors.router.js'

const server = express(); // creando nuestro server

// middleware - convertir lo que llega en body a un json
server.use(express.json())

server.use('/koders', kodersRouter)

server.use('/mentors', mentorRouter)


// Poner a escuchar nuestro server
server.listen(8080, () => {
    console.log('Server listening on port 8080');
    
})