import React, {lazy, Suspense} from 'react'

const Notifications =  lazy(() => import('components/Notifications/Notifications'))
const Home = lazy(() => import('./components/Home/Home'))
const About =  lazy(() => import('components/About/About'))
const Clubs =  lazy(() => import('components/Clubs/Clubs'))
const Gallery =  lazy(() => import('components/Gallery/Gallery'))
const Complaints =  lazy(() => import('components/Complaints/Complaints'))

export const Routes = {
    '/home': () => <Home />,
    '/notifications': () => <Notifications />,
    '/clubs*': () => <Clubs />,
    '/about': () => <About />,
    '/gallery': () => <Gallery />,
    '/complaints': () => <Complaints />
}