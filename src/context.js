import {useReducer} from 'react'
import createUseContext from  'constate'

const ACTIONS = {
    PAGE_LOADING: "page-loading"
}


const initStateLoading = false

const loadingReducer = (state, action) => {
    console.log(action.type)
    switch(action.type) {
        case ACTIONS.LOADING: 
            return action.loading
        default:
            throw new Error('Unspecified type for loading!')
    }
}

const usePageLoader = () => {
    const [state, dispatch] = useReducer(loadingReducer, initStateLoading)
    const loading = state

    const setLoading = (value) => {
        console.log("trying set loading to => " + value)
        if(loading === value) return 
        else {
            dispatch({
                type: ACTIONS.LOADING,
                loading: value
            })
        }
    }

    return {loading, setLoading}
}

export const usePageLoadingContext = createUseContext(usePageLoader)