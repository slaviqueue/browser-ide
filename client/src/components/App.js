import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { highlight } from 'utils'

import LanguageSelectionPage from './pages/LanguageSelectionPage'
import Sandbox from './pages/Sandbox'

const AppContainer = styled.div`
    width: 100%;
    height: calc(100% - 64px);
`

const App = () => (
  <Router>
    <AppContainer>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            DirtyCode
          </Typography>
        </Toolbar>
      </AppBar>

      <Route path="/" exact component={ LanguageSelectionPage } />
      <Route path="/sandbox/:language" exact component={ Sandbox } />
    </AppContainer>
  </Router>
)

export default App
