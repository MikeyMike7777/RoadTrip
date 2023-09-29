function logout(){
    sessionStorage.setItem("curEmail", "");
    sessionStorage.setItem("curF", "");
    sessionStorage.setItem("curL", "");
    sessionStorage.setItem("curPhone", "");
    sessionStorage.setItem("curPassword", "");
    window.location.pathname = "/login"
}

function checkStatus(){

    if (typeof window !== 'undefined') {
        let email = sessionStorage.getItem("curEmail");

        if (email === "") {
            return false;
        }
    }

    return true;
}

export {logout, checkStatus}