import express from 'express'
import fs from 'fs'

const router = express.Router() // creando un router

router.get('/', async (request, response) => {
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
    const json = JSON.parse(dataFile);
    // accedo a los query params directamente en el request
    const queries = request.query
    console.log('queries: ', queries);
    const { generation, gender, count } = request.query
    let kodersFiltered = json.koders
    if(generation) {
        kodersFiltered = kodersFiltered.filter(koder => koder.generation === parseInt(generation))
    }
    if(gender){
        kodersFiltered = kodersFiltered.filter(koder => koder.gender === gender)
    }
    if(count) {
        kodersFiltered = kodersFiltered.slice(0, count)
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

router.post('/', async (request, response) => {
    const newKoder = request.body;
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
    const json = JSON.parse(dataFile);
    json.koders.push(newKoder);
    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf8');
    response.json({
        success: true,
        message: 'Koder creado!'
    })
})

router.patch('/:idKoder', async (request, response) => {
    const { idKoder } = request.params
    const koderUpdated = request.body;
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
    const json = JSON.parse(dataFile);
    const koders = json.koders;
    const koderFind = koders.findIndex(koder => koder.id === koderUpdated.id)
    koders.splice(koderFind, 1, koderUpdated);
    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf8');

    response.json({
        success: true,
        message: 'Koder actualizado!',
        data: {
            koder: koderUpdated
        }
    })

})

router.delete('/:idKoder', async (request, response) => {
    const { idKoder } = request.params;
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
    const json = JSON.parse(dataFile);
    const koders = json.koders;
    const newKoders = koders.filter(koder => koder.id !== parseInt(idKoder));
    json.koders = newKoders;
    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf8');
    response.json({
        success: true,
        message: 'El koder ha sido eliminado!'
    })
})

export default router