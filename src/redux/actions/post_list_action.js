
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