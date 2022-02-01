import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

export const HOME_PATH = '/admin'

const routes = [

    { path: HOME_PATH+'/', exact: true, name: '', component: DefaultLayout },
    

];

export default routes;