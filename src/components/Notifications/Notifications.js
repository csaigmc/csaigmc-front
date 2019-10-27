import React, { useState, lazy, useEffect } from 'react'
import { Tabs } from 'components/TabsList'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { usePageLoadingContext } from 'context'


const AddStudent = lazy(() => import('components/Notifications/AddStudent'))

const GET_NOTIFICATIONS = gql`
query AllNotifications($options: InpOptions) {
    allNotifications(options: $options){
        _id
        notification_text
        notification_url
        create_date
    }
}
`

const MyNotifs = () => {
    
    const {data, loading, error, fetchMore} = useQuery(GET_NOTIFICATIONS)
    const {setLoading} = usePageLoadingContext()

    const LIMIT = 20

    useEffect(() => {
        if(loading === true){
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [loading])
    
    let ToRender
    if(data) {
        ToRender = (
            <InfiniteScroll
                dataLength={data.allNotifications.length}
                next={() => fetchMore({
                    variables: {
                        options: {
                            skip: (data.allNotifications.length % LIMIT),
                            limit: LIMIT
                        }
                    }
                })}>
            { 
                data.allNotifications.map((item, index) => {

                    const date = new Date()
                    date.setTime(item.create_date)
                    const day = date.getUTCDate()
                    const mon = date.getMonth() + 1
                    const year = date.getFullYear()
                    const fdate = `${mon}/${day}/${year}`

                    return (
                        <div className="container-fluid">
                            <div className="row bg-primary-light my-1 rounded font-head">
                                <div className="col-12 col-md-1 py-md-2">{index}</div>
                                <div className="col-12 col-md-8 py-md-2">{item.notification_text}</div>
                                <div className="col-12 col-md-1 py-md-2"><a className="text-secondary-light text-secondary-dark-hover" href={item.notification_url}>More</a></div>
                                <div className="col-12 col-md-2 py-md-2">{fdate}</div>
                            </div>
                        </div>
                    )
                })
            }
            </InfiniteScroll>
        )
    } else if(error) {
        ToRender = <div>Error Loading..</div>
    }

    return (
        <div className="container-fluid">
            {ToRender}
        </div>
    )
}

const Notifications = () => {

    const [currentTab, setCurrentTab] = useState(0)

    let ToRender
    switch (currentTab) {
        case 0:
            ToRender = <MyNotifs />
            break;
        case 1:
            ToRender = <AddStudent />
            break;
        default:
            break;
    }

    console.log(ToRender)

    return (
        <>
            <Tabs tabList={["Notifications", "Add Student"]} currentTab={currentTab} onChange={(index) => setCurrentTab(index)} />
            {ToRender}
        </>
    )
}

export default Notifications    