import { useEffect } from 'react';
import '../styles/App.css'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function App() {
    useEffect(() => { document.title = "Adkimsm Home" })

    return (
        <Stack spacing={2}>
            <h1 style={{ display: 'none' }}>Adkimsm</h1>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Hello,<br />I'm <mark className='hSqPQ'>Adkimsm</mark>
            </Typography>
            <Typography variant="subtitle1" gutterBottom>Front-end Developer / Open Sourceror / Blogger / Android Player</Typography>
            <Typography variant="subtitle2" gutterBottom>A Student from China</Typography>
            <Stack spacing={2} direction="row" >
                <Button variant="contained" href="https://blog.adki.site">Blog</Button>
                <Button variant="outlined" href="https://github.com/Adkimsm">GitHub</Button>
            </Stack>
        </Stack>
    )
}

export default App
