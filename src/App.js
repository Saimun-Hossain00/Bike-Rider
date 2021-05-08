import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import Blog from './Components/Blog/Blog';
import Contact from './Components/Contact/Contact';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Destination from './Components/Destination/Destination';
import SelectDest from './Components/SelectDest/SelectDest';



export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value ={[loggedInUser, setLoggedInUser]} >
    <Router>
      <Header></Header>
      <div className="home">
      <Switch>
        
        <div className="container">
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <PrivateRoute exact path="/destination/:veh">
          <SelectDest />
        </PrivateRoute>
        <PrivateRoute exact path="/destination/:veh/:placeFrom/:placeTo">
          <Destination />
        </PrivateRoute>
        <Route path="/contact">
          <Contact/>
        </Route>
        <Route path="/login">
        <Login></Login>
        </Route>
        </div>
        <Route path="*">
          <NotFound></NotFound>
        </Route>
      </Switch>
      </div>
    </Router>
    </UserContext.Provider>
  );
}

export default App;

