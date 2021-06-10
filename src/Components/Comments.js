import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";


const Comments = ({ postId}) => {
    const [comments, setComments] = useState([])
    
    const getCommentDataById = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then((res) => res.json())
        .then((data) => {
           const newData =  data.filter(item => item.postId === postId)
           setComments(newData)
        })
    }

    useEffect(() => {
        getCommentDataById()
    }, [])

    const columns = [
        {
         name: "postId",
         label: "Comment id",
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
         name: "body",
         label: "body",
         options: {
          filter: true,
          sort: false,
         }
        }
    ]; 
  
    const options = {
        filterType: 'checkbox',
      };

    return (
        <div>
            <MUIDataTable
              data={comments}
              columns={columns}
              options={options}
            />
        </div>
    )
}

export default Comments;