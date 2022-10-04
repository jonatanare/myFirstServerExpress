
// Si no esta agregado la propiedad: "type": "module" en el packge.json se utiliza require
// require()

// import __ from ''; modules
// "type": "module" // Importar module --> import from // export default
import express from 'express'
import { response } from 'express';
import fs from 'fs'

const server = express(); // creando nuestro server

// middleware - convertir lo que llega en body a un json
server.use(express.json())

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

// server.get('/koders', (request, response) => {
//     response.json({
//         message: "Aqui estarán todos los koders"
//     })
// })

// server.post('/koders', (request, response) => {
//     response.json({
//         message: "Aquí se crearán koders"
//     })
// })

server.patch('/koders', (request, response) => {
    response.json({
        message: "Aquí se actualizarán koders"
    })
})

// server.delete('/koders', (request, response) => {
//     response.json({
//         message: "Aqui se eliminarán koders"
//     })
// })

// GET /koders
/*server.get('/koders', async (request, response) => {
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
    const json = JSON.parse(dataFile);
    const koders = json.koders;

    response.json({
        success: true,
        data : {
            koders
        }
    })
})*/

/*server.post('/koders', async (request, response) => {

    const newKoder = request.body;

    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
    const json = JSON.parse(dataFile)

    json.koders.push(newKoder)

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null,2), 'utf8');


    response.json({
        success: true,
        message: "El Koder fue creado!"
    })
})*/

/*server.get('/koders/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8')
    const json = JSON.parse(dataFile)

    const koderFound = json.koders.find(koder => koder.id === id)

    if(!koderFound) {
        response.status(404)
        response.json({
            success: false,
            messages: "Koder no encontrado"
        })
        return
    }

    response.json({
        success: true,
        data: {
            koder: koderFound
        }
    })
})*/

/**
 * TODO: DELETE /koders -> Response json : {message: 'Aqui se eliminarán koders'}
 */
server.delete('/koders/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8')
    const json = JSON.parse(dataFile);

    const koderDeleted = json.koders.filter(koder => koder.id !== id);
    json.koders = koderDeleted

    console.log(json);

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf8')

    response.json({
        success: true,
        message: 'Koder eliminado'
    })
})

server.patch('/koders/:id', async (request, response) => {
    /*
    0. 
    */
    const id = parseInt(request.params.id)
    const { name, gender } = request.body
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8')
    const json = JSON.parse(dataFile);

    const koderFind = json.koders.find(koder => koder.id === id);
    name = 'Jonatan Arévalo Hernandez'
    gender = 'M'
    response.json({
        data: {
            koder : request.body
        }
    })
})

server.get('/koders', async (request, response) => {
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
    const json = JSON.parse(dataFile);

    // accedo a los query params directamente en el request
    const queries = request.query
    console.log('queries: ', queries);
    const { generation, gender } = request.query
    let kodersFiltered = json.koders

    if(generation) {
        kodersFiltered = kodersFiltered.filter(koder => koder.generation === parseInt(generation))
    }

    if(gender){
        kodersFiltered = kodersFiltered.filter(koder => koder.gender === gender)
    }

    response.json({
        success: true,
        data: {
            koders: kodersFiltered || json.koders
        }
    })
})



// Poner a escuchar nuestro server
server.listen(8080, () => {
    console.log('Server listening on port 8080');
    
})

/*
Ejercicio 1:

    - GET /koders -> Response json : {message: 'Aqui estarán todos los koders'}
    - POST /koders -> Response json : {message: 'Aqui se crearán koders'}
    - PATCH /koders -> Response json : {message: 'Aqui se actualizarán koders'}
    - DELETE /koders -> Response json : {message: 'Aqui se eliminarán koders'}

    Endpoint -> punto final de información
    Conjunto de un Método y UNA RUTA

    GET  /koders
    POST /koders
    GET  /koders/:id

    GET  /mentors

    Práctica:
    DELETE /koders/:id - request.params
    PATCH  /koders/:id - request.params | newData: request.body

*/