import React, {useState, lazy} from 'react'
import 'assets/css/theme.css'
import { Tabs } from 'components/TabsList'
const MemberAdvisory = lazy(() => import('components/Home/AdvisoryMember'))
const MemberStudent = lazy(() => import('components/Home/StudentMember'))

const Home = () => {

    const [currentTab, setCurrentTab] = useState(0)

    let ToRender

    switch (currentTab) {
        case 0:
            ToRender = <MemberAdvisory />
            break;
        case 1:
            ToRender = <MemberStudent />
            break;
    }

    return (
        <>
            <Tabs tabList={["Advisory", "Student"]} currentTab={currentTab} onChange={(index) => {
                setCurrentTab(index)
            }}/>
            <div className="container py-2 bg-primary-main">
                {ToRender}
            </div>
        </>
    )
}

export default Home 