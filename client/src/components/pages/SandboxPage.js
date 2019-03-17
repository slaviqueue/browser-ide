import React, { useState, useEffect } from 'react'
import AceEditor from 'react-ace'
import axios from 'axios'
import styled from 'styled-components'
import QueryString from 'query-string'

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
  height: calc(100%  - 56px);
`

const EditorWrapper = styled.div`
  display: flex;
  max-width: 900px;
  max-height: 600px;
  width: 80%;
  height: 80%;
  box-shadow: rgba(0, 0, 0, 0.4) 8px 8px 32px 1px;

  @media (max-width: 600px) {
    box-shadow: none;
    flex-direction: column;
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
  }
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

const SandboxPage = ({ history, match, location }) => {
  const { code: initialCodeValue = '' } = QueryString.parse(location.search)
  const { params: { language } } = match

  const [ code, _setCode ] = useState(decodeURIComponent(initialCodeValue))
  const [ output, setOutput ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  const setCode = code => (
    history.push({
      search: `?code=${ code }`
    }),
    _setCode(code)
  )

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
    window.addEventListener('shake', sendCode, false)

    return () => {
      window.removeEventListener('keydown', handleCtrlEnterPress)
      window.removeEventListener('shake', sendCode)
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
          width="initial"
          height="initial"
          className="codeEditor"
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
