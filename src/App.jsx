import { useState, useEffect } from 'react'
import './App.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {
  const [blogInfo, setBlogInfo] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    //document.domain = 'adki.site'
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
    <>
      <h1>{blogInfo?.meta?.title}</h1>

      <div className="card">
        {
          blogInfo.posts?.map((post, key) => {
            return <Card variant="outlined" sx={{ minWidth: 275, marginBottom: "20px" }} key={key} >
              <CardContent>
                <Typography variant="h5" component="div" sx={{marginBottom: "10px"}}>
                  {post.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {post.categories.map((cate, i) => cate.name+"")} | {post.tags.map((tag, i) => i+1 != post.tags.length ? tag.name+" · " : tag.name)}
                </Typography>
                <Typography variant="body2">
                  {post.excerpt}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={blogInfo.meta.url + blogInfo.meta.root + post.path}>Learn More</Button>
              </CardActions>
            </Card>
          })
        }
      </div>
    </> : <h1>Loading......</h1>
  )
}

export default App
