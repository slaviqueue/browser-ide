import React, { useState } from 'react'
import AceEditor from 'react-ace';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components'

import 'brace/mode/javascript';
import 'brace/theme/github';

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

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={ classes.button }
        onClick={ () => runCode(code).then(output => setOutput(output)) }
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
