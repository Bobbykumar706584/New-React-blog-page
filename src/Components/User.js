import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";

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

    const handleClick = (id, username) => {
      setOpen(true)
      setId(id)
      setUsername(username)
    }
    const handleClose = () => {
      setOpen(false)
    }

    const columns = [
      {
       name: "id",
       label: "Post id",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "name",
       label: "Name",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
       name: "username",
       label: "Username",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
       name: "email",
       label: "Email",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
       name: "website",
       label: "Website",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
       name: "company",
       label: "Company",
       options: {
        filter: true,
        sort: false,
       }
      }
  ]; 

    const handleRowClick = (rowData) => {
      handleClick(rowData[0], rowData[2])
      console.log(rowData)
  };

    const options = {
      filterType: 'checkbox',
      onRowClick: handleRowClick,
    };
    return (
      <div>
        <MUIDataTable
              title={username}
              data={users}
              columns={columns}
              options={options}
            />
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
