import React, { useState } from 'react'
import AceEditor from 'react-ace'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

import 'brace/mode/javascript'
import 'brace/mode/ruby'
import 'brace/theme/github'

import { highlight, log } from 'utils' 

import Terminal from '../Terminal'

const SandboxWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: 100%;
`

const EditorWrapper = styled.div`
  display: flex;
  height: 100%;
`

const ButtonWrapper = styled.div`
  display: block;
`

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2,
  }
})

const runCode = (userCode, language) => 
  axios.post(`/api/run/${ language }`, {
    userCode
  })
    .then(highlight('data'))
    .then(log)

const SandboxPage = ({ classes, match }) => {
  const { params: { language } } = match

  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const setData = (output, isLoading) => (
    setOutput(output),
    setIsLoading(isLoading)
  )

  const sendCode = () => (
    setIsLoading(true),
    runCode(code, language).then(output => setData(output, false))
  )

  return (
    <SandboxWrapper>
      <ButtonWrapper>
        <Button
          variant="contained"
          color="primary"
          className={ classes.button }
          disabled={ isLoading }
          onClick={ sendCode }
        >
          Run code
        </Button>
      </ButtonWrapper>

      <EditorWrapper>
        <AceEditor
          mode={ language }
          theme="github"
          value={ code }
          width="50%"
          height="100%"
          onChange={ code => setCode(code) }
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          fontSize={ 16 }
        />

        <Terminal>
          { output }
        </Terminal>
      </EditorWrapper>        
    </SandboxWrapper>
  )
}

export default withStyles(styles)(SandboxPage)
