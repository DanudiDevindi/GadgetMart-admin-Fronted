import React, {Component} from 'react';
import Cookies from "js-cookie";
import {ButtonGroup, Card, CardBody, Col, Row,} from "reactstrap";
import '../../../css/custom.css';
import 'antd/dist/antd.css';
import axios from "../../../axios-orders";
import {HOME_PATH} from "../../../routes";

class Home extends Component {

    state = {
        card1: false,
        card2: false,
        card3: false,
        card4: false,
    
        orderCount: 0,
        providerCount: 0,
        pendingCount: 0,
        userCount: 0
      };
    
      
    

    render() {
        return (
          <div className="animated fadeIn">
            <Row>
              <Col xs="12" sm="6" lg="3">
                <Card
                  className="text-white bg-gradient-primary"
                  style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center', background:"cornflowerblue", border:'none'}}
                  onClick={() => {
                    this.props.history.push(HOME_PATH + '/user-profile');
                  }}>
                  <CardBody>
                    <ButtonGroup className="float-right">
                    </ButtonGroup>
                    <div className="text-value text-black">{this.state.userCount}</div>
                    <div className="text-black">All Users</div>
                  </CardBody>
    
                </Card>
              </Col>
    
              <Col xs="12" sm="6" lg="3">
                <Card className="text-white bg-gradient-danger"
                      style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center', cursor: 'pointer', background:"cornflowerblue", border:'none'}}
                      onClick={() => {
                        this.props.history.push(HOME_PATH + '/orders');
                      }}>
                  <CardBody>
    
                    <div className="text-value text-black">{this.state.pendingCount}</div>
                    <div className="text-black">Pending Orders</div>
                  </CardBody>
                </Card>
              </Col>
    
              <Col xs="12" sm="6" lg="3">
                <Card
                  className="text-white bg-gradient-info"
                  style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center', background:"cornflowerblue", border:'none'}}
                  onClick={() => {
                    this.props.history.push(HOME_PATH + '/orders');
                  }}>
                  <CardBody>
                    <div className="text-value text-black">{this.state.orderCount}</div>
                    <div className="text-black">All Orders</div>
                  </CardBody>
                </Card>
              </Col>
    
              <Col xs="12" sm="6" lg="3">
                <Card className="text-white bg-gradient-warning"
                      style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center', cursor: 'pointer', background:"cornflowerblue", border:'none'}}
                      onClick={() => {
                        this.props.history.push(HOME_PATH + '/service-providers');
                      }}>
                  <CardBody>
                    <div className="text-value text-black">{this.state.providerCount}</div>
                    <div className="text-black">All Providers</div>
                  </CardBody>
                </Card>
              </Col>
    
    
            </Row>
            <br/>
            <br/>
          </div>
        );
      }

}

export default Home;