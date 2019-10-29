import React, {useState, lazy} from 'react'
import 'assets/css/theme.css'
import { Tabs } from 'components/TabsList'
import { Grid } from '@material-ui/core'
const AddComplaints = lazy(() => import('components/Complaints/AddComplaints'))
const SearchComplaints = lazy(() => import('components/Complaints/SearchComplaints'))

const Complaints = () => {

    const [currentTab, setCurrentTab] = useState(0)

    let ToRender

    switch (currentTab) {
        case 0:
            ToRender = <AddComplaints />
            break;
        case 1:
            ToRender = <SearchComplaints />
            break;
    }

    return (
        <Grid container>
            <Tabs tabList={["Add Complaint", "Search Complaint"]} currentTab={currentTab} onChange={(index) => {
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

export default Complaints