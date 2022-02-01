import React, {Component} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import PropTypes from 'prop-types';
import "../../css/custom.css";
import Cookies from "js-cookie";
import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/img/brand/brand.png'
import logo_2 from '../../assets/img/brand/logo.png'
import icon from '../../assets/img/avatar.png';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const {children, ...attributes} = this.props;

    return (
      <React.Fragment>
        {
          Cookies.get('userRole') === 'ADMIN' ?
            <AppSidebarToggler className="d-lg-none" display="md" mobile/>
            :
            null
        }

        <AppNavbarBrand
          onClick={()=>this.props.goHome()}
          full={{src: logo, width: 140, height: 50, alt: 'Logo'}}
          minimized={{src: logo_2, width: 30, height: 50, alt: 'Logo'}}
        />

        <Nav className="ml-auto" navbar>
          <div>
            <div className="font-weight-bold user_name">
              {Cookies.get('firstName')}&nbsp;{Cookies.get('lastName')}</div>
          </div>

          {/*<NavItem className="d-md-down-none">*/}
          {/*<NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>*/}
          {/*</NavItem>*/}
          {/*<NavItem className="d-md-down-none">*/}
          {/*<NavLink href="#"><i className="icon-list"></i></NavLink>*/}
          {/*</NavItem>*/}
          {/*<NavItem className="d-md-down-none">*/}
          {/*<NavLink href="#"><i className="icon-location-pin"></i></NavLink>*/}
          {/*</NavItem>*/}
          <AppHeaderDropdown direction="down" style={{'marginRight': '12px'}}>
            <DropdownToggle nav>
              {/*<img src={'../../assets/img/avatars/5.jpg'} className="img-avatar"/>*/}
              <img src={icon} className="img-avatar"/>
            </DropdownToggle>
            <DropdownMenu right style={{right: 'auto'}}>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              {/*<DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>*/}
              {
                Cookies.get('userRole') !== 'ADMIN' ?
                  <DropdownItem onClick={() => this.props.onChangePassword()}><i className="fa fa-lock"></i> Change
                    Password</DropdownItem>
                  :
                  null
              }
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-user"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-md-down-none" />*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
