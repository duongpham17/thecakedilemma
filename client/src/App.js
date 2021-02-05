import './App.scss';

import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/authActions';

/* Routing */
import PrivateRoute from './routing/PrivateRoute';
import PrivateAdminRoutes from './routing/PrivateAdminRoutes';
import LoadData from './routing/LoadData';
import Title from './routing/Title';
import NotFound from './routing/NotFound';
import Connection from './routing/Connection';

/* Alert */
import Alert from './components/alert/Alert';

/* Authentication */
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import ForgotPassword from './components/authentication/ForgotPassword';
import ResetPassword from './components/authentication/ResetPassword';

/* Layout */
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';

/* About Website */
import About from './components/about/About';
import Privacy from './components/about/Privacy';
import Faqs from './components/about/Faqs';
import Contact from './components/about/Contact';

/* Account */
import Account from './components/account/Account';

/* Admin */
import Admin from './components/admin/Admin';

/* Home */
import Home from './components/home/Home';

/* Product */
import Products from './components/products/Products';
import Product from './components/products/Product';

/* Checkout */
import Checkout from './components/checkout/Checkout';
import Basket from './components/checkout/Basket';
import Guest from './components/checkout/Guest';

/* Order */
import Order from './components/order/Order';
import GuestOrder from './components/order/GuestOrder';

/* Gifts */
import Gift from './components/gift/Gift';
import GiftSent from './components/gift/GiftSent';

import testCheckout from './components/test/Checkout';
import testBasket from './components/test/Basket';

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser(document.cookie))
  })

  return (
    <Provider store={store}>
      <Router>

        <div className="body">
          <Alert />
          <Title />
          <LoadData />
          <Navbar />
          <Connection />

          <Switch>
            <Route exact path='/about'    component={About}                  />
            <Route exact path='/privacy'  component={Privacy}                />
            <Route exact path='/faqs'     component={Faqs}                   />
            <Route exact path='/contact'  component={Contact}                />

            <Route exact path='/signup'   component={Signup}                 />
            <Route exact path='/login'    component={Login}                  />
            <Route exact path='/forgot password' component={ForgotPassword}  />
            <Route path='/resetpassword'         component={ResetPassword}   />

            <Route exact path='/'          component={Home}                   />
            <Route path='/products'        component={Products}               />
            <Route path='/product'        component={Product}                 />

            <Route exact path='/basket/guest' component={Guest}               />
            <Route exact path='/order/guest' component={GuestOrder}           />
            <Route exact path='/checkout'   component={Checkout}              />
            <Route exact path='/basket'     component={Basket}                />

            <Route exact path='/gift-cards'     component={Gift}              />
            <Route exact path='/gift-success'     component={GiftSent}        />

            <Route exact path='/test-checkout' component={testCheckout}       />
            <Route exact path='/test-basket' component={testBasket}          />

            <PrivateRoute exact path='/order' component={Order}               />
            <PrivateRoute exact path='/account' component={Account}           />

            <PrivateAdminRoutes exact path='/admin' component={Admin}         />

            <Route component={NotFound} />
          </Switch>
        </div>

        <div className="footer">
          <Footer/>
        </div>
        
      </Router>
    </Provider>
    )
};

export default App
