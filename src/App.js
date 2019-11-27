// Dependencies
import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

// HOC
import Layout from './hoc/Layout/Layout';

/**
 *  let routes = (
      <Fragment>
        <Route to="" component={Home}/>
      </Fragment>
    );
 */

class App extends Component {
  render() {
    return(
      <div>
        <Layout>
          
        </Layout>
      </div>
    );
  };
};

export default App;
