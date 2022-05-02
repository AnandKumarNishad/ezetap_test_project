import { Grid, GridColumn } from '@progress/kendo-react-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import Agreements from './Agreements';
import { MyCommandCell } from './CommandCell';
import Header from './Header';
import styled from 'styled-components';

const User = (props) => {
    const user = useSelector(selectUser)
    // console.log(props);
    const CommandCell = (props) => (
        <MyCommandCell
          {...props}
        //   edit={enterEdit}
        //   remove={remove}
        //   add={add}
        //   discard={discard}
        //   update={update}
        //   cancel={cancel}
        //   editField={editField}
        />
      );
      
    const [agreement, setAgreement] = useState()
    let agreementData;

    const getAgreements = async () => {
        const res = await axios.get("https://ezetap-test-apis.herokuapp.com/agreements")
        .catch((error) => {
            console.log(error.message);
        });
        agreementData = res.data;
        setAgreement(agreementData);
    }

    useEffect(() => {
        getAgreements()
    }, [])
    return (
        <>
            <div>
                <Header/>
                <Container>
                <h1>
                    user detail
                </h1>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="card hovercard">
                                <div className="cardheader">
                                </div>

                                <div className="avatar">
                                    <img src="/images/user.svg"/>
                                </div>

                                <div className="info">
                                    <div className="title">
                                        <h1>
                                            welcome
                                        </h1>
                                        <a>Name: {user.name}</a>
                                    </div>

                                    <div className="desc">Mobile.No: {user.mobilenumber}</div>

                                    <div className="desc">Email: {user.email}</div>

                                    <div className="desc">Organisation: {user.orgcode}</div>
                                    
                                    <div className="desc">Username: {user.username}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Container>
            </div>
        </>
    );
};

const Container = styled.div`
    height: 100vh;
    background: linear-gradient(to right, #acb6e5, #86fde8);
`;

export default User;