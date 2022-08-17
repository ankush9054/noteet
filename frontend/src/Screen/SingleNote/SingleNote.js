import { FormControl, Grid, TextField, Paper, Button, Stack, FormGroup, Typography } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import MainScreen from "../../component/MainScreen";
import Loading from '../../component/Loading'
import ErrorMessage from '../../component/ErrorMessage'
import { updateNoteAction, deleteNoteAction } from '../../actions/notesActions'
import axios from 'axios'


function SingleNote () {

    const { id } = useParams();

    const [ title, setTitle ] = useState( "" );
    const [ content, setContent ] = useState( "" );
    const [ category, setCategory ] = useState( "" );
    const [ date, setDate ] = useState( "" );

    const dispatch = useDispatch();

    const noteUpdate = useSelector( ( state ) => state.noteUpdate );
    const { loading, error } = noteUpdate;


    const paperStyle = { padding: '30px 20px', width: 1200, margin: "20px auto" }

    let navigate = useNavigate();
    const updateHandler = ( e ) => {

        e.preventDefault();
        dispatch( updateNoteAction( id, title, content, category ) );
        if ( !title || !content || !category ) return;

        resetHandler();
        navigate( "/mynotes", { replace: true } )
    };

    const noteDelete = useSelector( ( state ) => state.noteDelete );
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

    const DeleteHandler = ( id ) => {
        if ( window.confirm( "Are you sure?" ) ) {
            dispatch( deleteNoteAction( id ) );
        }
        navigate( "/mynotes", { replace: true } )
    };

    useEffect( () => {
        const fetching = async () => {
            const { data } = await axios.get( `/api/notes/${id}` );

            setTitle( data.title );
            setContent( data.content );
            setCategory( data.category );
            setDate( data.updatedAt );
        };

        fetching();
    }, [ id, date ] );

    const resetHandler = () => {
        setTitle( "" );
        setCategory( "" );
        setContent( "" );
    };

    return (
        <MainScreen title="Edit a Note">
            <Grid>
                <Paper elevation={ 20 } style={ paperStyle }>
                    <FormControl>
                        { loadingDelete && <Loading /> }
                        { errorDelete && (
                            <ErrorMessage variant='danger'>{ errorDelete }</ErrorMessage>
                        ) }
                        { error && <ErrorMessage variant="danger">{ error }</ErrorMessage> }

                        <FormGroup>
                            <TextField label="Title" type='text' value={ title } onChange={ ( e ) => setTitle( e.target.value ) }
                                placeholder="Enter the title" />
                            <br />
                        </FormGroup>


                        <TextField label="Content" type='text' value={ content }
                            placeholder="Enter the content"
                            rows={ 4 }
                            onChange={ ( e ) => setContent( e.target.value ) } />
                        <br />

                        <TextField label="Category" type="text"
                            value={ category }
                            placeholder="Enter the Category"
                            onChange={ ( e ) => setCategory( e.target.value ) } />
                        <br />

                        { loading && <Loading size={ 50 } /> }
                        <Stack direction="row" spacing={ 2 }>
                            <Button type="submit" onClick={ updateHandler } variant="outlined" color="success">Update Note</Button>
                            <Button variant="outlined" color="error" onClick={ () => DeleteHandler( id ) }>Delete note</Button>
                        </Stack>
                    </FormControl>
                    <Typography className="text-muted">
                        <strong>Updated on - { date.substring( 0, 10 ) }</strong>
                    </Typography>
                </Paper>
            </Grid>
        </MainScreen>
    );
}

export default SingleNote;