import {React} from 'react'

let useLocalStorage = () => {

    let ls = window.localStorage

    const getItem = (key, defVal) => {
        let v = ls.getItem(key)
        
        if(v == null || v == undefined){
            ls.setItem(key, defVal)
            return defVal
        } else {
            return v
        }
    }

    const setItem = (key, value) => {
        let v = ls.setItem(key, value)
    } 

    return {getItem, setItem}

}

export default useLocalStorage