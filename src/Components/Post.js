import React, {useState, useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";

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
            setItems(mergeById(posts, users))
    }
    //deleting users
    const handleDelete = (item, index) =>{
        snackSetOpen(true)
        console.log(item[index])
        
        fetch("https://jsonplaceholder.typicode.com/posts/"+item[index].id, {
			method: "DELETE",
		})
		.then(() => {
			history.push('/')
		})
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllDataById()
    }, [])

    const columns = [
        {
         name: "username",
         label: "Username",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "id",
         label: "ID",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "title",
         label: "Title",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "body",
         label: "Body",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
            name: "Delete",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRenderLite: (rowIndex) => {
                    return (
                        <button onClick={() => {handleDelete(items, rowIndex)}}>
                            Delete 
                        </button>
                    );
                }
            }
          },
          {
            name: "Edit",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <button onClick={() => {handleClick(tableMeta.rowData[1])}}>
                            Edit
                        </button>
                    );
                }
            }
          }
    ]; 


    const options = {
        filterType: 'checkbox',
        selectableRows:'single',
        selectableRowsOnClick: true,
    };
    return(
        <div className="container">
            <MUIDataTable
              data={items}
              columns={columns}
              options={options}
            />
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