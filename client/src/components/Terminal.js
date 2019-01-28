import React from 'react'
import styled from 'styled-components'

const TerminalWrapper = styled.pre`
  width: 50%;
  color: #19d119;
  background-color: #2b3e50;
  font-size: 16px;
  font-weight: 600;
  padding: 12px;
  box-sizing: border-box;
  margin: 0;
`

export default ({ children }) => (
  <TerminalWrapper>{ children }</TerminalWrapper>
)
