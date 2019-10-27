import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { usePageLoadingContext } from 'context'
import InfiniteScroll from 'react-infinite-scroll-component'

const InfoCard = ({showInfo, info}) => {
    return (
        <div className="col-12 col-md-4 bg-primary-light-hover p-2" style={{transition: "all 0.14s ease-in-out", borderRadius: "4px", overflow: "hidden"}}>
            <img style={{width: "100%", height: "240px", objectFit: "cover"}} src={info.url_path} />
            {
                showInfo ? <div className="font-head px-2 pt-2 pb-1">
                    <div style={{fontWeight: "500", maxLines: 1, textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{info.creator}</div>
                    <div className="font-main small" style={{fontSize: "12px", color: "#ffffff80"}}>{info.about_creator}</div>
                </div> : null}
        </div>
    )
}


const LIMIT = 10

export const Displayer = ({queryObject, shouldDisplayInfo}) => {
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

    useEffect(() => {
        if(loading === true) {
            setLoading(true)
        } else if(loading === false) {
            setLoading(false)
        }
    }, [loading])

    let ToRender
    const makeResponse = () => {
        const items = data.allArts.map((item, index) => {
            return (
                <InfoCard showInfo={shouldDisplayInfo} info={item} key={index}/>
            )
        })
        const result = []
        for(let i = 0; i < data.allArts.length; i+=3){
            const ti = []
            for(let j = 0; j < 3 && (i + j) < data.allArts.length; ++j){
                ti.push(items[i+j])
            }
            result.push(<div className='container-fluid'><div className="row">{ti}</div></div>)
        }
        
        return result
    }

    if(error) {
        ToRender = <div>Error</div>
    }
    else if(data) {
        const response = makeResponse()

        console.log(response)
        ToRender = (
            <div>
                <InfiniteScroll
                    dataLength={response.length}
                    loader={<div>Loading</div>}
                    hasMore={data.length % LIMIT !== 0 ? false : true}
                    next={() => fetchMore({
                        variables: {
                            skip: Math.floor(data.length / LIMIT),
                            limit: LIMIT,
                            type: queryObject.query_params
                        }, updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                            feed: [...prev[queryObject.query_table_name], ...fetchMoreResult[queryObject.query_table_name]]
                            });
                        }
                    })}>
                    {response}
                </InfiniteScroll>
            </div>
        )
    }
    return (
        <div className="bg-primary-main">
            {ToRender}
        </div>
    )
}