import React, {useState, lazy} from 'react'
import 'assets/css/theme.css'
import { Tabs } from 'components/TabsList'
import { Grid } from '@material-ui/core'
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
        <Grid container>
            <Tabs tabList={["CSA Advisory", "CSA Members"]} currentTab={currentTab} onChange={(index) => {
                setCurrentTab(index)
            }}/>
            <Grid container>
                <Grid item xs={12}>
                    {ToRender}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home 