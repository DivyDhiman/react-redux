import React, { useEffect,useState } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import CustomLoader from "./components/loader";

import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";
import { createSearchParams,useNavigate } from 'react-router-dom';
import { getPostList } from "../redux/service/get_post_list";


function Dashboard(props) {
    const Header = styled(Typography)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'start',
        color: theme.palette.text.secondary,
        fontWeight: 800,
        fontSize: 22,
        fontFamily: 'Roboto',
        borderRadius: 0,
        color: 'white',
        fontSize: "24px",
        variant:"h6",
        flexGrow: 1 
    }));
    
    
    const Title = styled(Typography)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        fontWeight: 800,
        fontSize: 22,
        fontFamily: 'Roboto',
    }));
    
    
    const Body = styled(Typography)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 14,
        fontFamily: 'Roboto',
    }));
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [isAdmin, setAdmin] = useState(false);

    const postListReducer = useSelector(
        (state) => state.postListReducer
    );
    
    const nextScreen = (id) => navigate({
        pathname: '/dashboard-details',
        search: `?${createSearchParams({
            id: id
        })}`
    });
    

    useEffect(() => {
        var getLogin =  sessionStorage.getItem("isLogin");
        var getUserType =  sessionStorage.getItem("getUserType");
       
        if(getLogin){        
            setIsLogin(true);
            if(getUserType){
                setAdmin(true);
            }else{
                setAdmin(false);
            }
        }else{
            setIsLogin(false);
            setAdmin(false);
        }
        init();
    }, []);

    const init = async () => {
        dispatch(getPostList());
    }

    const logout = () => {
        sessionStorage.clear()
        window.location.reload();
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Header variant="h6">
                            Posts
                        </Header>

                        {
                            !isLogin ? 
                            <Link href="/login" style={{ color: "white" }}>
                             <Button color="inherit">Login</Button>
                           </Link>
                           :                           
                               <Button color="inherit" onClick={() => logout()}>LogOut</Button>
                        }
                        
                    </Toolbar>
                </AppBar>
            </Box>
            <div className="Dashboard-header">
                {(() => {
                    switch (postListReducer.status) {
                        case "LOADING":
                            return <div></div>
                            break;

                        case "ERROR":
                            return <div>{postListReducer.errorMessage ?? ""}</div>
                            break;

                        case "EMPTY":
                            return <div>{"NO Data Available"}</div>
                            break;

                        case "SUCCESS":
                            return <div>
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    {postListReducer.data.map((data, index) => (
                                        <Grid item xs={2} sm={4} md={4} key={index} style={{cursor:"pointer"}} 
                                        onClick={() => nextScreen(data.id)}>
                                            <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1 }}>
                                                <Title >
                                                    {data.title}
                                                </Title>

                                                <Body>
                                                    {data.body}
                                                </Body>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>

                            </div>
                            break;

                        default:
                            return <div></div>
                    }
                })()}
            </div>
            <CustomLoader
              showLoader = {(() => {
                switch (postListReducer.status) {
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

export default Dashboard;
