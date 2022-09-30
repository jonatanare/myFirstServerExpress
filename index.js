
// Si no esta agregado la propiedad: "type": "module" en el packge.json se utiliza require
// require()

// import __ from ''; modules
// "type": "module" // Importar module --> import from // export default
import express from 'express'

const server = express(); // creando nuestro server

// /- root path
server.get('/', (request, response) => {
    /*response.setHeader('Content-Type', 'application/json')
    const message = {
        message: 'Hola desde GET /'
    }

    const jsonString = JSON.stringify(message)
    response.write(jsonString)
    response.end()*/

    response.json({
        message: 'Hola desde GET json /'
    })

})

server.get('/hola', (request, response) => {
    response.write('GET /hola')
    response.end()
})

server.post('/', (request, response) => {
    response.write('POST /')
    response.end()
})

server.patch('/', (request, response) => {
    response.write('PATCH /')
    response.end()
})

/**
 * TODO: 
 * ? GET /koders -> Response json: { menssage: "Aquí estaran todos los koders"}
 * ? POST /koders -> Response json: { menssage: "Aquí se crearán koders"}
 * ? PATCH /koders -> Response json : {message: 'Aqui se actualizarán koders'}
 * ? DELETE /koders -> Response json : {message: 'Aqui se eliminarán koders'}
 */

server.get('/koders', (request, response) => {
    response.json({
        message: "Aqui estarán todos los koders"
    })
})

server.post('/koders', (request, response) => {
    response.json({
        message: "Aquí se crearán koders"
    })
})

server.patch('/koders', (request, response) => {
    response.json({
        message: "Aquí se actualizarán koders"
    })
})

server.delete('/koders', (request, response) => {
    response.json({
        message: "Aqui se eliminarán koders"
    })
})
// Poner a escuchar nuestro server
server.listen(8080, () => {
    console.log('Server listening on port 8080');
})