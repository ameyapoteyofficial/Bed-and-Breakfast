
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/login';
function App() {
  return (
    <div className="App">
     
     <Router>
       <Switch>
        <Route exact path="/">
          <LoginPage></LoginPage>
        </Route>
       </Switch> 
      </Router>

    </div>
  );
}

export default App;
