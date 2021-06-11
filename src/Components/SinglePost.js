import MUIDataTable from "mui-datatables";
import { useContext } from "react";

import { useEffect, useState } from "react";
import { PostContext } from "../context/PostContext";

const SinglePost = ({id, username}) => {
    const {posts} = useContext(PostContext);
    const [singlePost, setSinglePost] = useState([])

    const showRowbyUser = () => {
        const post = posts.filter(item => item.userId === id)
        setSinglePost(post)
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
         name: "title",
         label: "Title",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "body",
         label: "Body",
         options: {
          filter: true,
          sort: false,
         }
        }
    ];

    const options = {
        filterType: 'checkbox',
    };

    useEffect(() => {
        showRowbyUser()
    }, [posts])

    return (
        <MUIDataTable
          title={username}
          data={singlePost}
          columns={columns}
          options={options}
        />
    )
}

export default SinglePost;