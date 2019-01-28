import React, { useState } from 'react'
import AceEditor from 'react-ace'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

import 'brace/mode/javascript'
import 'brace/theme/github'

import { highlight, log } from 'utils' 

import Terminal from '../Terminal'

const EditorWrapper = styled.div`
  display: flex;
`

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2,
  }
})

const runCode = userCode => 
  axios.post('/api/run/nodejs', {
    userCode
  })
    .then(highlight('data'))
    .then(log)

const SandboxPage = ({ classes }) => {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const setData = (output, isLoading) => (
    setOutput(output),
    setIsLoading(isLoading)
  )

  const sendCode = () => (
    setIsLoading(true),
    runCode(code).then(output => setData(output, false))
  )

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={ classes.button }
        disabled={ isLoading }
        onClick={ sendCode }
      >
        Run code
      </Button>

      <EditorWrapper>
        <AceEditor
          mode="javascript"
          theme="github"
          value={ code }
          width="50%"
          onChange={ code => setCode(code) }
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          fontSize={ 16 }
        />

        <Terminal>
          { output }
        </Terminal>
      </EditorWrapper>        
    </div>
  )
}

export default withStyles(styles)(SandboxPage)
