import React, { useState, useContext }from 'react';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add' 
import Modal from '@material-ui/core/Modal';
import Form from './Form';
import { PostContext } from '../context/PostContext';

const Create = () => {
    const [open, setOpen] = useState(false)
    const {classes} = useContext(PostContext)

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