import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MainScreen from '../../component/MainScreen'
import './LoginScreen.css'
import Loading from '../../component/Loading'
import ErrorMessage from '../../component/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../../actions/userActions";


function LoginScreen () {

    const [ email, setEmail ] = useState( "" )
    const [ password, setPassword ] = useState( "" )

    const dispatch = useDispatch();

    const userLogin = useSelector( ( state ) => state.userLogin );
    const { loading, error, userInfo } = userLogin;

    let navigate = useNavigate();

    useEffect( () => {
        if ( userInfo ) {
            navigate( "./mynotes", { replace: true } )
        }
    }, [ Navigate, userInfo ] );


    const submitHandler = async ( e ) => {
        e.preventDefault();
        dispatch( login( email, password ) );
    };

    return (
        <MainScreen title="LOGIN"   >
            <Box style={ { marginBottom: "20%" } }>
                { error && <ErrorMessage>{ error }</ErrorMessage> }
                { loading && <Loading /> }
                <form onSubmit={ submitHandler }>
                    <div className="form-inner">
                        <div className="form-group">
                            <label htmlFor="name">Email:</label>
                            <input type="email" value={ email } onChange={ ( e ) => setEmail( e.target.value ) } />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" value={ password } onChange={ ( e ) => setPassword( e.target.value ) } />
                        </div>
                        <input type="submit" value="login" />
                        <Grid>
                            New Customer ? <Link to="/register" className="register">Register Now</Link>
                        </Grid>
                    </div>
                </form>
            </Box>

        </MainScreen>
    )
}

export default LoginScreen