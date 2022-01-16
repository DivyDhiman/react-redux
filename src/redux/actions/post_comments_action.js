
export  const LOADING = () => ({
});

export const ERROR = (errorMessage) => ({
  errorMessage : errorMessage
});

export const EMPTY = () => ({
});

export const SUCCESS = (data,message,date) => ({
  data : data,
  message : message,
  date : date
});

export const CLEAR = () => ({
});

export const DELETE_COMMENT = (index, data) => ({
  index : index,
  data : data
});

export const ADD_COMMENT = (userId, id, name,email,body) => ({
    userId:userId, 
    id : id,
    name : name,
    email : email,
    body : body
});
