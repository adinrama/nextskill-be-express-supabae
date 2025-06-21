const express = require('express')
const router = express.Router()

const { getStudents, addStudent, updateStudent, removeStudent } = require('../controllers/siswaController')

router.get('/siswa', getStudents)
router.post('/siswa', addStudent)
router.put('/siswa/:id', updateStudent)
router.delete('/siswa/:id', removeStudent)

module.exports = router
