import { BrowserRouter as Router, Route } from 'react-router-dom';

import HeaderNav from './components/HeaderNav';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (    
    <Router>
      <HeaderNav />
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </Router>
  );
}

export default App;
