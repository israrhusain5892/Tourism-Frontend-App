 
 
 export function isLogin(){
      const user=localStorage.getItem("data");
      if(user!=null){
        return true;
      }
      return false;
}

export function doLogin(data,next){
     localStorage.setItem("data",JSON.stringify(data));
     
      next();
}

export  function doLogout(next){
      localStorage.removeItem("data");
      next();
}

export function getCurrentUserDetail(){
     if(isLogin()){
        return JSON.parse(localStorage.getItem("data"));
     }
     else{
        return undefined;
     }
}




    


