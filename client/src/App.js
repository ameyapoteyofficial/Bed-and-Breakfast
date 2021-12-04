
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/login';
import RegisterPage from './components/register';

import {
  Login,
  Register,
  UserHome,
} from './components/paths';
import userHome from './components/userHome';

function App() {
  return (
    <div className="App">
     
     <Router>
       <Switch>
        <Route exact path={Login} component={LoginPage} />
        <Route exact path={Register} component={RegisterPage} />
        <Route exact path={UserHome} component={userHome} />
       </Switch> 
      </Router>

    </div>
  );
}

export default App;
