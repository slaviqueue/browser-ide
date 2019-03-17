import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import LanguageSelectionPage from './pages/LanguageSelectionPage'
import Sandbox from './pages/SandboxPage'

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
`

const BreadCrump = styled.span`
  font-weight: 200;
  margin-left: 6px;
`

const App = () => (
  <Router>
    <AppContainer>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            DirtyCode
            <Route
              path="/sandbox/:language"
              exact
              component={ ({ match }) => <BreadCrump>{ match.params.language }</BreadCrump> }
            />
          </Typography>
        </Toolbar>
      </AppBar>

      <Route path="/" exact component={ LanguageSelectionPage } />
      <Route path="/sandbox/:language" exact component={ Sandbox } />
    </AppContainer>
  </Router>
)

export default App
