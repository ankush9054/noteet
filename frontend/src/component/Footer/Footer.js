import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function Footer () {
    return (
        <div style={ { backgroundColor: '#59637e' } }>
            <footer
                style={ {
                    width: '100%',
                    position: 'relative',
                    bottom: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#59637e',
                } }
            >
                <Grid>
                    <Grid item xs={ 8 }>
                        <Paper>Copyright &copy; NoteEt</Paper>
                    </Grid>
                </Grid>
            </footer>
        </div>
    )
}

export default Footer