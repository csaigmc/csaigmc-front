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
import {amber, grey, blue} from '@material-ui/core/colors'
import { Footer } from 'components/Footer/Footer';
import useLocalStorage from 'components/useLocalStorage'
import { availableColors, invertedMapColor } from 'cconstants';

const client = new ApolloClient({
  uri: [BASE_URL, 'graphql'].join('/') 
})

export const FONTS_HEAD = ['Archia', 'roboto', 'cursive'].join(',')
export const FONTS_MAIN = ['Roboto', 'sans-serif'].join(',')

const themeConstruct = ({type, ccolor}) => {
  let color = availableColors[ccolor]
  return type == "light" ? createMuiTheme({
    palette: {
      type: "light",
      primary: {
        light: grey[50],
        main: color[800],
        dark: grey[200]
      },
      secondary: color
    },
    typography: {
      fontFamily: FONTS_HEAD
    },
    textColor: {
      light: grey[900],
      main: grey[800],
      dark: grey[600],
    }
  }) : 
  createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        light: grey[600],
        main: grey[800],
        dark: grey[900]
      },
      secondary: color
    },
    typography: {
      fontFamily: FONTS_HEAD
    },
    textColor: {
      light: grey[50],
      main: grey[200],
      dark: grey[400],
    }
  }) 
}

const useStyles = makeStyles(theme => {
  root: {
    paddingTop: theme.spacing(10)
  }
})

const evaluateColorString = (item) => {
  console.log(item)
  if(typeof(item) == String) {
    return availableColors[item]
  } else {
    return item
  }
}

const App = () => {

  const {getItem, setItem} = useLocalStorage()
  const styles = useStyles()
  let [currentTheme, setCurrentTheme] = useState(1)
  let [themeSettings, setThemeSettings] = useState({
    type: 'dark',
    color: 'cyan'
  })

  useRedirect('/', '/home')
  const routesResult = useRoutes(Routes)

  const HandleChangeTheme = (key, value) => {
    // @Deprecated
    // console.log("onChangeSettings Called! - " + key + " " + value)
    // setThemeSettings({
    //   ...themeSettings,
    //   [key]: value
    // })
    // setItem(key, value)

  }

  // console.log(themeSettings)

  return (
    <ThemeProvider theme={themeConstruct({
      type: themeSettings['type'],
      ccolor: themeSettings['color']
    })}>
    <ApolloProvider client={client}>
      <Fragment>
        <Navigation currentSettings={themeSettings} onChangeSettings={HandleChangeTheme} />
        <Suspense fallback={
          <div>
            Loading...
          </div>
        }>
          <CssBaseline />
          <Container style={{paddingTop: "84px"}}>
            {routesResult || <NotFound />}
          </Container>
          <Footer />
        </Suspense>
      </Fragment>
    </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
