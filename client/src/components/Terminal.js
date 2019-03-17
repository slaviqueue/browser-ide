import React from 'react'
import styled from 'styled-components'

const TerminalWrapper = styled.pre`
  width: 40%;
  border-left: 1px solid #e3e3e3;
  font-size: 16px;
  padding: 12px;
  box-sizing: border-box;
  margin: 0;
  overflow: hidden;
  white-space: pre-wrap;
`

export default ({ children }) => (
  <TerminalWrapper>{ children }</TerminalWrapper>
)
