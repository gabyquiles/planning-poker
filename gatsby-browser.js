/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import * as React from 'react'
import {Amplify} from 'aws-amplify'
import awsconfig from './src/aws-exports'
import { IdentityProvider } from './src/contexts/User/IdentityContext'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material'

export const onClientEntry = () => {
  Amplify.configure(awsconfig)
}
const theme = createTheme();

export const wrapPageElement = ({ element }) => (
  <StyledEngineProvider injectFirst>
  <ThemeProvider theme={theme}>
  <IdentityProvider>
    {element}
    </IdentityProvider>
  </ThemeProvider>
  </StyledEngineProvider>
)