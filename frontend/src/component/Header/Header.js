import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import './Header.css';
import Dropdown from './Dropdown';
import { Link } from "react-router-dom";

const Search = styled( 'div' )( ( { theme } ) => ( {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha( theme.palette.common.white, 0.15 ),
    '&:hover': {
        backgroundColor: alpha( theme.palette.common.white, 0.25 ),
    },
    marginRight: "30%",
    width: '100%',
    [ theme.breakpoints.up( 'sm' ) ]: {
        marginLeft: theme.spacing( 1 ),
        width: 'auto',
    },
} ) );

const SearchIconWrapper = styled( 'div' )( ( { theme } ) => ( {
    padding: theme.spacing( 0, 2 ),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
} ) );

const StyledInputBase = styled( InputBase )( ( { theme } ) => ( {
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing( 1, 1, 1, 0 ),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing( 4 )})`,
        transition: theme.transitions.create( 'width' ),
        width: '100%',
        [ theme.breakpoints.up( 'sm' ) ]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
} ) );

function Header ( { setSearch } ) {
    const [ age, setAge ] = React.useState( '' );

    const handleChange = ( event ) => {
        setAge( event.target.value );
    };
    return (
        <Box sx={ { flexGrow: 1 } }>
            <AppBar position="static" style={ { background: '#2E3B55' } }>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={ { flexGrow: 1, display: { xs: 'none', sm: 'block' } } }
                        className="logo"
                    >
                        <Link to='/' className="das">NoteEt</Link>
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={ { 'aria-label': 'search' } }
                            onChange={ ( e ) => setSearch( e.target.value ) }
                        />
                    </Search>
                    <Button color="inherit" component="div" >
                        <Link to='/mynotes' className="das">My Notes</Link>
                    </Button>
                    <Dropdown />
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default Header