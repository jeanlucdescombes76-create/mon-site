const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

// Test simple
app.get('/', (req, res) => {
  res.send('API is running')
})

// GET : liste tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' })
  }
})

// POST : crée un utilisateur
app.post('/users', async (req, res) => {
  const { name, email } = req.body

  try {
    const newUser = await prisma.user.create({
      data: { name, email }
    })
    res.json(newUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' })
  }
})

// PUT : met à jour un utilisateur
app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email }
    })
    res.json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l’utilisateur' })
  }
})

// DELETE : supprime un utilisateur
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    await prisma.user.delete({
      where: { id: Number(id) }
    })
    res.json({ message: 'Utilisateur supprimé' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur lors de la suppression de l’utilisateur' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
