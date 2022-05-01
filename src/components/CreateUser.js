import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Header from './Header';

const CreateUser = () => {
    const [ user, setUser ] = useState({
        name : "",
        mobileNumber : "",
        email : "",
        orgCode : "",
        username : "",
        password : ""
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    let navigate = useNavigate();

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(user));
        setIsSubmit(true);
    }

    const postData = async (e) => {
        const { name, mobileNumber, email, orgCode, username, password } = user;
        mobileNumber.toString();
        const res = await fetch("https://ezetap-test-apis.herokuapp.com/users", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name, mobileNumber, email, orgCode, username, password
            })
        });

        const data = res;
        if (data.status === 500){
            window.alert("Registration Failed...");
            window.location.reload();
        }
        else {
            window.alert("Registration Successful...");
            navigate("/admin");
        }
    }

    const validate = (values) => {
        const errors = {}
        if(!values.name){
            errors.name = "Name is required!";
        }
        if(!values.mobileNumber){
            errors.mobileNumber = "Mobile number is required!";
        }
        if(!values.email){
            errors.email = "Email is required!";
        }
        if(!values.orgCode){
            errors.orgCode = "Organisation Code is required!";
        }
        if(!values.username){
            errors.username = "UserName is required!";
        }
        if(!values.password){
            errors.password = "Password is required!";
        }
        return errors;
    }

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit) {
            postData();
        }
    }, [formErrors]);
    return (
        <Container>
            <Header />
            <div className='whole'>
                <hr/>
                <div className="inner_container">
                    <h1>Create User</h1>
                    <form onSubmit = { handleSubmit }>
                        <div className="ui form">
                            <label>Name</label>
                            <div className="field">
                                <input
                                type="text"
                                name="name"
                                value = {user.name}
                                onChange = {handleInputs}
                                required
                                />
                            </div>
                            <label>Mobile Number</label>
                            <div className="field">
                                <input
                                type="number"
                                name="mobileNumber"
                                value = {user.mobileNumber}
                                onChange = {handleInputs}
                                required
                                />
                            </div>
                            <label>Email</label>
                            <div className="field">
                                <input
                                type="email"
                                name="email"
                                value = {user.email}
                                onChange = {handleInputs}
                                required
                                />
                            </div>
                            <label>Organisation Code</label>
                            <div className="field">
                                <input
                                type="text"
                                name="orgCode"
                                value = {user.orgCode}
                                onChange = {handleInputs}
                                required
                                />
                            </div>
                            <label>UserName</label>
                            <div className="field">
                                <input
                                type="text"
                                name="username"
                                value = {user.username}
                                onChange = {handleInputs}
                                required
                                />
                            </div>
                            <label>Password</label>
                            <div className="field">
                                <input
                                type="password"
                                name="password"
                                value = {user.password}
                                onChange = {handleInputs}
                                required
                                />
                            </div>
                            <button className="fluid ui circular button blue" >Create User</button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
};

const Container = styled.div`
    left: 0;
    padding: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
`;

export default CreateUser;
