import React, { Component } from 'react'
import { ReactTerminalStateless } from 'react-terminal-component';
import { EmulatorState } from 'javascript-terminal';
import styled from 'styled-components'

const TerminalWrapper = styled.pre`
  width: 50%;
  color: #19d119;
  background-color: #393939;
  font-size: 16px;
  font-weight: 600;
  padding: 12px;
  box-sizing: border-box;
  margin: 0;
`

export default ({ children }) => (
  <TerminalWrapper>{ children }</TerminalWrapper>
)
