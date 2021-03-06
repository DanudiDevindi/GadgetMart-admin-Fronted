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

  let user_columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      align: 'center',
    },
    {
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      align: 'center',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 120,
      align: 'center',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      width: 70,
      align: 'center',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      align: 'left',
      width: 100,
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      key: 'totalCost',
      align: 'left',
      width: 100,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 50,
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: 150,
    },
  ];
  
  let item_columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      align: 'center',
    },
    {
      title: 'Item Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      align: 'center',
    },
    {
      title: 'Delivery Cost',
      dataIndex: 'deliveryCost',
      key: 'deliveryCost',
      width: 70,
      align: 'center',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      align: 'left',
      width: 120,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      align: 'left',
      width: 120,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      width: 50,
      align: 'center',
    },
    {
      title: 'Shop',
      dataIndex: 'shop',
      key: 'shop',
      align: 'center',
      width: 100,
    },
    {
      title: 'Warranty',
      dataIndex: 'warranty',
      key: 'warranty',
      align: 'center',
      width: 100,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      align: 'center',
      width: 50,
    },
    {
      title: 'Final Price',
      dataIndex: 'fprice',
      key: 'fprice',
      align: 'center',
      width: 50,
    },
  ];


class View extends Component {

    state = {
        table_columns: [],
        table_rows: [],
        item_rows: [],
        modal: false,
        status: [
          {
            key: 0,
            value: 'PENDING',
            text: 'PENDING',
          },
          {
            key: 1,
            value: 'APPROVED',
            text: 'APPROVED',
          },
          {
            key: 2,
            value: 'REJECTED',
            text: 'REJECTED',
          },
          {
            key: 3,
            value: 'COMPLETE',
            text: 'COMPLETE',
          }
        ],
        selectedStatus: ''
      };
      async UNSAFE_componentWillMount() {
        if (Cookies.get('logged') === undefined) {
          this.props.history.push(HOME_PATH+'/login');
        } else {
          this.getAllOrder();
        }
      }

      getAllOrder() {
        axios.get(
          '/order/all-orders'
        )
          .then(res => {
            const array = [];
            res.data.map((value, index) => {
              if (this.state.selectedStatus === ''){
                array.push({
                  key: index,
                  id: index + 1,
                  name: value.name,
                  address: value.address,
                  contact: value.contact,
                  paymentMethod: value.paymentMethod,
                  totalCost: value.totalCost.toFixed(2),
                  status: value.status,
                  action:
                    <div>
                      {
                        value.status === 'PENDING' &&
                          <>
                            <Button size='mini'
                                    className="positive ui button bg-success tableBtn2"
                                    onClick={()=>this.updateOrders(value.order_id,'ACCEPT')}
                            >Accept</Button>
                            <Button size='mini'
                                    className="positive ui button bg-danger tableBtn2"
                                    onClick={()=>this.updateOrders(value.order_id,'REJECT')}
                            >Reject</Button>
                          </>
                      }
                      {
                        value.status === 'REJECT' &&
                        <>
                          <Button size='mini'
                                  className="positive ui button bg-success tableBtn2"
                                  onClick={()=>this.updateOrders(value.order_id,'ACCEPT')}
                          >Accept</Button>
                        </>
                      }
                      {
                        value.status === 'ACCEPT' &&
                        <>
                          <Button size='mini'
                                  className="positive ui button bg-success tableBtn2"
                                  onClick={()=>this.updateOrders(value.order_id,'COMPLETE')}
                          >Complete</Button>
                        </>
                      }
                      <Button size='mini'
                              className="positive ui button tableBtn"
                              onClick={()=>this.viewOrderItems(value)}
                      >View</Button>
                    </div>
                });
              } else {
                if (this.state.selectedStatus === value.status){
                  array.push({
                    key: index,
                    id: index + 1,
                    name: value.name,
                    address: value.address,
                    contact: value.contact,
                    paymentMethod: value.paymentMethod,
                    totalCost: value.totalCost.toFixed(2),
                    status: value.status,
                    action:
                      <div>
                        {
                          value.status === 'PENDING' &&
                          <>
                            <Button size='mini'
                                    className="positive ui button bg-success tableBtn2"
                                    onClick={()=>this.updateOrders(value.order_id,'ACCEPT')}
                            >Accept</Button>
                            <Button size='mini'
                                    className="positive ui button bg-danger tableBtn2"
                                    onClick={()=>this.updateOrders(value.order_id,'REJECT')}
                            >Reject</Button>
                          </>
                        }
                        {
                          value.status === 'REJECT' &&
                          <>
                            <Button size='mini'
                                    className="positive ui button bg-success tableBtn2"
                                    onClick={()=>this.updateOrders(value.order_id,'ACCEPT')}
                            >Accept</Button>
                          </>
                        }
                        {
                          value.status === 'ACCEPT' &&
                          <>
                            <Button size='mini'
                                    className="positive ui button bg-success tableBtn2"
                                    onClick={()=>this.updateOrders(value.order_id,'COMPLETE')}
                            >Complete</Button>
                          </>
                        }
                        <Button size='mini'
                                className="positive ui button tableBtn"
                                onClick={()=>this.viewOrderItems(value)}
                        >View</Button>
                      </div>
                  });
                }
              }
    
            });
            this.setState({
              table_rows: array
            })
          })
          .catch(err => {
            console.log(err);
          })
      }

      updateOrders = (id, status) => {
        axios.patch(
          '/order',
          {
            order_id: id,
            status: status
          }
        )
          .then(res => {
            if (res.data){
              this.getAllOrder();
            } else{
              message.error({
                top: 100,
                duration: 1,
                maxCount: 3,
                rtl: true,
                content: 'Unable to update status',
                onClose: {}
              });
            }
          })
          .catch(err => {
            console.log(err);
            message.error({
              top: 100,
              duration: 1,
              maxCount: 3,
              rtl: true,
              content: 'Unable to update status',
              onClose: {}
            });
          })
      }
      viewOrderItems = (order) => {
        this.toggle();
        const item_rows = [];
        order.orderDetail.map((value,index)=>{
          let price = value.price;
          if (value.discount !== null && value.discount !== 0) {
            price = (value.price-(value.price/100*value.discount));
          }
          item_rows.push({
            key: index,
            id: index + 1,
            name: value.name,
            price: value.price,
            deliveryCost: value.deliveryCost,
            brand: value.brand,
            category: value.category,
            discount: value.discount,
            shop: value.shop,
            soldOut: value.soldOut,
            warranty: value.warranty,
            qty: value.qty,
            fprice: ((price*value.qty)+value.deliveryCost).toFixed(2)
          })
        })
        this.setState({item_rows})
      }

      toggle = ()=> {
        this.setState({modal: !this.state.modal})
      }
    
      handleChangeStatus = (event, data) => {
        this.setState({
          selectedStatus: data.value,
        });
        this.getAllOrder();
      };


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