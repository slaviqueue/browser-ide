import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { delayed } from 'utils'

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`

const LanguageSelectorContainer = styled.div`
  display: inline-block;
  width: 300px;
  margin-top: -128px;
  text-align: center;
`

const Text = styled.p`
  font-family: Roboto;
`

const LanguageSelectionPage = ({ history }) => (
  <PageContainer>
    <LanguageSelectorContainer>
      <Text>Pick your favourite language</Text>
        
      <Select
        value="NodeJS"
        onChange={({ target: { value } }) => delayed(history.push, 300, `/sandbox/${ value.toLowerCase() }`)}
      >
        <MenuItem value="NodeJS">
          NodeJS
        </MenuItem>

        <MenuItem value="Ruby">
          Ruby
        </MenuItem>
      </Select>
    </LanguageSelectorContainer>
  </PageContainer>
)

export default withRouter(LanguageSelectionPage)
