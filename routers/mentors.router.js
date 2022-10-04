import express from 'express'
import fs from 'fs'

const router = express.Router() // creando un router

/**
 * TODO : GET /mentors
 */
router.get('/', async(request, response) => {
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
    const json = JSON.parse(dataFile);

    const { module, gender } = request.query;
    let mentorFiltered = json.mentors;
    if(module) {
        mentorFiltered = mentorFiltered.filter(mentor => mentor.module === module);
    }

    if(gender) {
        mentorFiltered = mentorFiltered.filter(mentor => mentor.gender === gender);
    }

    response.json({
        success: true,
        data: {
            mentors: mentorFiltered || json.mentors
        }
    })
})

/**
 * TODO: GET /mentors/:id
 */

router.get('/:idMentor', async (request, response) => {
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
    const { idMentor } = request.params;
    const json = JSON.parse(dataFile);
    const mentors = json.mentors;
    const mentorFind = mentors.find(mentor => mentor.id === parseInt(idMentor));
    response.json({
        success: true,
        data:{
            mentorFind
        }
    })
})

/**
 * TODO: POST /mentors
 */

router.post('/', async(request, response) => {
    const newMentor = request.body;
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
    const json = JSON.parse(dataFile);
    json.mentors.push(newMentor);
    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf8');
    response.json({
        success: true,
        message: 'Mentor creado!'
    })
})

/**
 * TODO:  PATCH /mentors/:id
 */

router.patch('/:idMentor', async (request, response) => {
    const { idMentor } = request.params;
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
    const json = JSON.parse(dataFile)
    const mentorFind = json.mentors.find(mentor => mentor.id === parseInt(idMentor));
    mentorFind.name = 'Fernanda Palacios Vera';
    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf8');
    response.json({
        success: true,
        mentors: json.mentors
    })
})

/**
 * TODO: DELETE /mentors/:id
 */

router.delete('/:idMentor', async(request, response) => {
    const { idMentor } = request.params;
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8');
    const json = JSON.parse(dataFile);
    const mentors = json.mentors
    const newMentors = mentors.filter(mentor => mentor.id !== parseInt(idMentor));
    json.mentors = newMentors
    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf8');
    response.json({
        success: true,
        message: 'El mentor a sido eliminado!'
    })
})

export default router