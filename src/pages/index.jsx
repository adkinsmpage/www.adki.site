import { useEffect } from 'react';
import '../styles/App.css'
import Typography from '@mui/material/Typography';

function App() {
    useEffect(() => { document.title = "Adkimsm Home" })

    return (
        <>
            <h1 style={{display: 'none'}}>Adkimsm</h1>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Hello,<br />I'm <mark className='hSqPQ'>Adkimsm</mark>
            </Typography>
            <Typography variant="subtitle1" gutterBottom>Front-end Developer / Open Sourceror / Blogger / Android Player</Typography>
            <Typography variant="subtitle2" gutterBottom>A  Student from China</Typography>
        </>
    )
}

export default App
