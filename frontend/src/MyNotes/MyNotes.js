import React, { useEffect } from 'react'
import MainScreen from '../component/MainScreen';
import { Link, useNavigate, Navigate } from "react-router-dom";
import './Mynotes.css';
import { Card, Button, Box, CardContent, Badge, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux'
import { deleteNoteAction, listNotes } from "../actions/notesActions";
import Loading from "../component/Loading";
import ErrorMessage from "../component/ErrorMessage";

function MyNotes ( { search } ) {

    const dispatch = useDispatch();
    const noteList = useSelector( state => state.noteList )
    const { loading, notes, error } = noteList;

    const userLogin = useSelector( ( state ) => state.userLogin );
    const { userInfo } = userLogin;

    const noteCreate = useSelector( ( state ) => state.noteCreate );
    const { success: successCreate } = noteCreate;

    const noteUpdate = useSelector( ( state ) => state.noteUpdate );
    const { success: successUpdate } = noteUpdate;

    const noteDelete = useSelector( ( state ) => state.noteDelete );
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;
    let navigate = useNavigate();

    useEffect( () => {
        dispatch( listNotes() )
        if ( !userInfo ) {
            navigate( "./", { replace: true } )
        }
    }, [ dispatch, navigate, successCreate, userInfo, successUpdate, noteDelete ] )

    const deleteHandler = ( id ) => {
        if ( window.confirm( 'Are you sure you want to delete?' ) ) {
            dispatch( deleteNoteAction( id ) )
        }
    }
    return (
        <Box className="tit">
            <MainScreen title={ `Welcome back ${userInfo.name}...` }>
                <Link to="createnote">
                    <Button variant="contained" style={ { marginLeft: 10, marginTop: 40 } }>
                        Create new Note
                    </Button>
                </Link>
                { errorDelete && (
                    <ErrorMessage variant='danger'>{ errorDelete }</ErrorMessage>
                ) }
                { loadingDelete && <Loading /> }
                { error && <ErrorMessage variant="danger" >{ error }</ErrorMessage> }
                { loading && <Loading /> }

                {
                    notes?.reverse().filter(filteredNote => (
                        filteredNote.title.toLowerCase().includes(search.toLowerCase())
                    )) .map( note => (
                        <Card key={ note._id } style={ { margin: 100, backgroundColor: "#282c42" } }>
                            <Accordion style={ { margin: 100, backgroundColor: "#282c42" } }>
                                <div style={ { display: 'flex', backgroundColor: "#5b384c" } }>
                                    <AccordionSummary
                                        expandIcon={ <ExpandMoreIcon /> }
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                        <Typography
                                            style={ {
                                                color: 'white',
                                                textDecoration: 'none',
                                                flex: 1,
                                                cursor: 'pointer',
                                                alignSelf: 'center',
                                                fontSize: 18,
                                                marginLeft: 80,
                                            } }
                                        >{ note.title }</Typography>
                                    </AccordionSummary>


                                    <Box>
                                        <Button href={ `/note/${note._id}` } variant="contained" color="success">
                                            Edit
                                        </Button>
                                        <Button variant="outlined" color="error" onClick={ () => deleteHandler( note._id ) }>
                                            Delete
                                        </Button>
                                    </Box>
                                </div>
                                <AccordionDetails>
                                    <CardContent>


                                        <h4>
                                            <Badge style={ { marginLeft: '30px' } } badgeContent={ note.category } color='primary'>

                                            </Badge>
                                        </h4>

                                        <Box style={ { color: 'white' } }>

                                            <p>{ note.content }</p>
                                            <footer className='blockquote-footer'>
                                                Created on { " " }
                                                <cite title='Source title'>
                                                    { note.createdAt.substring( 0, 10 ) }
                                                </cite>
                                            </footer>
                                        </Box>
                                    </CardContent>
                                </AccordionDetails>
                            </Accordion>
                        </Card>
                    ) )
                }
            </MainScreen>
        </Box >
    )
}

export default MyNotes