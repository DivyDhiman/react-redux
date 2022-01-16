import {LOADING, ERROR,  SUCCESS, CLEAR,UPDATE_DATA} from '../actions/post_detail_action';


const initialState = {
    status : "IDLE",
    data : "",
    errorMessage : ""
}

function postDetailReducer(state = initialState, action){
  switch (action.type) {
    case LOADING:
        return { ...state, status :  "LOADING" }

    case ERROR: 
          return { ...state,status :  "ERROR", errorMessage : action.errorMessage}

    case SUCCESS:
            return { ...state,status :   "SUCCESS" ,data : action.data}

    case CLEAR:
          return { ...state,status :   "IDLE" ,data : ""}

    case UPDATE_DATA:
        var previousData = state.data;
        previousData.title = action.data;
       return { ...state, data : previousData}
            
    default:
      return state
  }
}
export default postDetailReducer
