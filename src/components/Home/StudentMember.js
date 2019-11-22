import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { usePageLoadingContext } from 'context'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Displayer } from '../Displayer'

const ADVISORY_QUERY = gql`
query allAdvisory($options: InpOptions) {
    allUsers(options: $options) {
        _id
        user
        about_user
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
                query_tablename: "allUsers"
            }}
            shouldDisplayInfo={true}
            showContactInfo={true} />
    )
}

export default StudentMember