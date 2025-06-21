const express = require('express')
const swaggerUI = require("swagger-ui-express")

const apiDoc = require('./apidocs.json')

const siswaRoutes = require('./routes/siswaRoute')

const app = express()
const PORT = 3000

app.use(express.json())
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiDoc))

app.use('/', siswaRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
