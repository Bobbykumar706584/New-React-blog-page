import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Group from '@material-ui/icons/Group';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import User from './User';
import Post from './Post';
import PostContextProvider from '../context/PostContext';

import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Header() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  useEffect(() => {
    getAllPostDetails()
    getAllTheUsers()      

  }, [])

  return (
    <div className={classes.root}>
      <PostContextProvider>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
              <Tab label="Users" icon={<Group />} {...a11yProps(0)} />
            <Tab label="Posts" icon={<PersonPinIcon />} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <User users={users} posts={posts}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Post posts={posts} users={users}/>
        </TabPanel>
      </PostContextProvider>  
    </div>
  );
}
