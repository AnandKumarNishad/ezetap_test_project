import { Grid, GridColumn } from '@progress/kendo-react-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Agreements from './Agreements';
import { MyCommandCell } from './CommandCell';

const User = (props) => {
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
                <h1>
                    user detail
                </h1>
            </div>
            <div>
                <h1>Agreements</h1>
            </div>
            {
                agreement ?
                <Grid 
                    data={agreement}
                    // selectable={row} 
                >
                    <GridColumn field="id" title="AGREEMENT ID"/>
                    <GridColumn field="agreementcode" title="AGREEMENT CODE"/>
                    <GridColumn field="orgcode" title="ORGANISATION CODE"/>
                    <GridColumn cell={CommandCell}/>
                </Grid>
                :
                null
            }
        </>
    );
};

export default User;