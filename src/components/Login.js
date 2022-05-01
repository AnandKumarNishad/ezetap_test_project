import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import "../App.css";

const Login = (props) => {
    let data;
    let navigate = useNavigate();
    const [ user, setUser ] = useState({
        email : "", password : ""
    });
    const [ activeUser, setActiveUser ] = useState({});
    let name, value;
    const handleInputs =(e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }

    const goToAdminConsole = () => {
        window.alert("Login Successful... redirecting to admin console...");
        navigate('/admin');
    }

    const goToUserConsole = () => {
        // window.alert("Login Successful... redirecting to Home...");
        // navigate('/user');
        console.log(activeUser);

    }

    const reloadPage = () => {
        window.alert("Login credential are not valid! Please check and try again...")
        window.location.reload();
        return false;
    }

    const getData = async () => {
        let count = 0;
            const res = await axios.get("https://ezetap-test-apis.herokuapp.com/users")
            .catch((error) => {
                console.log(error.message);
            });
            data = res.data;
            const userCount = data.map((users) => {
                const { email, password, role } = users;
                if ( email === user.email && password === user.password && role === 'admin' ){
                    count = 1;
                    console.log(users);
                    return count;
                } else if ( email === user.email && password === user.password && role === 'normal' ) {
                    count = 2;
                    setActiveUser(users);
                    console.log(users);
                    return count;
                }
                return count;
            })

            if(userCount.includes(1)){
                goToAdminConsole();
            } else  if (userCount.includes(2)) {
                goToUserConsole();
            }
            else {
                reloadPage();
            }
        };
        useEffect(()=> {
            console.log(activeUser);
        }, [activeUser])
        console.log(activeUser)

    return (
        <Container>
            <div className="inner_container loginForm">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    getData();
                }}>
                    <h1>Log in</h1>
                    <div className="ui form">
                        <div className="field">
                            <input
                            type="email"
                            name="email"
                            placeholder="Email or Phone"
                            value = {user.email}
                            onChange={handleInputs}
                            required
                            autoComplete='off'
                            />
                        </div>
                        <div className="field">
                            <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={handleInputs}
                            required
                            />
                        </div>
                        <h2>Forgot password?</h2>
                        <button  className="fluid ui circular button blue">Log in</button>
                    </div>
                </form>
            </div>
        </Container>
    );
};

const Container = styled.div`
    left: 0;
    padding: 0 24px;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background: linear-gradient(to right, #acb6e5, #86fde8);
`;

export default Login;