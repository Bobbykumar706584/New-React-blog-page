import React, {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Create from './Create';
import Update from './Update';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
        marginTop: "30px",
        border: "1px solid #eee",
        justifyContent: 'center'
    },
    container:{
        marginTop: '30px'
    },
    paper: {
        position: 'relative',
        width: 700,
        top: 250,
        left: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    close:{
        float: "right",
    }
  }));


const Post = ({posts, users}) => {
    const classes = useStyles();
	const history = useHistory();
    const [open, setOpen] = useState(false)
    const [postId, setPostId] = useState(null)
    const [snackOpen, snackSetOpen] = useState(false);
    const [items, setItems] = useState([])

    const handleClick = (id) =>{
        setOpen(true)
        setPostId(id)
    }

    const handleClose = () =>{
        setOpen(false)
    }
    
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        snackSetOpen(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={4} variant="filled" {...props} />;
    } 

    const getAllDataById = () => {
        const mergeById = (a2, a1) =>
            a2.map(itm => ({
                ...a1.find((item) => (item.id === itm.userId)),
                ...itm
            }));

            // console.log(mergeById(responseTwo, responseOne))
            setItems(mergeById(posts, users))
    
    }
    //fetching all the users
    // const fetchUserData = (e) =>{
    //     fetch("http://localhost:8000/blogs/")
    //     .then((res) => res.json())
    //     .then((data) => setPosts(data))
    //     .catch((err) =>{
    //         console.log(err)
    //     })
    // }

    //deleting users
    const handleDelete = (id) =>{
        snackSetOpen(true)
        fetch("http://localhost:8000/blogs/"+id, {
			method: "DELETE",
		})
		.then(() => {
			history.push('/')
            window.location.reload();
		})
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllDataById()
    }, [])
    
    return(
        <div className="container">
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Id</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Body</TableCell>
                            <TableCell>Delete</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(post =>(
                            <TableRow key={post.id}>
                                <TableCell component="th" scope="row">
                                    {post.username}
                                </TableCell>
                                <TableCell>{post.id}</TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.body}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="secondary" onClick={() => {handleDelete(post.id)}}>Delete</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => {handleClick(post.id)}}>Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert severity="success">
                    Post deleted successfully.
                </Alert>
            </Snackbar>
            <Create />
            <Modal
                open={open}
                onClose={handleClose}
                >
                
                <div className={classes.paper}>
                    <button className={classes.close} onClick={handleClose}>X</button>
                    <h2 id="simple-modal-title">Update blog</h2>
                    <hr/>
                    <Update postId={postId} users={users} posts={posts}/>
                    <button onClick={handleClose}>Cancel</button>
                </div>
            </Modal>
        </div>
    );
}
export default Post;