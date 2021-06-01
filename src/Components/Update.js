import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

const Update = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("");
    const [usernames, setUsernames] = useState([])
    const [username, setUsername] = useState("")
    const history = useHistory()
    const [isPending, setIsPending] = useState(false);
    const [post, setPosts] = useState([])
    const [open, setOpen] = useState(false);

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
    
    const getById = () => {
        fetch("http://localhost:8000/blogs/")
        .then((res) => res.json())
        .then((datas) => setUsernames(datas)) 
    }
     
    //Update handler for form
    const handleUpdate = (e) => {
        e.preventDefault()
        setIsPending(true)
        const data = {title, body, username}
        console.log(data, "data")
        fetch("http://localhost:8000/blogs/", {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        })
        .then(() => {
            setIsPending(false)
            history.push('/')
        })
   }



   useEffect(() => {
    getById()
   }, [])

    return (
        <form className='update' onSubmit={handleUpdate}>
            <label>Blog title: </label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
            <label>Blog body: </label>
            <textarea required value={body} onChange={(e) => setBody(e.target.value)}> </textarea>
            <label>Blog username: </label>
            <select onChange={(e) => setUsername(e.target.value)}>
                {usernames.map(item => (
                    <option value={item.username} id={item.id}>{item.username}</option>
                ))}
            </select>
            { !isPending && (<button onClick={handleOpen}>Update blog</button>) }
            { isPending && (<button>Updating blog</button>) }

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="success">
                    Post updated successfully. 
                </Alert>
            </Snackbar>
        </form>    
    )
}
export default Update