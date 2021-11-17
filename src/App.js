import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Footer from './Pages/Footer/Footer';
import Header from './Pages/Header/Header';
import Home from './Pages/Home/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Services from './Pages/Services/Services';
import AuthProvider from './Context/AuthProvider';
import Register from './Pages/Login/Register/Register';
import Login from './Pages/Login/Login/Login';
import Order from './Pages/Services/Order/Order';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import Pay from './Pages/Pay/Pay';
import MyOrder from './Pages/MyOrder/MyOrder';
import Review from './Pages/CommentSection/CommentSection';
import Dashboard from './Dashboard/Dashboard/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='/home'>
            <Home></Home>
          </Route>
          <Route path='/services'>
            <Services></Services>
          </Route>
          <PrivateRoute path='/booking/:serviceId'>
            <Order></Order>
          </PrivateRoute>
          
          <Route path='/about'>
            <About></About>
          </Route>
          <PrivateRoute path='/pay'>
            <Pay></Pay>
          </PrivateRoute>
          <PrivateRoute path='/myOrders'>
            <MyOrder></MyOrder>
          </PrivateRoute>
          <PrivateRoute path='/review'>
            <Review></Review>
          </PrivateRoute>
          <PrivateRoute path='/dashboard'>
            <Dashboard></Dashboard>
          </PrivateRoute>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='/register'>
            <Register></Register>
          </Route>
          <Route path='/contact'>
            <Contact></Contact>
          </Route>
          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>

      </Router>
    </AuthProvider>
  );
}

export default App;
