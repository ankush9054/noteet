import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import MainScreen from '../../component/MainScreen'
import './ProfileScreen.css'
import Loading from "../../component/Loading";
import ErrorMessage from "../../component/ErrorMessage";

const ProfileScreen = () => {

    const [ name, setName ] = useState( "" );
    const [ email, setEmail ] = useState( "" );
    const [ pic, setPic ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ confirmPassword, setConfirmPassword ] = useState( "" );
    const [ picMessage, setPicMessage ] = useState( "" );

    const dispatch = useDispatch();

    const userLogin = useSelector( ( state ) => state.userLogin );
    const { userInfo } = userLogin;

    const userUpdate = useSelector( ( state ) => state.userUpdate );
    const { loading, error, success } = userUpdate;
    let navigate = useNavigate();

    useEffect( () => {
        if ( !userInfo ) {
            navigate( "/", { replace: true } )
        } else {
            setName( userInfo.name )
            setEmail( userInfo.email )
            setPic( userInfo.pic )
        }
    }, [ navigate, userInfo ] )



    const postDetails = ( pics ) => {
        setPicMessage( null );
        if ( pics.type === "image/jpeg" || pics.type === "image/png" ) {
            const data = new FormData();
            data.append( "file", pics );
            data.append( "upload_preset", "notezipper" );
            data.append( "cloud_name", "piyushproj" );
            fetch( "https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
                method: "post",
                body: data,
            } )
                .then( ( res ) => res.json() )
                .then( ( data ) => {
                    setPic( data.url.toString() );
                    console.log( pic );
                } )
                .catch( ( err ) => {
                    console.log( err );
                } );
        } else {
            return setPicMessage( "Please Select an Image" );
        }
    };

    const submitHandler = ( e ) => {
        e.preventDefault();

        dispatch( updateProfile( { name, email, password, pic } ) );
    };


    return (
        <MainScreen title="EDIT PROFILE">
            <div className="row">
                <div className="column">
                    <form>
                        { loading && <Loading /> }
                        { success && (
                            <ErrorMessage variant="success">
                                Updated Successfully
                            </ErrorMessage>
                        ) }
                        { error && <ErrorMessage variant="danger">{ error }</ErrorMessage> }
                        <div className="form-inner">
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="email" value={ name } onChange={ ( e ) => setName( e.target.value ) } />
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
                                <label htmlFor="password">ConfirmPassword:</label>
                                <input type="password" value={ confirmPassword } onChange={ ( e ) => setConfirmPassword( e.target.value ) } />
                            </div>

                            <div className="form-group">
                                <input type="file" value={ picMessage } onChange={ ( e ) => setPicMessage( e.target.value ) } />
                            </div>
                            <input type="submit" value="Update" onChange={ ( e ) => postDetails( e.target.files[ 0 ] ) } onClick={ submitHandler } />
                        </div>
                    </form>
                </div>
                <div className="column">
                    <img src={ pic } alt={ name } className="user-image" />
                </div>
            </div>
        </MainScreen>
    )
}

export default ProfileScreen