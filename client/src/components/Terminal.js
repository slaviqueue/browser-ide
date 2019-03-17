import React from 'react'
import styled from 'styled-components'

const TerminalWrapper = styled.pre`
  padding: 12px;
  margin: 0;
  flex-grow: 0.4;
  flex-basis: 40%;
  border-left: 1px solid #e3e3e3;
  font-size: 14px;
  box-sizing: border-box;
  overflow-y: scroll;
  white-space: pre-wrap;

  @media (max-width: 600px) {
    border-left: none;
    border-top: 1px solid #e3e3e3;
  }
`

export default ({ children }) => (
  <TerminalWrapper>{ children }</TerminalWrapper>
)
