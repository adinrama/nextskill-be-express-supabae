const db = require('../utils/db')

const getStudents = async (req, res) => {
  try {
    const students = await db.from('students').select()
    res.status(200).json({ students })
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
}

const addStudent = async (req, res) => {
  try {
    const { nama, kelas, jurusan } = req.body
    if (jurusan != 'TKJ' && jurusan != 'RPL') {
      res.status(200).json({ message: 'Hanya menerima TKJ / RPL' })
    } else {
      const newStudent = await db.from('students').insert({ nama, kelas, jurusan })
      res.status(201).json({ message: 'Data siswa berhasil ditambahkan.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
}

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params
    const { nama, kelas, jurusan } = req.body

    const { data, error } = await db.from('students').update({ nama, kelas, jurusan }).eq('id', id).select()

    if (error) throw error
    if (data.length === 0) {
      return res.status(404).json({ message: 'Data siswa tidak ditemukan.' })
    }

    res.status(200).json({ message: 'Data siswa berhasil diperbarui.' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error!' })
  }
}

const removeStudent = async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await db.from('students').delete().eq('id', id).select()

    if (error) throw error
    if (data.length === 0) {
      return res.status(404).json({ message: 'Data siswa tidak ditemukan.' })
    }

    res.status(200).json({ message: 'Data siswa berhasil dihapus.' })
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
}

module.exports = { getStudents, addStudent, updateStudent, removeStudent }
