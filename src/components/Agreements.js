import React, { useEffect, useState } from 'react';
import "@progress/kendo-theme-material/dist/all.css";
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import axios from 'axios';
import Header from './Header';

const Agreements = () => {
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
            <Header />
        <div>
            <h1>Agreements</h1>
        </div>
        {
            agreement ?
            <Grid data={agreement}>
                <GridColumn field="id" title="AGREEMENT ID"/>
                <GridColumn field="agreementtext" title="AGREEMENT TEXT"/>
                <GridColumn field="agreementcode" title="AGREEMENT CODE"/>
                <GridColumn field="orgcode" title="ORGANISATION CODE"/>
            </Grid>
            :
            null
        }
        </>
    );
};

export default Agreements;