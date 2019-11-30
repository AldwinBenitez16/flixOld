// Dependencies
import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Components
import Home from './components/Home/Home';
import Movies from './components/Movies/Movies';
import TvShows from './components/TvShows/TvShows';
import Info from './components/Info/Info';
import Explore from './containers/Explore/Explore';

// HOC
import Layout from './hoc/Layout/Layout';
import PageWrapper from './hoc/PageWrapper/PageWrapper';

class App extends Component {
  render() {

    let routes = (
      <Fragment>
        <Switch>
          <Route path="/home" render={(props) => <PageWrapper {...props} ><Home /></PageWrapper>}/>
          <Route path="/movies" render={(props) => <PageWrapper {...props} ><Movies /></PageWrapper>}/>
          <Route path="/tvshows" render={(props) => <PageWrapper {...props} ><TvShows /></PageWrapper>}/>
          <Route path="/explore" component={Explore}/>
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
