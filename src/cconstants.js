import {red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, amber} from '@material-ui/core/colors'

const availableColors = {
    "red": red,
    "pink": pink,
    "purple": purple,
    "deepPurple": deepPurple,
    "indigo": indigo,
    "blue": blue,
    "lightBlue": lightBlue,
    "cyan": cyan,
    "teal": teal,
    "green": green,
    "lightGreen": lightGreen,
    "lime": lime,
    "amber": amber
}

const invertMap = (mp) => {
    let v = {}
    Object.keys(mp).forEach((item, index) => {
        v[mp[item]] = mp[item]
    })

    console.log(v);
    return v;
}

const invertedMapColor = invertMap(availableColors)

export {
    availableColors,
    invertedMapColor
}