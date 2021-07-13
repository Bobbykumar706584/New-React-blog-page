import React, { useState, useEffect, useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Modal from "@material-ui/core/Modal";
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import Create from "./Create";
import Update from "./Update";
import Comments from "./Comments";
import { PostContext } from "../context/PostContext";

const Post = () => {
	const { classes, posts, users } = useContext(PostContext);
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const [postId, setPostId] = useState(null);
	const [snackOpen, snackSetOpen] = useState(false);
	const [items, setItems] = useState([]);
	const [openRow, setOpenRow] = useState(false);

	const handleClick = (e, id) => {
		setOpen(true);
		setPostId(id);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const rowClick = (id) => {
		setOpenRow(true);
		setPostId(id);
	};

	const rowClose = () => {
		setOpenRow(false);
	};

	const handleCloseSnack = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		snackSetOpen(false);
	};

	function Alert(props) {
		return <MuiAlert elevation={4} variant="filled" {...props} />;
	}

	//deleting users
	const handleDelete = (e, item, index) => {
		snackSetOpen(true);
		fetch("https://jsonplaceholder.typicode.com/posts/" + item[index].id, {
			method: "DELETE",
		})
			.then(() => {
				history.push("/");
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		///finding by id from two array of object
		const getAllDataById = () => {
			const mergeById = (a2, a1) =>
				a2.map((itm) => ({
					...a1.find((item) => item.id === itm.userId),
					...itm,
				}));
			setItems(mergeById(posts, users));
		};
		getAllDataById();
	}, [posts, users]);

	const columns = [
		{
			name: "username",
			label: "Username",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "id",
			label: "ID",
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			name: "title",
			label: "Title",
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			name: "body",
			label: "Body",
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			name: "Delete",
			options: {
				filter: true,
				sort: false,
				empty: true,
				customBodyRenderLite: (rowIndex) => {
					return (
						<button
							onClick={(e) => {
								handleDelete(
									e.stopPropagation(),
									items,
									rowIndex
								);
							}}
						>
							Delete
						</button>
					);
				},
			},
		},
		{
			name: "Edit",
			options: {
				filter: true,
				sort: false,
				empty: true,
				customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<button
							onClick={(e) => {
								handleClick(
									e.stopPropagation(),
									tableMeta.rowData[1]
								);
							}}
						>
							{/* // <button onClick={(e) => { console.log(e)}}> */}
							Edit
						</button>
					);
				},
			},
		},
	];

	const handleRowClick = (rowData, e) => {
		rowClick(rowData[1]);
	};
	const options = {
		filterType: "checkbox",
		onRowClick: handleRowClick,
	};
	return (
		<div className="container">
			<MUIDataTable data={items} columns={columns} options={options} />
			<Snackbar
				open={snackOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnack}
			>
				<Alert severity="success">Post deleted successfully.</Alert>
			</Snackbar>
			<Create />
			<Modal open={open} onClose={handleClose}>
				<div className={classes.paper}>
					<button className={classes.close} onClick={handleClose}>
						X
					</button>
					<h2 id="simple-modal-title">Update blog</h2>
					<hr />
					<Update postId={postId} />
					<button onClick={handleClose}>Cancel</button>
				</div>
			</Modal>
			<Modal open={openRow} onClose={rowClose}>
				<div className={classes.paper}>
					<button className={classes.close} onClick={rowClose}>
						X
					</button>
					<h2 id="simple-modal-title">Comments of user</h2>
					<Comments postId={postId} />
				</div>
			</Modal>
		</div>
	);
};
export default Post;
