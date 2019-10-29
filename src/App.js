import React, { Suspense, Fragment, useState } from 'react';
import 'assets/css/theme.css'
import {useRedirect, useRoutes} from 'hookrouter'
import { Navigation } from 'components/Navigation/Navigation';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks'
import { BASE_URL } from 'cconfig';
import { Routes } from 'routes';
import { NotFound } from 'components/NotFound';
import {CssBaseline} from '@material-ui/core'
import Container from '@material-ui/core/Container'
import {createMuiTheme, makeStyles} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import {amber, grey} from '@material-ui/core/colors'
import { Footer } from 'components/Footer/Footer';


const client = new ApolloClient({
  uri: [BASE_URL, 'graphql'].join('/') 
})

export const FONTS_HEAD = ['Comfortaa', 'roboto', 'cursive'].join(',')
export const FONTS_MAIN = ['Roboto', 'sans-serif'].join(',')

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: grey[600],
      main: grey[800],
      dark: grey[900]
    },
    secondary: amber
  },
  typography: {
    h1: { fontFamily: FONTS_HEAD},
    h2: { fontFamily: FONTS_HEAD},
    h3: { fontFamily: FONTS_HEAD},
    h4: { fontFamily: FONTS_HEAD},
    h5: { fontFamily: FONTS_HEAD},
    h6: { fontFamily: FONTS_HEAD},
    button: { fontFamily: FONTS_HEAD},
  }
})

const useStyles = makeStyles(theme => {
  root: {
    paddingTop: theme.spacing(10)
  }
})

const App = () => {

  const styles = useStyles()

  useRedirect('/', '/home')
  const routesResult = useRoutes(Routes)

  return (
    <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <Fragment>
        <Navigation />
        <Suspense fallback={
          <div>
            Loading...
          </div>
        }>
          <CssBaseline />
          <Container style={{paddingTop: "84px"}}>
            {routesResult || <NotFound />}
          </Container>
        </Suspense>
        <Footer />
      </Fragment>
    </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
