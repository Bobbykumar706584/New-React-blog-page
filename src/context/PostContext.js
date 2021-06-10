import { useState, useEffect } from "react";
import { createContext } from "react";
import { makeStyles } from '@material-ui/core/styles';



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

    const [items, setItems] = useState([])

    return (
        <PostContext.Provider value={{classes}}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;