import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/login';
import RegisterPage from './components/register';
import UserHome  from "./components/userHome";
import Add from "./components/addroom";
import CartPage from './components/cart';
import SuccessPage from './components/success';

import {
  Login,
  Register,
  Home,
  Booking_History,
  AddRoom,
  EditRoom,
  DeleteRoom,
  Favourites,
  Success,
  ViewRoom
} from './components/paths';
import UpdateRoom from './components/updateroom';
import Roominfo from './components/roominfo';

function App() {
  return (
    <div className="App">
     
     <Router>
       <Switch>
        <Route exact path={Login} component={LoginPage} />
        <Route exact path={Register} component={RegisterPage} />
        <Route exact path={Home} component={UserHome} />
        <Route exact path={AddRoom} component={Add} />
        <Route exact path={EditRoom} component={UpdateRoom} />
        <Route exact path={Favourites} component={CartPage} />
        <Route exact path={Success} component={SuccessPage} />
        <Route exact path={ViewRoom} component={Roominfo} />
       </Switch> 
      </Router>

    </div>
  );
}

export default App;