import React, { useState, lazy } from 'react'
import { Tabs } from 'components/TabsList'

const Enigma = lazy(() => import('components/Clubs/Enigma'))
const ISIS = lazy(() => import('components/Clubs/ISIS'))
const Arts = lazy(() => import('components/Clubs/Arts'))
const Memers = lazy(() => import('components/Clubs/Memers'))

const Clubs = () => {
    const [currentTab, setCurrentTab] = useState(0)

    let ToRender
    switch (currentTab) {
        case 0:
            ToRender = <Enigma />
            break;
        case 1:
            ToRender = <ISIS />
            break;
        case 2:
            ToRender = <Arts />
            break;
        case 3:
            ToRender = <Memers />
            break;
    }

    return (
        <>
            <Tabs tabList={["Enigma", "ISIS", "Arts", "Memers"]} currentTab={currentTab} onChange={(index) => setCurrentTab(index)}/>
            {ToRender}
        </>
    )
}

export default Clubs