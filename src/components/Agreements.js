import React, { useEffect, useState } from 'react';
import "@progress/kendo-theme-material/dist/all.css";
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import axios from 'axios';
import Header from './Header';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import { AdminCommandCell } from './AdminCommandCell';
import { MyCommandCell } from './CommandCell';
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const initialDataState = {
    skip : 0,
    take : 5,
};

const Agreements = (props) => {
    const user = useSelector(selectUser)
    const [agreement, setAgreement] = useState()
    const navigate = useNavigate();
    let agreementData;
    const initialSort = [
        {
            field: "id",
            dir: "asc",
        },
    ];
    const [ sort, setSort ] = useState(initialSort);
    const [ data, setData ] = useState(agreement);
    const [ page, setPage ] = useState(initialDataState);
    
    const CommandCell = (props) => (
        <MyCommandCell 
            { ...props }  
            edit = { enterEdit }
            delete = { enterDelete }
        />
    )

    const enterEdit = (e) => {
        // navigate("/editagreement")
        setData(e)
        console.log(e)
    }

    const enterDelete = async (e) => {
        console.log(e.id);
        let decision = window.confirm("Are you sure you want to delete this agreement");
        if(decision){
            const res = await axios.delete(`https://ezetap-test-apis.herokuapp.com/agreements/${e.id}`)
            .catch((error) => {
                console.log(error.message);
            });
        window.location.reload();
        }
    }

    const getAgreements = async () => {
        const res = await axios.get("https://ezetap-test-apis.herokuapp.com/agreements")
        .catch((error) => {
            console.log(error.message);
        });
        agreementData = res.data;
        setAgreement(agreementData);
    }

    const adduser = () => {
        navigate("/createuser");
    }

    const addagreement = () => {
        navigate("/creatagreement");
    }

    const goToLastPage = (e) => {
        if(user.role === 'admin') {
            navigate("/admin");
        }
        else if(user.role === 'normal') {
            navigate("/user")
        }
    }

    const pageChange = (e) => {
        setPage(e.page);
    }

    const rowRender = (trElement, props) => {
        const available = props.dataItem.id;
        const grey = {
            backgroundColor: "rgb(230, 232, 235)",
        };
        const white = {
            backgroundColor: "#ffffff",
        }
        const trProps = {
            style: ( available%2 === 0 ) ? grey : white,
        }
        return React.cloneElement(
            trElement,
            {...trProps},
            trElement.props.children
        );
    }

    useEffect(() => {
        getAgreements()
    }, [])
    return (
        <>
            <Header />
            <Container>
                <div className='whole'>
                    <div className="inner_container">

                        <div className='backbutton' >
                            <button className="fluid ui circular button blue" style={{width: "80px", margin: "5px", padding: "10px", fontSize: "1rem"}} onClick={goToLastPage}>BACK</button>
                        </div>
                        <div>
                            <h1>Agreements</h1>
                        </div>
                    </div>
                    <div className='dataGrid'>
                    {
                        agreement ?
                        <Grid 
                            data={ agreement.slice(page.skip, page.take + page.skip) }
                            pageable = { true }
                            skip = { page.skip }
                            take = { page.take }
                            total = { agreement.length }
                            onPageChange = { pageChange }
                            rowRender = { rowRender }
                            sortable = { true }
                            sort = { sort }
                            onSortChange = { (e) => { setSort(e.sort);} }
                            resizable
                            reorderable
                            style={{border: "1px solid black", boxShadow: "5px 5px 15px grey", minWidth: "1200px", height:"60vh"}}
                        >
                            <GridColumn field="id" title="ID"/>
                            <GridColumn field="agreementtext" title="AGREEMENT TEXT"/>
                            <GridColumn field="agreementcode" title="AGREEMENT CODE"/>
                            <GridColumn field="orgcode" title="ORGANISATION CODE"/>
                            {user.role === 'admin' 
                                ?
                                <GridColumn cell = { AdminCommandCell } />
                                :
                                <GridColumn cell = { CommandCell } />
                            }
                        </Grid>
                        :
                        null
                    }
                    </div>
                    { user.role == 'admin' 
                        ?
                        <div className='buttonsDiv'>
                            <button onClick={adduser} className="fluid ui circular button blue" style={{width: "110px", margin: "5px", padding: "15px", fontSize: "1.2rem"}}>Add User</button>
                            <button onClick={addagreement} className="fluid ui circular button blue" style={{width: "150px", margin: "5px", padding: "15px", fontSize: "1.2rem"}}>Add Agreement</button>
                        </div>
                        :
                        null
                    }
                </div>
                {/* </div> */}
            </Container>
        </>
    );
};

const Container = styled.div`
    left: 0;
    padding: 0;
    top: 0;
    width: 100vw;
    /* height: 100vh; */
`;


export default Agreements;