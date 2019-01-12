export default error => {
    return {
        title: 'An error occured!',
        message: error.response ? error.response.data : "Network or server error!",
        backgroundColor: "red"
    }
}