import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from "react-router-dom";
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';

function Dropdown () {
    const [ anchorEl, setAnchorEl ] = React.useState( null );
    let navigate = useNavigate();

    const open = Boolean( anchorEl );
    const handleClick = ( event ) => {
        setAnchorEl( event.currentTarget );
    };
    const handleClose = () => {
        setAnchorEl( null );
    };

    // const historyremove = ( event ) => {
    //     localStorage.removeItem( "userInfo" );
    // }

    // const main = ( event ) => {
    //     handleClose();
    //     historyremove( event );
    // }

    const dispatch = useDispatch();

    const userLogin = useSelector( state => state.userLogin );
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch( logout() );
        navigate( "/", { replace: true } )

    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={ open ? 'basic-menu' : undefined }
                aria-haspopup="true"
                aria-expanded={ open ? 'true' : undefined }
                onClick={ handleClick }
                className="das"
            >
                Dashboard
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={ anchorEl }
                open={ open }
                onClose={ handleClose }
                MenuListProps={ {
                    'aria-labelledby': 'basic-button',
                } }
            >
                <MenuItem onClick={ handleClose }><Link to="/profile">Profile</Link></MenuItem>
                <MenuItem onClick={ logoutHandler } href="/logout">Logout</MenuItem>
            </Menu>
        </div >
    )
}

export default Dropdown