import { FormControl, Grid, TextField, Paper, Button, Stack, FormGroup, Typography } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import MainScreen from "../../component/MainScreen";
import Loading from '../../component/Loading'
import ErrorMessage from '../../component/ErrorMessage'
import { createNoteAction } from '../../actions/notesActions'


function CreateNote () {

    const [ title, setTitle ] = useState( "" );
    const [ content, setContent ] = useState( "" );
    const [ category, setCategory ] = useState( "" );

    const dispatch = useDispatch();

    const noteCreate = useSelector( ( state ) => state.noteCreate );
    const { loading, error, note } = noteCreate;

    console.log( note );

    const resetHandler = () => {
        setTitle( "" );
        setCategory( "" );
        setContent( "" );
    };


    const paperStyle = { padding: '30px 20px', width: 1200, margin: "20px auto" }

    let navigate = useNavigate();
    const submitHandler = ( e ) => {

        e.preventDefault();
        dispatch( createNoteAction( title, content, category ) );
        if ( !title || !content || !category ) return;

        resetHandler();
        navigate( "/mynotes", { replace: true } )
    };

    useEffect( () => { }, [] );

    return (
        <MainScreen title="Create a Note">
            <Grid>
                <Paper elevation={ 20 } style={ paperStyle }>
                    <FormControl>
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
                            <Button type="submit" onClick={ submitHandler } variant="outlined" color="success">Create Note</Button>
                            <Button variant="outlined" color="error" onClick={ resetHandler }>Reset Fields</Button>
                        </Stack>
                    </FormControl>
                    <Typography className="text-muted">
                        <strong>Creating on - { new Date().toLocaleDateString() }</strong>
                    </Typography>
                </Paper>
            </Grid>
        </MainScreen>
    );
}

export default CreateNote;