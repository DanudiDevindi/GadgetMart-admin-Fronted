import React, {Component} from 'react';
import Cookies from "js-cookie";
import {Button, Dropdown} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {notification, Switch, Table} from "antd";
import 'antd/dist/antd.css';
import '../../../css/custom.css';
import {AiOutlineCheckCircle} from "react-icons/ai";
import {MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import axios from "../../../axios-orders";
import {Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import Swa2 from "sweetalert2";
import {message} from "antd/lib/index";

const Toast = Swa2.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2000,
    // timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swa2.stopTimer);
      toast.addEventListener('mouseleave', Swa2.resumeTimer)
    }
  });
  

class UserProfile extends Component {

    state = {
        createUserTableRows: [],
      };

    render() {
        return (
          <div className="animated fadeIn">
            <div>
    
              <br/>
              <div className="row">
                <div className="col">
                  <Table
                    bordered={true}
                    pagination={{pageSize: 10}}
                    className="mr-5 ml-5 text-center"
                    columns={this.createUserTableColumns}
                    dataSource={this.state.createUserTableRows}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }

}

export default UserProfile;