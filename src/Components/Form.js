import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { PostContext } from '../context/PostContext';

const Form = ()=> {
    const {
        users, 
        title, 
        setTitle, 
        body, 
        setBody, 
        username, 
        setUsername, 
        history, 
        isPending, 
        setIsPending,
        open,
        handleClose,
        handleOpen
        } = useContext(PostContext)
    
    function Alert(props) {
        return <MuiAlert elevation={4} variant="filled" {...props} />;
    }  

    const handleSubmit = () => {
        const blog = {title, body, username}
        setIsPending(true)
        
        fetch("http://localhost:8000/blogs", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        })
        .then(() => {
            setIsPending(false)
            history.push('/')
        })
    }

    return(
        <form onSubmit={handleSubmit} className="create">
            <label>Blog title: </label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label>Blog body: </label>
                <textarea required value={body} onChange={(e) => setBody(e.target.value)}> </textarea>
                <label>Blog Username: </label>
                <select value={username} onChange={(e) => setUsername(e.target.value)}>
                    <option>Select</option>
                    {users.map(item => (
                        <option value={item.username} required id={item.id}>{item.username}</option>
                    ))}
                </select>
                {!isPending && (<button onClick={handleOpen}>Add blog</button>) }
                {isPending && (<button>Adding blog</button>) }

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert severity="success">
                        Post added successfully.
                    </Alert>
                </Snackbar>
        </form>
    )
}

export default Form;