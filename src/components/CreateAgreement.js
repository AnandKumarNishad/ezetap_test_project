import React from 'react';
import styled from 'styled-components'
import Header from './Header';
import "../App.css";

const CreateAgreement = () => {
    return (
        <Container>
            <Header />
            <div></div>
            <hr/>
            <div className="inner_container">
            <h1>Create Agreement</h1>
        <form>
            <div className="ui form">
                <label>Agreement Text</label>
                <div className="field">
                    <input
                    type="text"
                    name="agreementText"
                    // value = {user.email}
                    // onChange = {handleInputs}
                    required
                    />
                </div>
                <label>Agreement Code</label>
                <div className="field">
                    <input
                    type="text"
                    name="agreementCode"
                    // value = {user.password}
                    // onChange = {handleInputs}
                    required
                    />
                </div>
                <label>Organisation Code</label>
                <div className="field">
                    <input
                    type="text"
                    name="organisationCode"
                    // value = {user.password}
                    // onChange = {handleInputs}
                    required
                    />
                </div>
                
                <button className="fluid ui circular button blue" >Create Agreement</button>
            </div>
        </form>
        </div>
        </Container>
    );
};

const Container = styled.div`
    left: 0;
    padding: 0 24px;
    top: 0;
    width: 100vw;
    z-index: 100;
`;

export default CreateAgreement;