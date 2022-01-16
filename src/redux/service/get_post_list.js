import { LOADING, ERROR, SUCCESS, EMPTY } from '../actions/post_list_action';
import { APIHelper } from './ApiHelper';
import config from '../../utils/config';
import Constant from '../../utils/constant';

export const getPostList = () => {

    return async dispatch => {
        try {


            dispatch({ type: LOADING })

                    const headers = {
                        'Content-Type': 'application/json',
                    }

                    APIHelper.getMethod(
                        config.APP_URL + config.GET_POST, headers
                    ).then((response) => {
                        if(response){
                            if (response.status === 200) {
                                const apiResponse = response.data;
                                if(apiResponse && apiResponse.length > 0){
                                    dispatch({ type: SUCCESS, data: apiResponse })
                                }else{
                                    dispatch({ type: EMPTY, data: [] })
                                }
                            } else {
                                dispatch({ type: ERROR, errorMessage: response.message })
                            }
                    }else{
                        dispatch({ type: ERROR, errorMessage: Constant.oopsSomethingWrong })
                    }

                    });


        } catch (error) {
            dispatch({ type: ERROR, errorMessage: error })
        }
    }

}


