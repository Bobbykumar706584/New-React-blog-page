import React, { useState }from 'react';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add' 
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Form from './Form';

const useStyles = makeStyles((theme) => ({
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
    button: {
        position: "fixed",
        top: 85,

    },
    close:{
        float: "right",
    }
}));  

const Create = () => {
    const [open, setOpen] = useState(false)
    const classes = useStyles();

    const handleClick = () =>{
        setOpen(true)
    }
    const handleClose = () =>{
        setOpen(false)
    }

    return (
        <div>
            <Button onClick={handleClick}
                variant="contained"
                size="large"
                color="primary"
                className={classes.button}
                startIcon={<Add/>}
                >
                Add
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                
                <div className={classes.paper}>
                    <button className={classes.close} onClick={handleClose}>X</button>
                    <h2 id="simple-modal-title">Add blog</h2>
                    <hr/>
                    <Form />
                    <button onClick={handleClose}>Cancel</button>
                </div>
            </Modal>
        </div>
        
    )
}
export default Create;