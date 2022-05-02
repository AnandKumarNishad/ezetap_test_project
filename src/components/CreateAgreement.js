import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Header from './Header';
import "../App.css";
import { useNavigate } from 'react-router-dom';

const CreateAgreement = () => {
    const [ user, setUser ] = useState({
        agreementText : "",
        agreementCode : "",
        orgCode : "",
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

    const goToLastPage = (e) => {
        navigate("/admin");
    }

    const postData = async (e) => {
        const { agreementText, agreementCode, orgCode } = user;
        const res = await fetch("https://ezetap-test-apis.herokuapp.com/agreements", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                agreementText, agreementCode, orgCode
            })
        });

        const data = res;
        if (data.status === 500){
            window.alert("Agreement Creation Failed...");
            window.location.reload();
        }
        else {
            window.alert("Agreement Successfully Created...");
            navigate("/agreements");
        }
    }

    const validate = (values) => {
        const errors = {}
        if(!values.agreementText){
            errors.agreementText = "Agreement Text is required!";
        }
        if(!values.agreementCode){
            errors.agreementCode = "Agreement Code is required!";
        }
        if(!values.orgCode){
            errors.orgCode = "Organisation Code is required!";
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
            <div className="inner_container">
                <div className='backbutton'>
                    <button className="fluid ui circular button blue" style={{width: "80px", margin: "5px", padding: "10px", fontSize: "1rem"}} onClick={goToLastPage}>BACK</button>
                </div>
                <h1>Create Agreement</h1>
                <form onSubmit={ handleSubmit }>
                    <div className="ui form">
                        <label>Agreement Text</label>
                        <div className="field">
                            <input
                            type="text"
                            name="agreementText"
                            value = {user.agreementText}
                            onChange = {handleInputs}
                            required
                            />
                        </div>
                        <label>Agreement Code</label>
                        <div className="field">
                            <input
                            type="text"
                            name="agreementCode"
                            value = {user.agreementCode}
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
                        
                        <button className="fluid ui circular button blue" >Create Agreement</button>
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
    z-index: 100;

`;

export default CreateAgreement;