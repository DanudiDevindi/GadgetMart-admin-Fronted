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

      loadAllProvidersTable = () => {
        axios.get(
          '/provider'
        )
          .then(res => {
            const array = [];
            res.data.map((value, index) => {
              array.push({
                key: index,
                no: index + 1,
                name: value.name,
                url: value.url,
                action: <>
                  <Button size='mini' className="positive ui button tableBtn" onClick={async() => {
                    await this.setState({
                      save: false,
                      providerId: value.providerId,
                      providerName: value.name,
                      providerUrl: value.url,
                    })
                  }}>Update</Button>
                  <Button size='mini' className="positive ui button tableBtn bg-danger" onClick={async() => {
                    await this.setState({
                      providerId: value.providerId,
                    })
                    this.saveProvider('patch','/delete')
                  }}>Delete</Button>
                </>
              });
            });
            this.setState({
              tableRow: array
            })
          })
          .catch(err => {
            console.log(err);
          })
      };

      onChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };
      saveProvider = (type,subPath) => {
        axios[type](
          '/provider'+subPath, {
            providerId: this.state.providerId,
            name: this.state.providerName,
            url: this.state.providerUrl
          },
        )
          .then(res => {
            if (res.data) {
              this.setState({
                providerId: '',
                providerName: '',
                providerUrl: '',
              });
              this.loadAllProvidersTable();
              Toast.fire({
                icon: 'success',
                title: 'Action success!'
              });
            } else {
              Toast.fire({
                icon: 'error',
                title: 'Action Fail!'
              });
            }
          })
          .catch(err => {
            Toast.fire({
              icon: 'error',
              title: err
            });
          })
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
                        style={{'float': 'right', color: 'white', background: 'blue'}}
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