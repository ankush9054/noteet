import React, { useState, useEffect } from 'react'
import MainScreen from '../../component/MainScreen'
import { Grid } from '@mui/material'
import Loading from '../../component/Loading';
import ErrorMessage from '../../component/ErrorMessage';
import { Navigate, useNavigate ,Link } from "react-router-dom";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from 'react-redux';


function RegisterScreen () {

    const [ email, setEmail ] = useState( "" );
    const [ name, setName ] = useState( "" );
    const [ pic, setPic ] = useState(
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png"
    );
    const [ password, setPassword ] = useState( "" );
    const [ confirmpassword, setConfirmPassword ] = useState( "" );
    const [ message, setMessage ] = useState( null );
    const [ picMessage, setPicMessage ] = useState( null );

    let navigate = useNavigate();



    const dispatch = useDispatch();

    const userRegister = useSelector( ( state ) => state.userRegister );
    const { loading, error, userInfo } = userRegister;

    const postDetails = ( pics ) => {
        if ( !pics ) {
            return setPicMessage( "Please select an Image" )
        }
        setPicMessage( null );

        if ( pics.type === "image/jpeg" || pics.type === "image/png" ) {
            const data = new FormData();
            data.append( "file", pics )
            data.append( 'upload_preset', 'noteet' )
            data.append( 'cloud_name', 'dspmd6qp8' )
            fetch( "https://api.cloudinary.com/v1_1/dspmd6qp8/image/upload", {
                method: "post",
                body: data,
            } ).then( ( res ) => res.json() )
                .then( ( data ) => {
                    setPic( data.url.toString() );
                } )
                .catch( ( err ) => {
                    console.log( err );
                } );
        } else {
            return setPicMessage( "Please Select an Image" );
        }
    };

    useEffect( () => {
        if ( userInfo ) {
            navigate( "./mynotes", { replace: true } )
        }
    }, [ Navigate, userInfo ] );


    const submitHandler = ( e ) => {
        e.preventDefault();

        if ( password !== confirmpassword ) {
            setMessage( "Passwords do not match" );
        } else dispatch( register( name, email, password, pic ) );
    };


    return (
        <MainScreen title="REGISTER" >
            { error && <ErrorMessage variant="danger">{ error }</ErrorMessage> }
            { message && <ErrorMessage variant="danger">{ message }</ErrorMessage> }
            { loading && <Loading /> }
            <form onSubmit={ submitHandler }>
                <div className="form-inner">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" value={ name } onChange={ ( e ) => setName( e.target.value ) } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Email:</label>
                        <input type="email" value={ email } onChange={ ( e ) => setEmail( e.target.value ) } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" value={ password } onChange={ ( e ) => setPassword( e.target.value ) } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Confirm Password:</label>
                        <input type="password" value={ confirmpassword } onChange={ ( e ) => setConfirmPassword( e.target.value ) } />
                    </div>

                    { picMessage && ( <ErrorMessage variant="danger">{ picMessage }</ErrorMessage> ) }
                    <div className="form-group">
                        <label htmlFor="password">Profile Picture</label>
                        <input type="file" onChange={ ( e ) => postDetails( e.target.files[ 0 ] ) } />
                    </div>
                    <input type="submit" value="Register" />
                    <Grid>
                        Have an account ? <Link to="/login" className="register">Login</Link>
                    </Grid>
                </div>
            </form>
        </MainScreen>
    )
}

export default RegisterScreen