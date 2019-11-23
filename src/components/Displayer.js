import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { usePageLoadingContext } from 'context'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Grid, Typography } from '@material-ui/core'
import { FONTS_HEAD } from 'App'
import { makeStyles } from '@material-ui/styles'
import { Footer } from './Footer/Footer'

const infoStyles = makeStyles(theme => ({
    infoContainer: {
        padding: theme.spacing(1),
        borderRadius: "4px",
        overflow: "hidden",
        transition: "0.14s backgroundColor ease-in-out",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark
        }
    },
    imazo: {
        width: '100%',
        height: "280px",
        objectFit: "cover",
        [theme.breakpoints.down('md')]: {
            height: '180px',
        }
    },
    info: {
        fontFamily: FONTS_HEAD,
        fontSize: '16px',
        color: theme.palette.grey[100]
    },
    subinfo: {
        fontFamily: FONTS_HEAD,
        fontSize: '12px',
        color: theme.palette.grey[400]        
    }
}))

const UserInfoCard = ({showInfo, info}) => {
    const classes = infoStyles()

    console.log("called User Card")
    console.log(info)

    return (
        <Grid item xs={12} sm={6} md={3} className={classes.infoContainer}>
            <img className={classes.imazo} src={info.url_path} />
            {
                showInfo ? <Grid container>
                    <Grid item xs={12} style={{paddingTop: "8px"}}>
                        <Typography variant="h6" className={classes.info}>
                            {info.user}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" className={classes.subinfo}>
                            {info.about_user}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" className={classes.subinfo}>
                            {info.phone_no}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" className={classes.subinfo}>
                            {info.email}
                        </Typography>
                    </Grid>
                </Grid> : null
            }
        </Grid>
    )
}

const InfoCard = ({showInfo, info}) => {

    const classes = infoStyles()

    return (
        <Grid item xs={12} sm={6} md={3} className={classes.infoContainer}>
            <img className={classes.imazo} src={info.url_path} />
            {
                showInfo ? <Grid container>
                    <Grid item xs={12} style={{paddingTop: "8px"}}>
                        <Typography variant="h6" className={classes.info}>
                            {info.creator}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" className={classes.subinfo}>
                            {info.about_creator}
                        </Typography>
                    </Grid>
                </Grid> : null
            }
        </Grid>
    )
}


const LIMIT = 12
const STEPPER = 4

const DisplayStyle = makeStyles(theme => ({
    notFound: {
        color: theme.palette.grey[600],
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5)
    },
    loading_display: {
        fontFamily: FONTS_HEAD,
        fontSize: '16px',
        color: theme.palette.grey[400]
    }
}))

export const Displayer = ({queryObject, shouldDisplayInfo, showContactInfo}) => {

    const classes = DisplayStyle()
    const [hasMore, setHasMore] = useState(true)

    const {data, error, loading, fetchMore} = useQuery(queryObject.query_query, {
        variables: {
            options: {
                skip: 0,
                limit: LIMIT,
                type: queryObject.query_params
            }
        }
    })
    const {setLoading} = usePageLoadingContext()

    console.log(data)

    useEffect(() => {
        if(loading === true) {
            setLoading(true)
        } else if(loading === false) {
            setLoading(false)
            if(!data || data[queryObject.query_tablename].length < LIMIT) {
                setHasMore(false)
            }
        }
    }, [loading])

    let ToRender
    const makeResponse = () => {

        console.log(data)
        if(!data){
            return []
        }

        const items = data[queryObject.query_tablename].map((item, index) => {
            return (
                showContactInfo === true ?
                <UserInfoCard showInfo={shouldDisplayInfo} info={item} key={index} /> :
                <InfoCard showInfo={shouldDisplayInfo} info={item} key={index} />
                
            )
        })
        const result = []
        for(let i = 0; i < data[queryObject.query_tablename].length; i+=STEPPER){
            const ti = []
            for(let j = 0; j < STEPPER && (i + j) < data[queryObject.query_tablename].length; ++j){
                ti.push(items[i+j])
            }
            result.push(<Grid container>{ti}</Grid>)
        }
        
        return result
    }

    if(loading) {
        ToRender = (
            <Grid container className={classes.notFound}>
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <Typography variant="h4">Loading...</Typography>
                </Grid>
            </Grid>
        )
    }
    else if(error) {
        ToRender = <div>Error</div>
    }
    else if(data) {
        const response = makeResponse()

        console.log(response)
        if(response.length === 0){
            ToRender = (
                <>
                <Grid container className={classes.notFound}>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <Typography variant="h4">
                            -\_(^_^)_/- <br /><br />
                            Nothing Found
                        </Typography>
                    </Grid>
                </Grid>
                </>
            )
        } else {
            ToRender = (
                <>
                    <InfiniteScroll
                        dataLength={response.length}
                        loader={
                            <Grid container>
                                <Grid item xs={12} style={{textAlign: 'center'}}>
                                    <Typography className={classes.loading_display}>Loading</Typography>
                                </Grid>
                            </Grid>
                        }
                        hasMore={hasMore}
                        endMessage={<></>}
                        next={() => {
                            const res = data[queryObject.query_tablename].length / LIMIT
                            console.log(`SKIP: ${res} | ${Math.floor(res)}`)
                            return fetchMore({
                            variables: {
                                options: {
                                    skip: res,
                                    limit: LIMIT,
                                    type: queryObject.query_params
                                }
                            }, updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult || !hasMore) return prev;
                                console.log(prev)
                                console.log(queryObject)
                                console.log(fetchMoreResult)
                                if(fetchMoreResult[queryObject.query_tablename].length < LIMIT) {
                                    setHasMore(false)
                                }
                                return {
                                    [queryObject.query_tablename]: [
                                        ...prev[queryObject.query_tablename],
                                        ...fetchMoreResult[queryObject.query_tablename]
                                    ]
                                }
                            }
                        })}
                    }>
                        {response}
                    </InfiniteScroll>
                </>
            )
        }
    }
    return (
        <>
            {ToRender}
        </>
    )
}