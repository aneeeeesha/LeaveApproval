import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signin from './components/Login';
import Signup from './components/Signup';
import SignupUp from './components/Signup_1';
import About from './components/About';
import Activity from './components/Activity';

function App() {
  return (
    <>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/signin">
        <Signin />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/activity">
        <Activity />
      </Route>


      <Route path="/signup">
        <Signup />
      </Route>
    </>
  );
}

export default App;
