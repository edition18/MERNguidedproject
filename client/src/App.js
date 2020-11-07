import React, {Fragment} from "react";
import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"
import './App.css';

const App = () => 
<Fragment> 
  <Navbar />
  <Landing />
</Fragment>
//Fragment is an invisiable element in DOM


export default App;
