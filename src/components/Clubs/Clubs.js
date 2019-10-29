import React from 'react'
import { useRoutes, useRedirect } from 'hookrouter'
import { clubroutes } from 'components/clubroutes'
import { NotFound } from 'components/NotFound'


const Clubs = () => {
    useRedirect('/clubs', '/clubs/enigma')
    const routeResults = useRoutes(clubroutes)

    return (
        <>
            {routeResults || <NotFound />}
        </>
    )
}

export default Clubs