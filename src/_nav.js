import {HOME_PATH} from "./routes";

export default {
  items: [
    {
      name: 'Home',
      url: HOME_PATH+'/home',
      icon: 'fa fa-home',
    },
    {
      name: 'Service Providers',
      url: HOME_PATH+'/service-providers',
      icon: 'fa fa-truck',
    },
    {
      name: 'System Users',
      url: HOME_PATH+'/user-profile',
      icon: 'fa fa-user',
    },
    {
      name: 'Manage Orders',
      url: HOME_PATH+'/orders',
      icon: 'fa fa-tasks',
    },
  ],
};
