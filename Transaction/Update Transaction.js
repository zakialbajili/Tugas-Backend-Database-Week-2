const updatePost = async (e) => {
    e.preventDefault();
    
    //send data to server
    await axios.patch(`http://localhost:3000/api/posts/update/${id}`, {
        title: title,
        content: content
    })
    .then(() => {

        //redirect
        history.push('/posts');

    })
    .catch((error) => {

        //assign validation on state
        setValidation(error.response.data);
    })
    
};
