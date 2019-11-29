// Dependencies
import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Components
import Home from './containers/Home/Home';
import Info from './components/Info/Info';

// HOC
import Layout from './hoc/Layout/Layout';

class App extends Component {
  render() {

    let routes = (
      <Fragment>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/:type/:title" component={Info}/>
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
