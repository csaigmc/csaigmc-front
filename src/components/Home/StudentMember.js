import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { usePageLoadingContext } from 'context'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Displayer } from '../Displayer'

const ADVISORY_QUERY = gql`
query allAdvisory($options: InpOptions) {
    allArts(options: $options) {
        _id
        creator
        about_creator
        url_path
    }
}
`
const StudentMember = () => {
    return (
        <Displayer
            queryObject={{
                query_query: ADVISORY_QUERY,
                query_params: "student",
                query_tablename: "allArts"
            }}
            shouldDisplayInfo={true}/>
    )
}

export default StudentMember