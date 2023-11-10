/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import * as React from 'react'
import Amplify from 'aws-amplify'
import awsconfig from './src/aws-exports'
// import { UserProvider } from './src/Users/Components/UserContext'
// import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'

export const onClientEntry = () => {
  // Analytics.addPluggable(new AWSKinesisFirehoseProvider())
  // Analytics.configure({
  //   AWSKinesisFirehose: {
  //
  //     // OPTIONAL -  Amazon Kinesis Firehose service region
  //     region: 'us-east-1',
  //     //
  //     //     // OPTIONAL - The buffer size for events in number of items.
  //     //     bufferSize: 1000,
  //     //
  //     //     // OPTIONAL - The number of events to be deleted from the buffer when flushed.
  //     //     flushSize: 100,
  //     //
  //     //     // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
  //     //     flushInterval: 5000, // 5s
  //     //
  //     //     // OPTIONAL - The limit for failed recording retries.
  //     //     resendLimit: 5,
  //   },
  // })
  Amplify.configure(awsconfig)
}
const theme = createMuiTheme();

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    {element}
  </ThemeProvider>
  // <AmplifyAuthenticator>
  //   <UserProvider>{element}</UserProvider>
  // </AmplifyAuthenticator>
)
