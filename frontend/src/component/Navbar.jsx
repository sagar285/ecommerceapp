import React from 'react'
import styled from 'styled-components'
import {Mail, Search, ShoppingCartOutlined} from "@mui/icons-material"
import { Badge } from '@mui/material'
import { mobile } from '../responsive'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Container=styled.div`
      height:60px;
      ${mobile({height:"50px"})}
`

const Wrapper=styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({padding:"10px 0px"})}

`

// navbar left side

const Left =styled.div`
flex:1;
display: flex;
align-items: center;
`
const Language =styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({display:"none"})}

`
const SearchContainer =styled.div`
    border:0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left:25px;
    padding:5px;
`

const Input =styled.input`
   border:none;
   ${mobile({width:"50px"})}


`

// center in navbar
const Center = styled.div`
flex:1;
text-align: center;
`

const Logo =styled.h1`
    font-weight: bold;
    ${mobile({fontSize:"24px"})}

`





const Right =styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({flex:2,justifyContent:"center"})}

`

const MenuItem=styled.div`
 font-size:14px;
 cursor: pointer;
 margin-left: 25px;
 ${mobile({fontSize:"12px",marginLeft:"10px"})}

`





const Navbar = () => {

    const quantity = useSelector(state=>state.cart.quantity);
    console.log(quantity);

    

  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>English</Language>
                <SearchContainer>
                    <Input placeholder='search'/>
                    <Search style={{color:"gray",fontSize:"16px"}}/>
                </SearchContainer>
            </Left>
            <Center>
                <Logo>Simply Js</Logo>
            </Center>
            <Right>
                <MenuItem>
                Register
                </MenuItem>
                <MenuItem>
                Sign In
                </MenuItem>
                <Link to={"/cart"}>
                <MenuItem>
                <Badge badgeContent={quantity} color='primary'>
                    <ShoppingCartOutlined/>
                </Badge>
                </MenuItem>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar