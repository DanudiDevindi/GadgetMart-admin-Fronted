import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css'
import '../../../css/custom.css';
import {DatePicker, message, Table} from 'antd';
import 'antd/dist/antd.css';
import {Button, Dropdown} from 'semantic-ui-react'
import axios from "../../../axios-orders";
import Cookies from "js-cookie";
import Swa2 from "sweetalert2";
import {MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
import {HOME_PATH} from "../../../routes";

const {RangePicker} = DatePicker;

const dateFormat = 'YYYY-MM-DD';

class View extends Component {

    render() {
        return (
          <div>
            <div>
              <div className="row ml-4 mr-4">
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                  <Dropdown
                    className="top_margin"
                    onChange={this.handleChangeStatus}
                    fluid
                    search
                    selection
                    options={this.state.status}
                    placeholder='Select Status'
                    clearable={true}
                  />
                </div>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col">
                <Table
                  bordered={true}
                  pagination={{pageSize: 10}}
                  className="mr-5 ml-5 text-center"
                  columns={user_columns}
                  dataSource={this.state.table_rows}
                />
              </div>
            </div>
            <div>
              {
                this.state.modal &&
                <MDBModal isOpen={this.state.modal} toggle={() => this.toggle()} fullHeight position="right"
                          size="lg" className="w-100 position-relative not-active">
                  <MDBModalHeader toggle={() => this.toggle()}>
                    <div align="center">
                      <h3 align="center" className="model-topic-text">Order Items</h3>
                    </div>
                  </MDBModalHeader>
                  <MDBModalBody>
                    <Table
                      bordered={true}
                      pagination={{pageSize: 10}}
                      className="mr-5 ml-5 text-center"
                      columns={item_columns}
                      dataSource={this.state.item_rows}
                    />
                  </MDBModalBody>
                </MDBModal>
              }
    
            </div>
          </div>
        );
      }

}

export default View;