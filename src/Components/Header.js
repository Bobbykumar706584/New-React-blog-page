import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Group from "@material-ui/icons/Group";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import Box from "@material-ui/core/Box";

import User from "./User";
import Post from "./Post";
import PostContextProvider from "../context/PostContext";

import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

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
			{value === index && <Box p={3}>{children}</Box>}
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
		"aria-controls": `scrollable-force-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function Header() {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

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
						<Tab
							label="Posts"
							icon={<PersonPinIcon />}
							{...a11yProps(1)}
						/>
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<User />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Post />
				</TabPanel>
			</PostContextProvider>
		</div>
	);
}
