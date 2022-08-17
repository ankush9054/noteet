import React, { useEffect } from 'react';
import './LandingPage.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Navigate, useNavigate } from "react-router-dom";


function LandingPage () {
    let navigate = useNavigate();

    useEffect( () => {
        const userInfo = localStorage.getItem( "userInfo" );

        if ( userInfo ) {
            navigate( "./mynotes", { replace: true } );
        }
    }, [ Navigate ] )

    return (
        <div className='main'>
            <Box>
                <Grid>
                    <Box className="intro__text">
                        <Box>
                            <h1 className='title'>Welcome to NoteEt</h1>
                            <p className='subtitle'>Let's make a library of notes</p>
                        </Box>
                        <Box className="button__cont">
                            <a href='/login'>
                                <Button variant="contained" className='btn_l'>Login</Button>
                            </a>
                            <a href='/register'>
                                <Button variant="outlined" className='btn_l'>Signup</Button>
                            </a>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </div>
    )
}

export default LandingPage