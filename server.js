import express from 'express'
import bodyParser from 'body-parser'

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

app.listen(PORT_NUMBER, () => log(`Listening on port ${ PORT_NUMBER }`))
