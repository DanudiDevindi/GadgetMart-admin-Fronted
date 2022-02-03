import React, {Component} from 'react';
import Cookies from "js-cookie";
import 'semantic-ui-css/semantic.min.css'
import {Table} from "antd";
import 'antd/dist/antd.css';
import '../../../css/custom.css';
import axios from "../../../axios-orders";
import {Button} from "semantic-ui-react";
import Swa2 from "sweetalert2";
import {AiOutlineCloseCircle} from "react-icons/ai";

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
        tableRow: [],
        providerId: '',
        providerName: '',
        providerUrl: '',
        providerNameEntered: false,
        save: true,
      };
    
      createUserTableColumns = [
        {
          title: 'No',
          dataIndex: 'no',
          key: 'no',
          width: 30,
          align: 'center',
        },
        {
          title: 'Provider Name',
          dataIndex: 'name',
          key: 'name',
          width: 150,
          align: 'center',
        },
        {
          title: 'Url',
          dataIndex: 'url',
          key: 'url',
          width: 210,
          align: 'center',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          width: 60,
          align: 'center',
        },
      ];

      UNSAFE_componentWillMount() {
        if (Cookies.get('logged') === undefined) {
          this.props.history.push('/login');
        } else {
          this.loadAllProvidersTable();
        }
      }
    render() {
        return (
          <div className="animated fadeIn">
            <div>
    
              <div className="ui form">
                <div className="inline field">
                  <div className="fields">
                    <div className="six wide field">
                      <input
                        value={this.state.providerName}
                        onChange={(e) => {
                          this.onChange(e)
                        }}
                        name="providerName"
                        type="text"
                        placeholder="Service Provider Name"/>
                    </div>
                    <div className="six wide field">
                      <input
                        value={this.state.providerUrl}
                        onChange={(e) => {
                          this.onChange(e)
                        }}
                        name="providerUrl"
                        type="text"
                        placeholder="Web Service Url"/>
                    </div>
                    <br/>
                    <div className="four wide field">
                      {
                        !this.state.save &&
                        <Button size='mini' className="positive ui button tableBtn bg-danger" onClick={() => {
                          this.setState({
                            save: true,
                            providerId: '',
                            providerName: '',
                            providerUrl: '',
                          })
                        }}><AiOutlineCloseCircle size={20}/></Button>
                      }
    
                      <Button
                        className='mr-3 m-1 tableBtn'
                        positive size='small'
                        style={{'float': 'right', color: 'white'}}
                        disabled={this.state.providerName === '' || this.state.providerUrl === ''}
                        onClick={() => this.saveProvider(this.state.save ? 'post' : 'patch','')}
                      >{this.state.save ? 'Add Service Provider' : 'Update Provider'}</Button>
    
                    </div>
                  </div>
                </div>
              </div>
    
              <br/>
              <Table
                bordered={true}
                pagination={{pageSize: 10}}
                className=" text-center"
                columns={this.createUserTableColumns}
                dataSource={this.state.tableRow}
              />
            </div>
          </div>
        );
      }
}

export default UserProfile;