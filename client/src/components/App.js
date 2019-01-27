import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import { highlight } from 'utils'

import LanguageSelectionPage from './pages/LanguageSelectionPage'
import Sandbox from './pages/Sandbox'

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
`

const App = () => (
	<Router>
		<AppContainer>
			<Route path="/" exact component={ LanguageSelectionPage } />
			<Route path="/sandbox/:language" exact component={ Sandbox } />
		</AppContainer>
	</Router>
)

axios.post('api/run/nodejs', {
		userCode: 'console.log(1)'
	})
	.then(highlight('data'))
	.then(console.log)

export default App
