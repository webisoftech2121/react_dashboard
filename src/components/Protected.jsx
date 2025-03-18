import React ,{useState,useEffect} from "react";
import { Link, useNavigate} from "react-router-dom";


function Protectedroutes (props){
    const {Component} = props
    const navigate = useNavigate();
    useEffect(()=>{
        let login = localStorage.getItem('userData');
        if(!login){
            navigate('/admin-login')
        }
    })
    return(
        <>
       <Component></Component>
        </>
    )
}

export default Protectedroutes;