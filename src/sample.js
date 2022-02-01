import React, {Component} from 'react';
import {MDBDataTable, MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
import { Spin, Icon as AntdIcon} from 'antd'
import {Button as SementicBtn, Icon} from "semantic-ui-react";
import LabelDropdown from "../../../../components/Dropdown/LabelDropdown/LabelDropdown";
import * as DropDownConst from "../../../../store/Reducer/DropDownConst";
import './Inquiries.css';
import connect from "react-redux/es/connect/connect";
import * as actionCreator from "../../../../store/Action";
import {Col, Row, Card, CardBody} from "reactstrap";
import * as common from "../../../../const/Common/CommonFunc";
import Cookies from "js-cookie";
import axiosTags from "../../../../axios/axios_visitortag";
import swal from "sweetalert";
import are_you_sure_icon from "../../../../assets/img/sweet/question.svg";


class App extends Component {
  state = {
    isMessage: true,
    isContent: true,
    isTable: false,
    isUpdate: false,
    isForm: false,
    isbtnyellow: false,
    isbtnred: true,
    isbtngreen: false,
    btnDefault1: false,
    btnColor1: true,
    btnDefault2: true,
    btnColor2: false,

    openby: "",
    closeby: "",
    datetime: "",
    status: "",
    message: "",
    updatedby: "",
    lastupdate: "",
    changestatus: "",
    moreinformation: "",
    inquirieId: "",
    isLoadSysUsers: false,
    data: [],
    updateStatus: "",

  };

  handleChange = name => event => {
    let value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  getAllUserInquiriesDetails = () => {
    this.props.spinnerHandler(true);
    const headers = {
      "Authorization": "Bearer " + Cookies.get("68a6102f6ed24899420170004a0273b8"),
      "user_type": "ALL"
    };
/*
 0 - ALL
 1 - PENDING
 2 - PROCESSING
 3 - CLOSED
*/
    let corporateId = this.props.usr_obj.corporates[0].corporateId;
    axiosTags.get(`inquiries/corporate/` + corporateId + `/inquirie?option=0`, {headers: headers})
      .then(response => {
        if (response.data.success) {
          this.setState({
            data: response.data.allInquiries,

          })
        } else {
          this.setState({
            data: []
          })
        }
      })
      .catch(async error => {
        let result = await common.checkErrorResponse(error);
        if (result === 1) {
          this.getAllUserInquiriesDetails()
        }
      })
      .finally(fin => {
        this.props.spinnerHandler(false);
      });
  };
  typeMessage = () => {
    this.setState({
      isMessage: true,
      btnColor1: true,
      btnDefault1: false,
      btnColor2: false,
      btnDefault2: true,
      isTable: false,
      isForm: false,
    });
    this.clearFields();
  };

  clearFields = () => {
    this.setState({
      message: "",
      changestatus: "",
    });
  };

  viewTable = () => {
    this.getAllUserInquiriesDetails();
    this.setState({
      isTable: true,
      isMessage: false,
      btnColor2: true,
      btnDefault2: false,
      btnColor1: false,
      btnDefault1: true,
    });
  };

  updateContent = (object) => {
    this.setState({
      isForm: true,
      inquirieId: object.inquirieId,
      updateStatus: object.inquirieStatus,
      message: object.message,
    });
    document.querySelector(".modal-header").scrollIntoView();
  };

  updateMessage = () => {
    if (this.state.message.trim() === "") {
      common.notifyMessage("please fill the message field", 0);

    } else {
      const {message, updateStatus, inquirieId} = this.state;
      const obj = {
        "inquirieId": inquirieId,
        "inquirieStatus": updateStatus,
        "message": message,
      };

      this.props.spinnerHandler(true);

      const headers = {
        "Authorization": "Bearer " + Cookies.get("68a6102f6ed24899420170004a0273b8")
      };

      let corporateId = this.props.usr_obj.corporates[0].corporateId;

      axiosTags.post(`inquiries/corporate/` + corporateId + `/inquirie`, obj, {headers: headers})
        .then(response => {
          if (response.data.success) {
            common.warningAlert(response.data.message);
            this.setState({
              data: response.data.allInquiries,
              isForm: false,
            })
            this.clearFields();
          } else {
            common.warningAlert(response.data.message);
          }
        })
        .catch(async error => {
          let result = await common.checkErrorResponse(error);
          if (result === 1) {
            this.updateContent()
          }
        })
        .finally(fin => {
          this.props.spinnerHandler(false);
        });
    }
  };

  addMessage = () => {
    this.setState({
      isMessage: true,
      isForm: false,
      btnDefault1: false,
      btnColor1: true,
    });

    if (this.state.message.trim() === "") {
      common.notifyMessage("please fill the message field", 0);

    } else {
      const {message} = this.state;
      const obj = {
        "message": message,
      };

      const headers = {
        "Authorization": "Bearer " + Cookies.get("68a6102f6ed24899420170004a0273b8")
      };

      let corporateId = this.props.usr_obj.corporates[0].corporateId;

      this.props.spinnerHandler(true);

      axiosTags.put(`inquiries/corporate/` + corporateId + `/inquirie`, obj, {headers: headers})
        .then(response => {
          if (response.data.success) {
            common.warningAlert(response.data.message);

            this.setState({
              data: response.data.allInquiries
            })
            this.clearFields();
          } else {
            common.warningAlert(response.data.message);
          }
        })
        .catch(async error => {
          let result = await common.checkErrorResponse(error);
          if (result === 1) {
            this.addMessage();
          }
        })
        .finally(fin => {
          this.props.spinnerHandler(false);
        });
    }
  };

  updateStatusHandler = (e, {value}) => {
    this.setState({
      updateStatus: value
    })
  };

  warningAlert = (id) => {
    swal({
      title: "Do you want to change this status ? ",
      icon: are_you_sure_icon,
      closeOnClickOutside: false,
      buttons: {
        cancel: 'Cancel',
        dangerMode: {
          text: "Yes",
          value: "action",
          className: "okay-btn"
        }
      },
    })
      .then((value) => {
        switch (value) {
        case "action":
          this.statusChange(id);
            break;

          default:
        }
      });
  }

  statusChange = (id) => {
    const headers = {
      "Authorization": "Bearer " + Cookies.get("68a6102f6ed24899420170004a0273b8")

    };
    this.props.spinnerHandler(true);
    let corporateId = this.props.usr_obj.corporates[0].corporateId;

    axiosTags.patch(`inquiries/corporate/` + corporateId + `/inquirie/` + id, {}, {headers: headers})
      .then(response => {
        if (response.data.success) {
          this.setState({
            data: response.data.allInquiries
          })
          common.warningAlert(response.data.message);
        } else {
          common.warningAlert(response.data.message);
        }
      })
      .catch(async error => {
        let result = await common.checkErrorResponse(error);

        if (result === 1) {
          this.statusChange(id)
        }
      })
      .finally(fin => {
        this.props.spinnerHandler(false);
      });

  }

  componentDidMount() {
    let corporateId = this.props.usr_obj.corporates[0].corporateId;
    // console.log("corporateId",corporateId)
  }

  render() {

    let rows = [];
    let all_corporates = this.state.data;
    if (all_corporates.length !== 0) {
      all_corporates.map((cor, index) => {
        const obj = {

          openby: cor.openReceptionistName === null ? "-" : cor.openReceptionistName,
          closeby: cor.closedReceptionistName === null ? "-" : cor.closedReceptionistName,
          opendate: cor.openDate === null ? "-" : cor.openDate,
          closedDate: cor.closedDate === null ? "-" : cor.closedDate,
          inquirieStatus: cor.inquirieStatus,
          message: cor.message,
          lastupdate: cor.updateReceptionistName === null ? "-" : cor.updateReceptionistName,
          updatedby: cor.updateReceptionistName === null ? "-" : cor.updateReceptionistName,
          changestatus:
            <Row style={{padding: '0px', margin: '0px'}}>
              <Col sm={6} style={{padding: '0px'}}>
                {
                  cor.inquirieStatus === "PENDING" ?
                    <SementicBtn key={index} style={{background: '#f2711c', color: 'white'}}
                                 onClick={() => this.warningAlert(cor.inquirieId)}
                    >Make Proceed</SementicBtn>
                    :
                    cor.inquirieStatus === "PROCESSING" ?
                      <SementicBtn key={index} style={{background: '#2abd1a', color: 'white'}}
                                   onClick={() => this.warningAlert(cor.inquirieId)}
                      >Make Complete</SementicBtn>
                      :
                      null
                }

              </Col>
            </Row>,
          more:
            <Row style={{padding: '0px', margin: '0px'}}>
              <Col sm={6} style={{padding: '0px'}}>
                <SementicBtn circular icon='edit' className={"more-update"}
                             onClick={() => this.updateContent(cor)}/>
              </Col>
            </Row>
        };
        rows.push(obj)
      })
    }

    const columns = [
      {
        label: 'Open By',
        field: 'open by'
      },
      {
        label: 'Close by',
        field: 'close by'
      },
      {
        label: 'Open-Date',
        field: 'open date'
      },
      {
        label: 'Close-Date',
        field: 'close date'
      },
      {
        label: 'Status',
        field: 'status'
      },
      {
        label: 'Message',
        field: 'message'
      },
      {
        label: 'Updated By',
        field: 'updated by'
      },
      {
        label: 'Last Update',
        field: 'last update'
      },

      {
        label: 'Change Status',
        field: 'change status'
      },
      {
        label: 'More Information',
        field: 'more information'
      }
    ];

    let table_data = {columns, rows};

    return (
      <MDBModal isOpen={true} toggle={()=>{}} size="lg">
        <MDBModalHeader toggle={this.props.closeModal} className={"title"}>User Inquiries Details</MDBModalHeader>
        <MDBModalBody>
          <Row>
            <Col lg="6">
              <div>
                <div
                  onClick={this.typeMessage}
                >
                  {
                    this.state.btnDefault1 ?
                      <button className={"file-uploader"}>Type Message Of User&nbsp;&nbsp;
                        <Icon name={"write"}/>
                      </button>
                      : null
                  }

                  {
                    this.state.btnColor1 ?
                      <button className={"file-uploader-nextbtn"}>Type Message Of User&nbsp;&nbsp;
                        <Icon name={"write"}/>
                      </button>
                      : null
                  }

                </div>
              </div>
            </Col>

            <Col lg="6">
              <div style={{display: "inline"}}>

                <div
                  onClick={this.viewTable}
                >
                  {
                    this.state.btnDefault2 ?

                      <button className={"file-uploader"}>View User Inquiries&nbsp;&nbsp;
                        <Icon name={"eye"}/>
                      </button>
                      : null
                  }
                  {
                    this.state.btnColor2 ?
                      <button className={"file-uploader-nextbtn"}>View user Inquiries&nbsp;&nbsp;
                        <Icon name={"eye"}/>
                      </button>
                      : null
                  }
                </div>

              </div>
            </Col>
          </Row>
          <br/>
          {
            this.state.isMessage ?
              <div>
                <textarea

                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  placeholder="Type inquirie message here"
                  value={this.state.message}
                  onChange={this.handleChange("message")}
                />

                <br/>
                <div style={{width: "15vw", display: "inline-block", marginLeft: "21vw"}}>
                  <button style={{background: "#53bd52", color: "white"}} onClick={this.addMessage}
                          className={"file-uploader"}>Add Message&nbsp;&nbsp;
                    <Icon name={"share square"}/>
                  </button>
                </div>
              </div>

              : null
          }
          <br/>
          {
            this.state.isForm ?
              <Row>
                <Col lg="12" md={"12"} sm={"12"} xs={"12"}>
                  <LabelDropdown
                    value={this.state.updateStatus}
                    tagText={"Status"}
                    placeholder="Status"
                    options={DropDownConst.status}
                    onChange={this.updateStatusHandler}
                  />
                </Col>

                <Col lg="12" md={"12"} sm={"12"} xs={"12"}>
                  <textarea

                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    placeholder="Type inquirie message here"
                    value={this.state.message}
                    onChange={this.handleChange("message")}
                  />
                  <br/>
                  <div style={{width: "15vw", display: "inline-block", marginLeft: "21vw"}}>
                    <button style={{background: "#53bd52", color: "white"}} onClick={this.updateMessage}
                            className={"file-uploader"}>Update Message&nbsp;&nbsp;
                      <Icon name={"pencil"}/>
                    </button>
                  </div>
                </Col>
              </Row>
              : null
          }
          <br/>

          {
            this.state.isTable ?

              <Card>
                <CardBody>
                  <Spin spinning={this.state.isLoadSysUsers} delay={10}
                        indicator={<AntdIcon type="loading" style={{fontSize: 24}} spin={"true"}/>}>
                    <MDBDataTable
                      searching={true}
                      displayEntries={true}
                      responsive
                      responsiveSm
                      responsiveMd
                      responsiveLg
                      responsiveXl
                      bordered
                      hover
                      data={table_data}
                    />
                  </Spin>
                </CardBody>
              </Card>


              : null
          }
        </MDBModalBody>
      </MDBModal>
    );
  }
}

const mapStateToProps = (state) => ({
  visitors: state.viewAllCheckIN.visitors,
  checkInVisitors: state.viewAllCheckIN.checkInVisitors,
  historyColumns: state.viewAllCheckIN.historyColumns,
  column: state.viewAllCheckIN.column,

  usr_obj: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // spinner handler
    spinnerHandler: (data) => dispatch(actionCreator.spinnerHandler(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


