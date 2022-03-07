const express = require('express')
const router = express.Router()
const {  getGoals, setGoal, deleteGoal, updateGoal
 }= require('../controllers/goalcontroller')

 const {protect} = require('../middleware/authMiddleware')

 router.route('/').get(protect, getGoals).post(protect, setGoal)
 router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)
/*
router.get('/', getGoals )

router.post('/', setGoal)

router.put('/:id', updateGoal)

router.delete('/:id', deleteGoal)
*/
module.exports = router