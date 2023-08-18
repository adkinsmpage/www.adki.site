import { useState, useEffect } from 'react'
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

function App() {
    const [blogInfo, setBlogInfo] = useState({})
    const [loading, setLoading] = useState(false)
    
    useEffect(() => { document.title = "Adkimsm Blog" })

    useEffect(() => { 
        document.location.href.toString().search(/localhost/) !== -1 ? null : document.domain = 'adki.site';
        fetch('https://blog.adki.site/content.json')
            .then(res => res.json())
            .then(res => {
                setBlogInfo(res)
                setLoading(true)
            })
    }, [])

    useEffect(() => {
        console.log(blogInfo)
    }, [blogInfo])

    return (
        <Box>
            <nav aria-label="main mailbox folders">
                <List>
                    {
                       loading ? blogInfo.posts?.map((post, key) => {
                            return <Link href={blogInfo.meta.url + blogInfo.meta.root + post.path} underline="none" key={key}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={post.title} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        }) : <h1><Skeleton variant="rectangular" /></h1>
                    }
                </List>
            </nav>
        </Box>
    )
}

export default App
