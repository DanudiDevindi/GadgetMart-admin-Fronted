import React, {Component} from 'react';
import axios from '../../../axios';
import {message} from 'antd';
import 'antd/dist/antd.css';
import '../../../css/custom.css';
import Cookie from 'js-cookie';

import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
  } 
  from 'reactstrap';
import img from '../../../assets/img/brand/gadget_mart.png';
import {HOME_PATH} from "../../../routes";



class Login extends Component {

    state = {
        loading: false,
        userName: '',
        password: ''
      };

      UNSAFE_componentWillMount(){
        if (Cookie.get('access_token') !== undefined) {
          if (Cookie.get('userRole') === "EMPLOYEE") {
            this.props.history.push(HOME_PATH+'/add');
          } else {
            this.props.history.push(HOME_PATH+'/home');
          }
        }
      }
    
      changeHandler = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      };
    
      clickLogin = (e) => {
   
      if (this.state.userName !== "" && this.state.password !== "") {
          axios.post(
            '/auth/login', {
              username: this.state.userName,
              password: this.state.password
            })
            .then(res => {
              if (res.data.state) {
                if (res.data.userType !== "ADMIN") {
                  message.error({
                    top: 100,
                    duration: 1,
                    maxCount: 3,
                    rtl: true,
                    content: 'Action prohibited',
                    onClose: {}
                  });
                } else {
                  localStorage.setItem('login_response', JSON.stringify(res));
                  Cookie.set('logged', 'true', {path: '/', expires: 7});
                  Cookie.set('userId', res.data.userId, {path: '/', expires: 7});
                  Cookie.set('userRole', res.data.userType, {path: '/', expires: 7});
                  Cookie.set('firstName', 'Super', {path: '/', expires: 7});
                  Cookie.set('lastName', 'Admin', {path: '/', expires: 7});
                  Cookie.set('access_token', res.data.token, {path: '/', expires: 7});
                  this.props.history.push(HOME_PATH+'/home');
                }
              } else {
                message.error({
                  top: 100,
                  duration: 1,
                  maxCount: 3,
                  rtl: true,
                  content: res.data.message,
                  onClose: {}
                });
              }
            })
            .catch(err => {
              message.error({
                top: 100,
                duration: 2,
                maxCount: 3,
                rtl: true,
                content: 'User Not Found!'
              });
    
            });
        } else {
          message.warning({
            top: 100,
            duration: 2,
            maxCount: 3,
            rtl: true,
            content: "Empty User Name, Password!"
          });
        }
    
      };
     

    render() {
        return (
          <div className="app flex-row align-items-center">
    
    
            <Container>
              <Row className="justify-content-center">
                <Col xs="10" sm="10" md="6" lg="5" xl="4">
                  <img src={img} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-5"/>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs="12" sm="12" md="8" lg="7" xl="6">
                  <CardGroup>
                    <Card className="p-4">
                      <CardBody>
                        <Form>
                          <h1 className="text-center">Login</h1>
                          <p className="text-muted text-center">Sign In to your account</p>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              value={this.state.userName}
                              type="text"
                              name="userName"
                              onChange={this.changeHandler}
                              placeholder="Username"
                              autoComplete="username"
                            />
                          </InputGroup>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              value={this.state.password}
                              type="password"
                              name="password"
                              onChange={this.changeHandler}
                              placeholder="Password"
                              autoComplete="current-password"
                            />
                          </InputGroup>
                          <Row className="submit">
                            <div>
                              <Button color="primary" onClick={() =>this.clickLogin()} 
                              style={{'float': 'right'}}>Login</Button>
                            </div>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                    {/*<Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>*/}
                    {/*<CardBody className="text-center">*/}
                    {/*<div>*/}
                    {/*<h2>Sign up</h2>*/}
                    {/*<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut*/}
                    {/*labore et dolore magna aliqua.</p>*/}
                    {/*<Link to="/register">*/}
                    {/*<Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>*/}
                    {/*</Link>*/}
                    {/*</div>*/}
                    {/*</CardBody>*/}
                    {/*</Card>*/}
                  </CardGroup>
                </Col>
              </Row>
            </Container>
          </div>
        );
      }

}

export default Login;
