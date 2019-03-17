import React, { useState, useEffect } from 'react'
import AceEditor from 'react-ace'
import axios from 'axios'
import styled from 'styled-components'

import 'brace/mode/javascript'
import 'brace/mode/ruby'
import 'brace/theme/github'

import 'brace/snippets/javascript'
import 'brace/snippets/ruby'
import 'brace/ext/language_tools'

import { highlight, log } from 'utils' 

import Terminal from '../Terminal'

const SandboxWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const EditorWrapper = styled.div`
  display: flex;
  max-width: 900px;
  max-height: 600px;
  width: 80%;
  height: 80%;
  box-shadow: 1px 1px 32px 1px rgba(0,0,0,.3);
`

const languageToAceModeMapping = {
  nodejs: 'javascript',
  ruby: 'ruby',
}

const runCode = (userCode, language) => 
  axios.post(`/api/run/${ language }`, {
    userCode
  })
    .then(highlight('data'))
    .then(log)

const SandboxPage = ({ match }) => {
  const { params: { language } } = match

  const [ code, setCode ] = useState('')
  const [ output, setOutput ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  const setData = (output, isLoading) => (
    setOutput(output),
    setIsLoading(isLoading)
  )

  const sendCode = () => (
    setIsLoading(true),
    runCode(code, language).then(output => setData(output, false))
  )

  const handleCtrlEnterPress = ({ ctrlKey, keyCode }) => {
    if (ctrlKey && keyCode === 13)
      sendCode()
  }

  useEffect(() => {
    window.addEventListener('keydown', handleCtrlEnterPress)

    return () => {
        window.removeEventListener('keydown', handleCtrlEnterPress);
    }
  })

  return (
    <SandboxWrapper>
      <EditorWrapper>
        <AceEditor
          name="code-editor"
          mode={ languageToAceModeMapping[language] }
          theme="github"
          fontSize={ 16 }
          value={ code }
          width="60%"
          height="100%"
          onChange={ code => setCode(code) }
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            showPrintMargin: false,
            tabSize: 2,
          }}
        />

        <Terminal>
          { output }
        </Terminal>
      </EditorWrapper>        
    </SandboxWrapper>
  )
}

export default SandboxPage
