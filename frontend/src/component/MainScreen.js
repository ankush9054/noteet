import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function MainScreen ( { title, children } ) {
    return (
        <div className="main__screen">
            <Box>
                <Grid>
                    <div className="page">{
                        title && ( <>
                            <h1 className="heading">{ title }</h1>
                            <hr />
                        </>
                        ) }
                        { children }
                    </div>
                </Grid>
            </Box>
        </div>
    )
}

export default MainScreen