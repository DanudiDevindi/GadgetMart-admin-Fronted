import React from 'react';
import DefaultLayout from './containers/DefaultLayout';


const Home = React.lazy(() => import('./views/Pages/Home'));
export const HOME_PATH = '/admin'

const routes = [

    { path: HOME_PATH+'/', exact: true, name: '', component: DefaultLayout },
    { path: HOME_PATH+'/home', name: 'Dashboard', component: Home },

];

export default routes;