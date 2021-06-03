import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';

import SinglePost from './SinglePost';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paper: {
    position: 'relative',
    width: 700,
    top: 200,
    left: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: 'auto',
    height: '70vh'
},
close:{
  float: "right",
}
}));

const User = ({users, posts}) =>{
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
    const [username, setUsername] = useState('')

    const handleClick = () => {
      setOpen(true)
    }
    const handleClose = () => {
      setOpen(false)
    }

    const openRow = (id, username) => {
      handleClick()
      setUsername(username)
      setId(id)
    }

    return (
      <div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Website</TableCell>
            <TableCell>Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} onClick={() => openRow(user.id, user.username)}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.website}</TableCell>
              <TableCell>{user.company.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
    <Modal
      open={open}
      onClose={handleClose}
      >
      <div className={classes.paper}>
        <button className={classes.close} onClick={handleClose}>X</button>
        <SinglePost posts={posts} id={id} username={username}/>
      </div>
  </Modal>
  </div>
   );
}

export default User;
