import React, { Suspense } from 'react';
import 'assets/css/theme.css'
import {useRedirect, useRoutes} from 'hookrouter'
import { Navigation } from 'components/Navigation/Navigation';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks'
import { BASE_URL } from 'cconfig';
import { Routes } from 'routes';
import { NotFound } from 'components/NotFound';


const client = new ApolloClient({
  uri: [BASE_URL, 'graphql'].join('/') 
})


console.log(BASE_URL)

const App = () => {

  useRedirect('/', '/home')
  const routesResult = useRoutes(Routes)

  return (
    <ApolloProvider client={client}>
      <div className="container-fluid px-0 h-100 bg-primary-main">
        <div className="pt-5 bg-primary-main">
          <Suspense fallback={
            <div>
              Loading...
            </div>

          }>
            {routesResult || <NotFound />}
          </Suspense>
        </div>
        <Navigation />
      </div>
    </ApolloProvider>
  );
}

export default App;
