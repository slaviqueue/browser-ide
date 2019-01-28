import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

import executeNodejs from './executers/nodejs'
import { log } from './utils'

const app = express()
const PORT_NUMBER = process.env.PORT || 3000 /*global process*/

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const executors = {
  nodejs: executeNodejs
}

app.post('/api/run/:language', (req, res) => {
  const { params: { language }, body: { userCode } } = req

  if (!executors[language])
    return res
      .status(404)
      .send('Unkown language specified')

  executors[language](userCode)
    .then(result => res.send(result))
    .catch(log)
})

app.use(express.static(path.join(__dirname, 'client/public'))) /*global __dirname*/

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/public', 'index.html')) /*global __dirname*/
})

app.listen(PORT_NUMBER, () => log(`Listening on port ${ PORT_NUMBER }`))
