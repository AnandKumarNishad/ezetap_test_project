import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { logout, selectUser } from '../features/userSlice';

const Header = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick =(e) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/");
    }

    const goToHome = (e) => {
        e.preventDefault();
        if(user){
            if(user.role === 'admin'){
                navigate("/admin")
            }
            else if (user.role === 'normal'){
                navigate("/user")
            }
        } else {
            navigate("/")
        }
    }

    const goToAgreement = (e) => {
        e.preventDefault();
        navigate("/agreements")
    }

    return (
        <Nav>
            <NavListWrap>
                <NavList>
                    <a onClick={goToHome}>
                        <img src="/images/nav-home.svg" alt="" />
                        <span>Home</span>
                    </a>
                </NavList>

                <NavList>
                    <a onClick={goToAgreement}>
                        <img src="/images/contract.svg" alt="" width={"24px"} />
                        <span>Agreement</span>
                    </a>
                </NavList>
                <NavList>
                    <a onClick={handleClick}>
                        <img src="/images/logout.svg" alt="" width={"30px"} />
                        <span>Sign Out</span>
                    </a>
                </NavList>
            </NavListWrap>
        </Nav>
    );
};

const Nav = styled.nav`
    display: flex;
    margin-left: auto;
    display: block;
    @media (max-width: 768px) {
        position: fixed;
        left: 0;
        bottom: 0;
        background: white;
        width: 100%;
    }
    `;

const NavListWrap = styled.ul`
    margin: 0;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: nowrap;
    list-style-type: none;
    .active {
        span:after {
        content: "";
        transform: scaleX(1);
        border-bottom: 2px solid var(--white, #fff);
        bottom: 0;
        left: 0;
        position: absolute;
        transition: transform 0.2s ease-in-out;
        width: 100%;
        border-color: rgba(0, 0, 0, 0.9);
        }
    }
`;

const NavList = styled.li`
    display: flex;
    align-items: center;
    a {
        cursor:pointer;
        align-items: center;
        background: transparent;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        font-weight: 400;
        justify-content: center;
        line-height: 1.5;
        min-height: 52px;
        min-width: 80px;
        position: relative;
        text-decoration: none;
        span {
        color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        }
        @media (max-width: 768px) {
        min-width: 70px;
        }
    }
    &:hover,
    &:active {
        a {
        span {
            color: rgba(0, 0, 0, 0.9);
        }
        }
    }
`;

export default Header;