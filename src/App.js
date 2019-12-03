// Dependencies
import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Components
import Home from './components/Home/Home';
import Movies from './components/Movies/Movies';
import TvShows from './components/TvShows/TvShows';
import Explore from './containers/Explore/Explore';
import Info from './components/Info/Info';
import GenrePage from './components/Explore/GenrePage/GenrePage';
import Authentication from './components/Authentication/Authentication';

// HOC
import Layout from './hoc/Layout/Layout';
import PageWrapper from './hoc/PageWrapper/PageWrapper';

class App extends Component {
  render() {

    let routes = (
      <Fragment>
        <Switch>
          <Redirect from="/" exact to="/home" />
          <Route path="/home" render={(props) => <PageWrapper {...props} ><Home /></PageWrapper>}/>
          <Route path="/movies" render={(props) => <PageWrapper {...props} ><Movies /></PageWrapper>}/>
          <Route path="/tvshows" render={(props) => <PageWrapper {...props} ><TvShows /></PageWrapper>}/>
          <Route path="/explore" component={Explore}/>
          <Route path="/login" component={Authentication}/>
          <Route path="/genre/:genre" render={(props) => <PageWrapper {...props}  ><GenrePage /></PageWrapper>} />
          <Route path="/info/:type/:title" component={Info}/>
          <Route render={() => <h2>Page Not Found!</h2>}/>
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
