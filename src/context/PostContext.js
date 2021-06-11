import { useState, useEffect } from "react";
import { createContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom"



export const PostContext = createContext();

const useStyles = makeStyles((theme) => ({
    paper: {
    position: 'relative',
    width: 700,
    top: 75,
    left: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: 'auto',
    maxHeight: '80%'
    },
    button: {
        position: "fixed",
        top: 85,

    },
    close:{
        float: "right",
    }
}));  

const PostContextProvider = (props) => {
    const classes = useStyles();
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("");
    const [username, setUsername] = useState("")
    const history = useHistory()
    const [isPending, setIsPending] = useState(false);
    const [open, setOpen] = useState(false);


    const getAllPostDetails = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((responses) => responses.json())
        .then(data => {
          setPosts(data)
        })
        .catch(err => {
          console.error(err)
        })
      }
    
      const getAllTheUsers = () =>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((result) => {
          const showUser = result.map(user => {
            user.company = user.company.name
            return user
          })
          setUsers(showUser)      
        })
      }

      const handleOpen = () => {
        setOpen(true);
      };

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
      };
    
      useEffect(() => {
        getAllPostDetails()
        getAllTheUsers()      
    
      }, [])

    return (
        <PostContext.Provider value={{
              classes, 
              users, 
              posts,
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
              handleOpen,
              handleClose
              }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;