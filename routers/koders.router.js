import express from 'express'
import fs from 'fs'

const router = express.Router() // creando un router

router.get('/', async (request, response) => {
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

router.get('/:id', async (request, response) => {
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
})

router.post('/koders', (request, response) => {

})

export default router