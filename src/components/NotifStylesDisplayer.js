import React, { useState, lazy, useEffect } from 'react'
import { Tabs } from 'components/TabsList'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { usePageLoadingContext } from 'context'
import { makeStyles, Grid, Typography, Link, Icon, Badge } from '@material-ui/core'
import { FONTS_HEAD } from 'App'
import { fontSize } from '@material-ui/system'


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

const notifStyles = makeStyles(theme => ({
    notif: {
        padding: theme.spacing(1),
        background: theme.palette.primary.dark,
        marginTop: '1px',
        marginBottom: '1px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '4px',
            marginBottom: '4px'
        }
    },
    undisplay: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    notifItem: {
        padding: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
    },
    spacers: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    rounders: {
        borderRadius: theme.spacing(1),
        overflow: "hidden"
    },
    clickableLink: {
        fontFamily: FONTS_HEAD,
        color: theme.palette.secondary.main,
        '&:hover': {
            color: theme.palette.secondary.light
        }
    },
    notFound: {
        color: theme.palette.grey[600],
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5)
    },
    badge: {
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: theme.spacing(4),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        color: theme.palette.primary.light,
        fontSize: "14px",
        textTransform: "uppercase",
        marginRight: theme.spacing(0.2)
    }
}))

const isLessThanNDays = (date, N) => {
    const currentTime = new Date()
    const diff = currentTime - date
    return ((diff / (1000 * 60 * 60 * 24)) <= N)
}

export const NotifStyleDisplayer = ({queryObject, displayNewBadge}) => {

    const classes = notifStyles()

    const LIMIT = 20

    const {data, loading, error, fetchMore} = useQuery(GET_NOTIFICATIONS,{
        variables: {
            options: {
                skip: 0,
                limit: LIMIT,
                type: queryObject.query_params
            }
        }
    })

    const {setLoading} = usePageLoadingContext()
    const [hasMore, setHasMore] = useState(true)


    useEffect(() => {
        if(loading === true){
            setLoading(true)
        } else {
            setLoading(false)
            if(data.allNotifications.length < LIMIT) {
                setHasMore(false)
            }
        }
    }, [loading])
    
    let ToRender
    if(loading){
        ToRender = (
            <Grid container>
                <Grid item xs={12}>                    
                </Grid>
            </Grid>
        )
    }

    else if(data) {
        if(data.allNotifications.length < 1){
            ToRender = (<>
                <Grid container className={classes.notFound}>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <Typography variant="h4">
                            -\_(^_^)_/- <br /><br />
                            Nothing Found
                        </Typography>
                    </Grid>
                </Grid>
                </>)
        } else {
            ToRender = (
                <InfiniteScroll
                    dataLength={data.allNotifications.length}
                    endMessage={<></>}
                    hasMore={hasMore}
                    next={() => fetchMore({
                        variables: {
                            options: {
                                skip: (data.allNotifications.length % LIMIT),
                                limit: LIMIT,
                                type: queryObject.query_params
                            }
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult || !hasMore) return prev;
                            console.log(prev)
                            console.log(fetchMoreResult)
                            if(fetchMoreResult.allNotifications.length < LIMIT) {
                                setHasMore(false)
                            }
                            return {
                                allNotifications: [
                                    ...prev.allNotifications,
                                    ...fetchMoreResult.allNotifications
                                ]
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
                            <Grid container className={`${classes.notif} ${classes.rounders}`} xs={12}>
                                <Grid item className={`${classes.notifItem} ${classes.undisplay}`} xs={12} md={1} lg={1}>
                                    {index + 1}
                                </Grid>
                                <Grid item className={classes.notifItem} xs={12} md={8} lg={9}>
                                    {
                                        displayNewBadge && isLessThanNDays(date, 7) ? 
                                        <Typography display="inline" className={`${classes.badge}`}>New</Typography> : 
                                        <></>
                                    }
                                    {item.notification_text}
                                </Grid>
                                <Grid item className={classes.notifItem} style={{textAlign: 'left'}} xs={12} md={2} lg={1}>{fdate}</Grid>
                                {
                                    (typeof(item.notification_url) === 'undefined' || item.notification_url === null || item.notification_url.length === 0) ? <></> :
                                    <Grid item className={classes.notifItem} xs={12} md={1} lg={1}><Link target="_blank" rel="noreferrer noopener" className={classes.clickableLink} href={item.notification_url}><Icon>launch</Icon></Link></Grid>
                                }
                            </Grid>
                        )
                    })
                }
                </InfiniteScroll>
            )
        }
    } else if(error) {
        ToRender = <div>Error Loading..</div>
    }

    return (
        <Grid container className={classes.spacers}>
            <Grid item xs={12} >
            {ToRender}
            </Grid>
        </Grid>
    )
}