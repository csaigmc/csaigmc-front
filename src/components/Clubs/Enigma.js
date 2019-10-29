import React from 'react'
import gql from 'graphql-tag'
import {FONTS_HEAD} from 'App'
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
                        query_params: "enigma"
                    }} />
            </Grid>
        </Grid>
    )
}

export default ISIS 