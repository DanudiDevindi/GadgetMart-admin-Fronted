import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';

import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes, {HOME_PATH} from '../../routes';
import Cookies from "js-cookie";

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));


class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>


  signOut(e) {
    e.preventDefault();
    localStorage.clear();
    Cookies.remove('logged');
    Cookies.remove('userId');
    Cookies.remove('userRole');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('access_token');
    this.props.history.push(HOME_PATH+'/login');
  }

  goHome() {
    this.props.history.push(HOME_PATH+'/add');
  }

  changePassword() {
    this.props.history.push(HOME_PATH+'/change-password');
  };

  render() {
    let nav = navigation;

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader
              onLogout={e => this.signOut(e)}
              goHome={() => this.goHome()}
              onChangePassword={() => this.changePassword()}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">

          <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <Suspense>
              <AppSidebarNav navConfig={nav} {...this.props} />
            </Suspense>
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
          </AppSidebar>

          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )}/>
                    ) : (null);
                  })}
                  <Redirect from={HOME_PATH+"/"} to={HOME_PATH + "/login"}/>
                </Switch>
              </Suspense>
            </Container>
          </main>
          {/*<AppAside fixed>*/}
          {/*  <Suspense fallback={this.loading()}>*/}
          {/*    <DefaultAside/>*/}
          {/*  </Suspense>*/}
          {/*</AppAside>*/}
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter/>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
