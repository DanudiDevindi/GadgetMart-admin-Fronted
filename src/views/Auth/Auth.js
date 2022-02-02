import Cookies from 'js-cookie'
import {HOME_PATH} from "../../routes";

const auth = (props) => {
  // if (!localStorage.getItem('login_response')) {
  //   props.history.push('/login');
  // }
  if (Cookies.get('logged') === null) {
    props.history.push(HOME_PATH+'/login');
  }
};

export default auth;
