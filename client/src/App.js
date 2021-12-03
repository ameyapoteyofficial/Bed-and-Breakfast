
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/login';
import RegisterPage from './components/register';

import {
  Login,
  Register,
} from './components/paths';

function App() {
  return (
    <div className="App">
     
     <Router>
       <Switch>
        <Route exact path={Login} component={LoginPage} />
        <Route exact path={Register} component={RegisterPage} />
       </Switch> 
      </Router>

    </div>
  );
}

export default App;
