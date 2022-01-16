import {LOADING, ERROR,  SUCCESS, CLEAR,EMPTY} from '../actions/post_list_action';


const initialState = {
    status : "IDLE",
    data : [],
    errorMessage : ""
}

function postListReducer(state = initialState, action){
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

    default:
      return state
  }
}
export default postListReducer
