import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import dayjs from 'dayjs'

const BoxC = styled('div')(({ theme }) => ({
    boxSizng: 'border-box',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    margin: theme.spacing(1),
    width: 'auto',
}));

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
        <Box sx={{padding: '2rem'}}>
            {
                loading ? blogInfo.posts?.map((post, key) => {
                    return <BoxC key={key}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {dayjs(post.date).format("YYYY-MM-DD")}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {post.title}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {post.categories[0].name}
                                </Typography>
                                <Typography variant="body2">
                                    {post.excerpt}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button href={blogInfo.meta.url + blogInfo.meta.root + post.path} size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </BoxC>
                }) : <h1><Skeleton variant="rectangular" /></h1>
            }
        </Box>
    )
}

export default App
