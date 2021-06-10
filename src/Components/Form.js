import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Form = ()=> {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [usernames, setUsernames] = useState([])
    const [username, setUsername] = useState('')
    const history = useHistory() 
    const [open, setOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={4} variant="filled" {...props} />;
    }  

    const getAllUser = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => {
            setUsernames(data)
        })
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

    useEffect(() => {
        getAllUser()
    }, [])

    return(
        <form onSubmit={handleSubmit} className="create">
            <label>Blog title: </label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label>Blog body: </label>
                <textarea required value={body} onChange={(e) => setBody(e.target.value)}> </textarea>
                <label>Blog Username: </label>
                <select value={username} onChange={(e) => setUsername(e.target.value)}>
                    {usernames.map(item => (
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