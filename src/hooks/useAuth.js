const useAuth = () => {
    //will completed with the API integraiton 
    let isLoggedIn = window.sessionStorage.getItem("IsLoggedin");
    console.log("isLoggedIn",isLoggedIn);
    return isLoggedIn;
  };
  
  export default useAuth;