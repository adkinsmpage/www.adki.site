import { useState, useEffect } from 'react'
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function App() {
    const [blogInfo, setBlogInfo] = useState({})
    const [loading, setLoading] = useState(false)
    
    useEffect(() => { document.title = "Adkimsm Blog" })

    useEffect(() => { 
        document.location.href.toString().test(/localhost/) ? null : document.domain = 'adki.site';
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

    return (loading ?
        <Box>
            <nav aria-label="main mailbox folders">
                <List>
                    {
                        blogInfo.posts?.map((post, key) => {
                            return <Link href={blogInfo.meta.url + blogInfo.meta.root + post.path} underline="none" key={key}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={post.title} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        })
                    }
                </List>
            </nav>
        </Box> : <h1>Loading......</h1>
    )
}

export default App
