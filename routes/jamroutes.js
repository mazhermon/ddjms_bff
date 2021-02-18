const express = require('express')
const router = express.Router()

const Jam = require('../models/jam')

router.get('/', (req, res) => {
  const data = {
    message: "yup we're up and running",
  }
  res.json(data)
})

router.get('/jams', (req, res) => {
  Jam.find({})
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      console.log('error in find jam from db', error)
    })
})

router.post('/jams', (req, res) => {
  const jamToSave = new Jam(req.body)

  jamToSave.save(error => {
    if (error) {
      res.status(500).json({
        msg: 'sorry, no can do homie, internal server error',
      })
      return
    }
    res.json({
      msg: 'Yep, saved that jam, nice',
    })
  })
})

router.put('/jams', (req, res) => {
  const testme = Jam.find({ _id: req.query.id })
  Jam.findOneAndUpdate({ _id: req.query.id }, req.body, {
    maxTimeMS: 2000,
  })
    .then(() => {
      res.json({ msg: 'Yas Jam updated boi!', jam: testme })
    })
    .catch(() => {
      res.status(500).send(`Sorry couldn't update the jam`)
    })
})

router.delete('/jams', (req, res) => {
  const id = req.query.id
  Jam.findByIdAndRemove(id)
    .then(() => {
      res.json({
        msg: `Removed jam with slug of ${id}`,
      })
    })
    .catch(() => {
      res.json({
        msg: 'error message nah boh',
        body: id,
      })
    })
})

module.exports = router
