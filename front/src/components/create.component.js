import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeIP = this.onChangeIP.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      printer_ip: '',
      status:'',
      error_name:false,
      error_name_message:'',
      error_ip:false,
      error_ip_message:'',
      error_status:false,
      error_status_message:'',
      success:false,
      checked:false
    }
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeIP(e) {
    this.setState({
      printer_ip: e.target.value
    })  
  }
  onChangeStatus(e) {
    
    this.setState({
      status: !this.state.checked
    })
  }
  clear_errors(){
    this.setState({
      error_name: false,
      error_status:false,
      error_ip:false
    })
  }

  onSubmit(e) {
    e.preventDefault();
    this.clear_errors()
    const obj = {
      name: this.state.name,
      printer_ip: this.state.printer_ip,
      status: (this.state.status ? 1 : 0)
    };
    axios.post('http://localhost:4000/printers', obj)
        .then(res => {
          this.setState({
            name: '',
            printer_ip: '',
            status: '',
            success:true,
        })
          setTimeout(()=>{
            this.props.history.push('/');
          },300)

    }).catch(err=>{
      console.log(err.response.data);
       this.check_errors(err.response.data)
    });
    
    
  }
  check_errors(data){
    if(typeof data.errors.name !="undefined"){
      this.setState({
          error_name: true,
         error_name_message: data.errors.name.msg,
      }) 
    }
    if(typeof data.errors.status !="undefined"){
      // console.log(data.errors.status)
      this.setState({
        error_status: true,
         error_status_message: data.errors.status.msg,
      }) 
    }
    if(typeof data.errors.printer_ip !="undefined"){
      this.setState({
          error_ip: true,
         error_ip_message: data.errors.printer_ip.msg,
      }) 
    }
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Add New Printer</h3>
            {this.state.success &&(
                  <p className="text-success">Printer has been added successfully</p>

                )}
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Printer Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.name}
                      onChange={this.onChangeName}
                      />
                </div>
                {this.state.error_name &&(
                  <div className="error danger">{this.state.error_name_message}</div>

                )}
                <div className="form-group">
                    <label>Printer IP: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.printer_ip}
                      onChange={this.onChangeIP}
                      />
                </div>
                {this.state.error_ip &&(
                  <div className="error danger">{this.state.error_ip_message}</div>

                )}
                <div className="form-group">
                    <label>Status: </label>
                    
                      <input type="checkbox" name="status" className="check_box"
                      value={this.state.status} 
                      onChange={this.onChangeStatus }
                      defaultChecked={this.state.checked}
                      /> 
                </div>

                {this.state.error_status &&(
                  <div className="error danger">{this.state.error_status_message}</div>

                )}
                <div className="form-group">
                    <input type="submit" 
                      value="Submit" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}