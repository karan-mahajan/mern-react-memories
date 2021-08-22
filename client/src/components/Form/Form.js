import { React, useState, useEffect } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/actions';

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    // const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const posts = useSelector((state) => state.posts);
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: [],
        selectedFile: ''
    });

    useEffect(() => {
        if (currentId) {
            const post = posts.find((post) => post._id === currentId)
            setPostData(post);
        }
    }, [currentId, posts]);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     console.log(post)
    //     if (post) {
    //         setPostData(post);
    //     }
    // }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, postData))
        }
        else {
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6" style={{ marginBottom: '15px' }}>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField
                    style={{ marginBottom: '15px' }}
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField
                    style={{ marginBottom: '15px' }}
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField
                    style={{ marginBottom: '15px' }}
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    multiline
                    rows={4}
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField
                    style={{ marginBottom: '15px' }}
                    name="tags"
                    variant="outlined"
                    label="Tags (coma separated)"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput} style={{ marginBottom: '15px' }}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth style={{ marginBottom: '15px' }}>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper >
    )
}

export default Form
