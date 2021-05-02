import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Toolbar from '@material-ui/core/Toolbar'
import {fade, makeStyles} from '@material-ui/core/styles'

interface Props {
    value: string;
    onChange: (input: string) => void
}

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto'
        }
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200
        }
    }
}))
const SearchBox: React.FC<Props> = (props) => {
    const classes = useStyles()
    const {value, onChange} = props
    return (<>
        <div className={classes.search} style={{flex: 'auto',}}>
            <div className={classes.searchIcon}>
                <SearchIcon/>
            </div>
            <InputBase
                placeholder="Search…"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value)
                }}
                type='search'
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                style={{width: '100%'}}
                inputProps={{'aria-label': 'search'}}
            />
        </div>

    </>)
}
export default SearchBox
