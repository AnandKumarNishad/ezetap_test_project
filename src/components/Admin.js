import React, { useEffect, useState } from 'react';
import "@progress/kendo-theme-material/dist/all.css";
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import "../App.css";
// import { process } from '@progress/kendo-data-query';

const initialDataState = {
    skip: 0,
    take: 10,
}

const Admin = () => {
    const [ user, setUser ] = useState();
    const [ page, setPage ] = useState(initialDataState);
    // const [dataState, setDataState] = useState();
    // const [result, setResult] = useState(user);
    const navigate = useNavigate();

    let userData;
    const getUsers = async () => {
        const res = await axios.get("https://ezetap-test-apis.herokuapp.com/users")
        .catch((error) => {
            console.log(error.message);
        });

        userData = res.data;
        setUser(userData);        
    };

    const adduser = () => {
        navigate("/createuser");
    }

    const addagreement = () => {
        navigate("/creatagreement");
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
    
    // const onDataStateChange = (event) => {
    //     setDataState(event.dataState);
    //     setResult(process(user, event.dataState))
    // }

    useEffect(() => {
        getUsers()
    }, []);

    return (
        <>
            <Header />
            <div className='whole'>
                <div>
                    <h1>Users Details</h1>
                </div>

                <div className='dataGrid'>
                {
                    user ? 
                    <Grid 
                        data = { user.slice(page.skip, page.skip + page.take) }
                        pageable = { true }
                        skip = { page.skip }
                        take = { page.take }
                        total = { user.length }
                        onPageChange = {pageChange}
                        rowRender={ rowRender }
                        resizable
                        reorderable
                        // filterable = { true }
                        // onDataStateChange = { onDataStateChange }
                        // {...dataState}
                        style={{border: "1px solid black", boxShadow: "5px 5px 15px grey", minWidth: "1200px", height: "65vh"}}
                    >
                        
                        <GridColumn field="id" title="USER ID"/>
                        <GridColumn field="name" title="USER NAME"/>
                        <GridColumn field="mobilenumber" title="MOBILE NUMBER"/>
                        <GridColumn field="email" title="EMAIL ID"/>
                        <GridColumn field="orgcode" title="ORG. CODE"/>
                        <GridColumn field="username" title="USER NAME"/>
                        <GridColumn field="role" title="ROLE"/>
                    </Grid>
                    :
                    null
                }
                </div>
                
                <div className='buttonsDiv'>
                    <button onClick={adduser} className="fluid ui circular button blue" style={{width: "110px", margin: "5px", padding: "15px", fontSize: "1.2rem"}}>Add User</button>
                    <button onClick={addagreement} className="fluid ui circular button blue" style={{width: "150px", margin: "5px", padding: "15px", fontSize: "1.2rem"}}>Add Agreement</button>
                </div>
            </div>
        </>
        
);}
export default Admin;