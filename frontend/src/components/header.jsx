import React, { useContext, useEffect, useState } from "react";
import {Navigate} from "react-router-dom";
import { useUserContext } from "./userContex";

export default function Header(){
    const userContext = useUserContext();
    useEffect(() => {
        fetch('http://localhost:4000/authorized', {
                credentials:'include', 
        }).then(response =>{
                response.json().then(userInfo => {
                    userContext.login(userInfo);
                })
            })
    },[]);
    
    console.log(userContext.user);
    function logout(){
        fetch('http://localhost:4000/logout',{
            credentials:'include',
            method:'POST',
        }).then(() => {
            userContext.logout();
        })
    }
    
    const username = userContext.user;
    return(
        <div>
        <nav>
            <ul class="nav1">
                <li>CookIt</li>
            </ul>
            <ul class="nav2">
                <a href="/"><li>Home</li></a>
                <a href="/recipe"><li>Recipes</li></a>
                <a href="/posts"><li>Posts</li></a>
                {username && (
                    <>
                    <a href="/yourrecipe"><li>Your Recipes</li></a>
                    <a onClick={logout}>Logout</a>
                    </>
                )}
                {!username && (
                    <>
                    <a href="/signin"><li>Signin</li></a>
                    </>
                )}
            </ul>
        </nav>
    </div>
    )
}