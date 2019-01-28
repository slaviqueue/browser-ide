import React, { useState } from 'react'
import AceEditor from 'react-ace';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import 'brace/mode/javascript';
import 'brace/theme/github';

import { highlight } from 'utils' 

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2,
  }
});

const onChange = stuff => console.log(stuff)

const runCode = userCode => 
  axios.post('/api/run/nodejs', {
    userCode
  })
  .then(highlight('data'))

const SandboxPage = ({ classes }) => {
  const [code, setCode] = useState('')

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={ classes.button }
        onClick={ () => runCode(code).then(console.log) }
      >
        Run code
      </Button>

      <AceEditor
        mode="javascript"
        theme="github"
        value={ code }
        onChange={ code => setCode(code) }
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        fontSize={ 16 }
      />
    </div>
  )
}

export default withStyles(styles)(SandboxPage)
