import React, {lazy} from 'react'

const Enigma = lazy(() => import('components/Clubs/Enigma'))
const ISIS = lazy(() => import('components/Clubs/ISIS'))
const Arts = lazy(() => import('components/Clubs/Arts'))
const Memers = lazy(() => import('components/Clubs/Memers'))

export const clubroutes = {
    "/enigma": () => <Enigma />,
    "/memers": () => <Memers />,
    "/isis": () => <ISIS />,
    "/arts": () => <Arts />,
}