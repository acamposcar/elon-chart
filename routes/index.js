const express = require('express')
const router = express.Router()
const Poll = require('../models/poll')

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.get('/poll', async (req, res, next) => {
  const poll = await Poll.findOne()
  return res.status(201).json(
    poll
  )
})

router.post('/yes', async (req, res, next) => {
  const poll = await Poll.findOne()
  const updatedPoll = await Poll.findByIdAndUpdate(poll._id, { yes: poll.yes + 1 }, { new: true })
  return res.status(201).json(
    updatedPoll
  )
})

router.post('/no', async (req, res, next) => {
  const poll = await Poll.findOne()
  const updatedPoll = await Poll.findByIdAndUpdate(poll._id, { yes: poll.yes + 1 }, { new: true })
  return res.status(201).json(
    updatedPoll
  )
})

module.exports = router
