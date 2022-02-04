import React from 'react';
import DefaultLayout from './containers/DefaultLayout';


const Home = React.lazy(() => import('./views/Pages/Home'));
const UserProfile = React.lazy(() => import('./views/Pages/UserProfile/UserProfile'));
const Providers = React.lazy(() => import('./views/Pages/Providers/Providers'));
export const HOME_PATH = '/admin'

const routes = [

    { path: HOME_PATH+'/', exact: true, name: '', component: DefaultLayout },
    { path: HOME_PATH+'/home', name: 'Dashboard', component: Home },
    { path: HOME_PATH+'/user-profile', name: 'Registered Users', component: UserProfile },
    { path: HOME_PATH+'/service-providers', name: 'Service Providers', component: Providers },

];

export default routes;