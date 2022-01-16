
export  const LOADING = () => ({
});

export const ERROR = (errorMessage) => ({
  errorMessage : errorMessage
});


export const SUCCESS = (data,message,date) => ({
  data : data,
  message : message,
  date : date
});

export const CLEAR = () => ({
});


export const UPDATE_DATA = (data) => ({
  data : data
});