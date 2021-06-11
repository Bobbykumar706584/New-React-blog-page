import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useState, useEffect, useContext } from "react"
import { PostContext } from '../context/PostContext';

const Update = ({postId}) => {
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
        handleOpen} = useContext(PostContext)
        
    const [id, setId ] = useState('')

    function Alert(props) {
        return <MuiAlert elevation={4} variant="filled" {...props} />;
    }

    //Update handler for form
    const handleUpdate = () => {
        setIsPending(true)
        const data = {title, body, username}

        fetch("https://jsonplaceholder.typicode.com/posts/" + postId, {
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
        fetch("https://jsonplaceholder.typicode.com/posts/"+postId)
        .then(res => res.json())
        .then(data => {
            setTitle(data.title)
            setBody(data.body)
            setUsername(data.username)
            setId(data.id)
        }, [])
   }, [id])

    return (
        <form className='update' onSubmit={handleUpdate}>
            <label>Blog title: </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <label>Blog body: </label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)}> </textarea>
            <label>Blog username: </label>
             <select value={username} onChange={(e) => setUsername(e.target.value)}>
                 <option>Select</option>
                {users.map(item => (
                    <option value={item.username}>{item.username}</option>
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