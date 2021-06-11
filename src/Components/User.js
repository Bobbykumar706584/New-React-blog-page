import { useContext, useState } from "react";
import MUIDataTable from "mui-datatables";

import Modal from '@material-ui/core/Modal';

import SinglePost from './SinglePost';
import { PostContext } from "../context/PostContext";


const User = () =>{
    const {classes, users, posts} = useContext(PostContext)
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
            <SinglePost id={id} username={username}/>
          </div>
        </Modal>
      </div>
   );
}

export default User;
