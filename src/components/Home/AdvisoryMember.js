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
        phone_no
        email
        url_path
    }
}
`
const MemberAdvisory = () => {
    return (
        <Displayer
            queryObject={{
                query_query: ADVISORY_QUERY,
                query_params: "teacher",
                query_tablename: "allUsers"
            }}
            shouldDisplayInfo={true}
            showContactInfo={true}/>
    )
}

export default MemberAdvisory