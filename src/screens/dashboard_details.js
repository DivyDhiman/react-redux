import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CommentList from "./components/comment_list";
import CommentForm from "./components/comment_form";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';
import CustomLoader from "./components/loader";
import { getPostDetails } from "../redux/service/get_post_details";
import { getPostComments } from "../redux/service/get_post_comments";
import { DELETE_COMMENT, ADD_COMMENT } from '../redux/actions/post_comments_action';
import {UPDATE_DATA} from '../redux/actions/post_detail_action'
import 'react-toastify/dist/ReactToastify.css';


function DashboardDetails(props) {
    const Header = styled(Typography)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        fontWeight: 800,
        fontSize: 22,
        fontFamily: 'Roboto',
        borderRadius: 0,
        color: 'white',
        fontSize: "24px",
    }));

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const [isEdit, setEdit] = useState(false);
    const [message, setMessage] = useState('');
    const [isAdmin, setAdmin] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [userID, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    
    const id = searchParams.get("id");

    function guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    const postDetailReducer = useSelector(
        (state) => state.postDetailReducer
    );

    const postCommentsReducer = useSelector(
        (state) => state.postCommentsReducer
    );


    useEffect(() => {
        var getLogin =  sessionStorage.getItem("isLogin");
        var userType =  sessionStorage.getItem("getUserType");
        var getUserID =  sessionStorage.getItem("userId");
        var getEmail =  sessionStorage.getItem("email");
        var getUserName =  sessionStorage.getItem("userName");        

        console.log(userType);

        if(getLogin){        

            setAdmin(userType == undefined || userType == null || userType == false || userType == "false" ? false : true);
            setIsLogin(true);
            setUserId(getUserID);
            setEmail(getEmail);
            setUserName(getUserName);
        }else{
            setIsLogin(false);
            setAdmin(false);
            setUserId('');
            setEmail('');
            setUserName('');
        }
        init();
    }, []);

    const init = async () => {
        dispatch(getPostDetails(id));
        dispatch(getPostComments(id));
    }

    const edit = () => {
        setMessage(postDetailReducer.data.title);
        setEdit(true);
    }

    const doneEdit = () => {
        if(message != ''){
         setEdit(false);
         dispatch({ type: UPDATE_DATA, data : message })
        }
    }

    const handleFieldChange = event => {
         setMessage(event.target.value);
    };

    const addComment = (comment) => {
        if(isLogin){
         dispatch({ type: ADD_COMMENT, userId: userID, id: guidGenerator(), name: userName, email: email, body: comment })
        }else{
            navigate({pathname: '/login'})
        }
    }

    const deleteComment = (key, comment) => {
        dispatch({ type: DELETE_COMMENT, index: key, data: comment })
    }

    const previousScreen = () => navigate(-1);

    return (
        <div className="Dashboard-header">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <ArrowBackIosIcon onClick={() => previousScreen()} />
                        <Header>
                            Details
                        </Header>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className="App container bg-light shadow">

                <header className="App-header">
                {!isEdit ?    
                    <div className="d-inline-flex flex-row">
                    <h1 className="App-title">
                        {(() => {
                            switch (postDetailReducer.status) {
                                case "LOADING":
                                    return "LOADING"
                                    break;

                                case "ERROR":
                                    return postDetailReducer.errorMessage ?? ""
                                    break;

                                case "EMPTY":
                                    return "NO Data Available"
                                    break;

                                case "SUCCESS":
                                    return postDetailReducer.data.title
                                    break;

                                default:
                                    return ''
                            }
                        })()}
                    </h1>

                    {(() => {
                            switch (postDetailReducer.status) {
                                case "LOADING":
                                    return <div/>
                                    break;

                                case "ERROR":
                                    return <div/>
                                    break;

                                case "EMPTY":
                                    return <div/>
                                    break;

                                case "SUCCESS":
                                    return  isAdmin ?  <EditIcon style={{
                                        color: "white", cursor: 'pointer', marginRight: "10px",
                                        marginLeft: "10px"
                                        }} onClick={() => edit()}/> : <div/>
                                    break;

                                default:
                                    return <div/>
                            }
                        })()}                   
                    </div>
                    :
                        <div className="d-flex flex-row">
                             <textarea
                                onChange={handleFieldChange}
                                value={message}
                                className="form-control"
                                placeholder="Your Comment"
                                name="message"
                                rows="1"
                            />
                            <button className="ms-2 btn btn-light" onClick={() => doneEdit()}>
                                Done
                            </button>
                        </div>
                    }

                    <p>
                        {(() => {
                            switch (postDetailReducer.status) {
                                case "LOADING":
                                    return ""
                                    break;

                                case "ERROR":
                                    return postDetailReducer.errorMessage ?? ""
                                    break;

                                case "EMPTY":
                                    return ""
                                    break;

                                case "SUCCESS":
                                    return postDetailReducer.data.body
                                    break;

                                default:
                                    return ''
                            }
                        })()}          </p>
                </header>

                <div className="row">
                    <div className="col-4  pt-4 border-right">
                        <h6>Say something</h6>
                        <CommentForm addComment={addComment} />
                    </div>
                    <div className="col-8  pt-3 bg-white">
                        <CommentList
                            enableDelete = {isAdmin}
                            callback={deleteComment}                            
                            loading={(() => {
                                switch (postCommentsReducer.status) {
                                    case "LOADING":
                                        return true
                                        break;

                                    case "ERROR":
                                        return false
                                        break;

                                    case "EMPTY":
                                        return false
                                        break;

                                    case "SUCCESS":
                                        return false
                                        break;

                                    default:
                                        return false
                                }
                            })()}
                            comments={(() => {
                                switch (postCommentsReducer.status) {
                                    case "LOADING":
                                        return []
                                        break;

                                    case "ERROR":
                                        return []
                                        break;

                                    case "EMPTY":
                                        return []
                                        break;

                                    case "SUCCESS":
                                        return postCommentsReducer.data
                                        break;

                                    default:
                                        return []
                                }
                            })()}
                        />
                    </div>
                </div>
            </div>
            <CustomLoader
              showLoader = {(() => {
                switch (postCommentsReducer.status) {
                    case "LOADING":
                        return true;
                        break;

                    case "ERROR":
                        return false;
                        break;

                    case "EMPTY":
                        return false;
                        break;

                    case "SUCCESS":
                        return false;
                        break;
                    default:
                        return false;
                    }
                })()}
            />
        </div>
    );
}

export default DashboardDetails;
