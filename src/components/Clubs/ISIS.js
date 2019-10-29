import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import {FONTS_HEAD} from 'App'
import gql from 'graphql-tag'
import { usePageLoadingContext } from 'context'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { ArticleDisplayer } from 'components/ArticleDisplayer'

const ISIS_QUERY = gql`
query allEnigma($options: InpOptions) {
    allArticles(options: $options) {
        _id
        text
        title
        author
        about_author
        create_date
    }
}`

const ISIS = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <ArticleDisplayer 
                    queryObject={{
                        query_query: ISIS_QUERY,
                        query_table_name: "allArticles",
                        query_params: "isis"
                    }}/>
            </Grid>
        </Grid>
    )
}

export default ISIS 