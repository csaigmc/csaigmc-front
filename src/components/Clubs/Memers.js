import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { usePageLoadingContext } from 'context'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Displayer } from 'components/Displayer'
import { Grid } from '@material-ui/core'

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
const Memers = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Displayer
                    queryObject={{
                        query_query: ADVISORY_QUERY,
                        query_params: "meme",
                        query_tablename: "allArts"
                    }}
                    shouldDisplayInfo={true}/>
            </Grid>
        </Grid>
    )
}

export default Memers