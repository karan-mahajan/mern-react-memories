import './App.css';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import memories from './images/memories.png'
import Form from './components/Form/Form'
import Posts from './components/Posts/PostsContainer';
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getPosts } from './actions/actions'

function App() {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("App.jss", currentId);
    const getAllPosts = async () => {
      dispatch(getPosts());
    }
    getAllPosts();
  }, [dispatch, currentId]);

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memories} alt='memories' height='60' />
      </AppBar>
      <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
