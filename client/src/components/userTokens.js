export const getUserToken =() =>{
    return localStorage.getItem("userToken");
};

export const setUserToken = (jwtToken) =>{
    return localStorage.setItem("userToken",jwtToken);
};

export const getUserEmail =() =>{
    return localStorage.getItem("userEmail");
};

export const setUserEmail = (email) =>{
    return localStorage.setItem("userEmail",email);
};

export const getUserId =() =>{
    return localStorage.getItem("userID");
};

export const setUserId = (userid) =>{
    return localStorage.setItem("userID",userid);
};