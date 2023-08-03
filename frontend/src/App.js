import './App.css'
import Header from './components/header';
import {Route, Routes} from "react-router-dom";
import Layout from './components/layout';
import Home from './components/home';
import Yourrecipe from './components/yourrecipe';
import Recipe from './components/recipe';
import Signin from './components/signin';
import Signup from './components/signup';
import Posts from './components/posts';
import { UserContextProvider } from './components/userContex';

function App(){
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={ <Layout />} >
                    <Route index element={<Home/>}/>
                    <Route path='/recipe' element={<Recipe />}/>
                    <Route path='/posts' element={<Posts />}/>
                    <Route path='/signin' element={<Signin />}/>
                    <Route path='/signup' element={<Signup />}/>
                    <Route path='/yourrecipe' element={<Yourrecipe />}/>
                </Route>
            </Routes>
        </UserContextProvider>
        
    )
}

export default App;
