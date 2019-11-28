// Dependencies
import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Components
import Home from './containers/Home/Home';

// HOC
import Layout from './hoc/Layout/Layout';

class App extends Component {
  render() {

    let routes = (
      <Fragment>
        <Switch>
          <Route to="/home" component={Home}/>
          <Redirect from="/" exact to="/home" />
        </Switch>
      </Fragment>
    );

    return(
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  };
};

export default App;
