import {LOADING, ERROR,  SUCCESS, CLEAR,EMPTY, DELETE_COMMENT,ADD_COMMENT} from '../actions/post_comments_action';


const initialState = {
    status : "IDLE",
    data : [],
    errorMessage : ""
}

function postCommentsReducer(state = initialState, action){
  switch (action.type) {
    case LOADING:
        return { ...state, status :  "LOADING" }

    case ERROR: 
          return { ...state,status :  "ERROR", errorMessage : action.errorMessage}

    case SUCCESS:
            return { ...state,status :   "SUCCESS" ,data : action.data}

    case EMPTY:
         return { ...state,status :   "EMPTY" ,data : []}
    
    case CLEAR:
          return { ...state,status :   "IDLE" ,data : []}

    case DELETE_COMMENT:
     return { ...state,data : state.data.filter(function(element) { 
                        return element.id !== action.data.id
          })}          

    case ADD_COMMENT:
      var data = {
            userId : action.userId, 
            id : action.id,
            name : action.name,
            email : action.email,
            body : action.body
          };
        return { ...state,data : [...state.data,data]}                 
    default:
      return state
  }
}
export default postCommentsReducer
