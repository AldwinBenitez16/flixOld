// Dependencies
import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Containers
import Explore from './containers/Explore/Explore';
import User from './containers/User/User';

// Components
import Search from './containers/Search/Search';
import Home from './containers/Home/Home';
import Movies from './components/Movies/Movies';
import TvShows from './components/TvShows/TvShows';
import Info from './containers/Info/Info';
import GenrePage from './components/Explore/GenrePage/GenrePage';
import Authentication from './components/Authentication/Authentication';
import LogOut from './components/Authentication/LogOut/LogOut';  

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
          <Route path="/search/:type/:query-:page" component={Search} />
          <Route path="/info/:type/:title" component={Info}/>
          <Route render={() => <h2>Page Not Found!</h2>}/>
        </Switch>
      </Fragment>
    );

    let userRoute = null;
    if(this.props.isAuth) {
      userRoute = <Route path="/user" component={User} />;
    }

    if(this.props.isAuth || this.props.isGuest) {
      routes = (
        <Fragment>
          <Switch>
            <Redirect from="/" exact to="/home" />
            <Route path="/home" render={(props) => <PageWrapper {...props} ><Home /></PageWrapper>}/>
            <Route path="/movies" render={(props) => <PageWrapper {...props} ><Movies /></PageWrapper>}/>
            <Route path="/tvshows" render={(props) => <PageWrapper {...props} ><TvShows /></PageWrapper>}/>
            <Route path="/explore" component={Explore}/>
            <Route path="/login" component={Authentication}/>
            {userRoute}
            <Route path="/logout" component={LogOut}/> 
            <Route path="/genre/:genre" render={(props) => <PageWrapper {...props}  ><GenrePage /></PageWrapper>} />
            <Route path="/info/:type/:title" component={Info}/>
            <Route render={() => <h2>Page Not Found!</h2>}/>
          </Switch>
        </Fragment>
      );
    }

    return(
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.authenticated,
    isGuest: state.auth.guestAuth
  };
};

export default connect(mapStateToProps)(App);
