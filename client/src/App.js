import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/login';
import RegisterPage from './components/register';
import UserHome  from "./components/userHome";
import Add from "./components/addroom";

import {
  Login,
  Register,
  Home,
  Booking_History,
  AddRoom,
  EditRoom,
  DeleteRoom,
} from './components/paths';

function App() {
  return (
    <div className="App">
     
     <Router>
       <Switch>
        <Route exact path={Login} component={LoginPage} />
        <Route exact path={Register} component={RegisterPage} />
        <Route exact path={Home} component={UserHome} />
        <Route exact path={AddRoom} component={Add} />
       </Switch> 
      </Router>

    </div>
  );
}

export default App;