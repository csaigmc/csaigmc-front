import React, { useState, useEffect } from 'react'
import 'assets/css/theme.css'
import ReactMarkdown from 'react-markdown'
import { useQuery } from '@apollo/react-hooks'
import {FONTS_HEAD} from 'App'
import gql from 'graphql-tag'
import { usePageLoadingContext } from 'context'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Grid, makeStyles, Typography, Dialog, AppBar, Toolbar, IconButton, Icon, Container } from '@material-ui/core'
import Slide from '@material-ui/core/Slide';
import { Footer } from './Footer/Footer'

const infoStyles = makeStyles(theme => ({
    infoContainer: { 
        padding: theme.spacing(1),
        border: `1px solid transparent`,
        borderRadius: "1px",
        overflow: "hidden",
        transition: "0.14s all ease-in-out",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            border: `1px solid ${theme.palette.primary.light}`,
            // boxShadow: theme.shadows[2]
        },
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1) 
    },
    imazo: {
        width: '100%',
        height: "180px",
        objectFit: "cover",
        [theme.breakpoints.down('md')]: {
            height: '180px',
        }
    },
    title: {
        fontFamily: FONTS_HEAD,
        fontWeight: "bold",
        color: theme.textColor.main,
        textTransform: 'uppercase',
        overflow: 'hidden',
        textOverflow: "ellipsis",
        maxHeight: '2rem'
    },
    info: {
        fontFamily: FONTS_HEAD,
        fontSize: '16px',
        color: theme.textColor.main
    },
    subinfo: {
        fontFamily: FONTS_HEAD,
        fontSize: '12px',
        color: theme.textColor.dark        
    }
}))

const REGEX = /!\[.*\]\((.*)\)/
const findAnImage = (text) => {
    const mtch = text.match(REGEX)
    let imageUrl = null

    if(mtch !== null){
        try {
            imageUrl = mtch[1]
        } catch(error){
            return null
        }
    }

    return imageUrl
}

const dateFormatter = (create_date) => {
    const date = new Date()
    date.setTime(create_date)
    const day = date.getUTCDate()
    const mon = date.getMonth() + 1
    const year = date.getFullYear()
    const fdate = `${mon}/${day}/${year}`
    return fdate
}

const InfoCard = ({showInfo, info, handleClick}) => {

    const classes = infoStyles()
    const image = findAnImage(info.text)

    console.log(image)

    return (
        <Grid item xs={12} sm={6} md={3} className={classes.infoContainer} onClick={handleClick}>
            <Grid container>
                {image ? <img className={classes.imazo} src={image} /> : null}
                <Grid item xs={12} style={{paddingTop: "8px"}}>
                    <Typography variant="h6" className={classes.title}>
                        {info.title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" className={classes.info}>
                        {info.author}
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{paddingTop: "16px"}}>
                    <Typography variant="subtitle1" className={classes.subinfo}>
                        {dateFormatter(info.create_date)}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" className={classes.subinfo}>
                        {info.about_author}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Detailstyles = makeStyles(theme => ({
    title: {
        fontFamily: FONTS_HEAD,
        color: "inherit"
    },
    aboutAuthor: {
        fontFamily: FONTS_HEAD,
        color: theme.textColor.dark,
        fontSize: "14px"
    },
    author: {
        fontFamily: FONTS_HEAD,
        color: theme.textColor.light,
        fontSize: "14px"
    },
    error:{
        fontFamily: FONTS_HEAD,
        color: theme.palette.grey[500]
    },
    text: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        color: theme.textColor.main,
    } ,
    meta_info_container: {
        border: `1px solid ${theme.palette.primary.light}`,
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(2),
        borderRadius: "1px"
    }
}))


const DetailsRenderer = ({showing, info, handleClose}) => {

    const classes = Detailstyles()

    return (
        <Dialog fullScreen open={showing} TransitionComponent={Transition} onClose={() => handleClose()}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit" onClick={() => handleClose()}>
                        <Icon>close</Icon>
                    </IconButton>
                    <Typography className={classes.title} style={{paddingLeft: "8px"}}>{info ? info.title : 'Not Found'}</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                {
                    info ?
                    <Grid container style={{paddingTop: "84px"}}>
                        <Grid item xs={12} className={classes.meta_info_container}>
                            <Typography className={classes.author}>Author: {info.author}</Typography>
                            <Typography className={classes.aboutAuthor}>About Author: {info.about_author}</Typography>
                            <Typography className={classes.aboutAuthor}>Created On: {dateFormatter(info.create_date)}</Typography>
                        </Grid>
                        <Grid item xs={12} className={`react-article-source ${classes.text}`}>
                            <ReactMarkdown source={info.text} />
                        </Grid>
                    </Grid> :
                    <Grid container style={{paddingTop: "84px"}}>
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <Typography className={classes.error} variant="h5">
                                \_[^_^]_/<br /> <br />
                                ERROR
                            </Typography>
                        </Grid>
                    </Grid>
                }
            </Container>
        </Dialog>
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

export const ArticleDisplayer = ({queryObject, shouldDisplayInfo}) => {

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
    const [showingDetails, setShowingDetails] = useState(-1)

    useEffect(() => {
        if(loading === true) {
            setLoading(true)
        } else if(loading === false) {
            setLoading(false)
            if(data[queryObject.query_tablename].length < LIMIT){
                setHasMore(false)
            }
        }
    }, [loading])

    let ToRender
    const makeResponse = () => {
        const items = data[queryObject.query_tablename].map((item, index) => {
            return (
                <InfoCard showInfo={shouldDisplayInfo} info={item} key={index} handleClick={() => setShowingDetails(index)}/>
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
                        loader={<Grid container>
                            <Grid item xs={12} style={{textAlign: 'center'}}>
                                <Typography className={classes.loading_display}>Loading</Typography>
                            </Grid>
                        </Grid>}
                        endMessage={<></>}
                        hasMore={hasMore}
                        next={() => fetchMore({
                            variables: {
                                options: {
                                    skip: (data.length / LIMIT),
                                    limit: LIMIT,
                                    type: queryObject.query_params
                                }
                            }, updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult || !hasMore) return prev;
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
                        })}>
                        {response}
                    </InfiniteScroll>
                </>
            )
        }
    }
    return (
        <>
            {ToRender}
            <DetailsRenderer showing={showingDetails >= 0} info={showingDetails >= 0 ? data[queryObject.query_tablename][showingDetails] : null} handleClose={() => setShowingDetails(-1)}/>
        </>
    )
}