import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from './modal';
export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {printers: [], active_id:null, show:false};
      this.execdelete = this.execdelete.bind(this);
    }
    delete(printer) {
        this.setState({
          active_id:printer.id
        },this.showModal)
       
    }
    execdelete(){
      
       axios.delete('http://localhost:4000/printers/'+this.state.active_id)
            .then(d=>{
              this.get_printers()
              this.hideModal()
            })
            .catch(err => console.log(err))
    }
    componentDidMount(){
     this.get_printers()
    }
    get_printers(){

       axios.get('http://localhost:4000/printers/')
        .then(response => {
          this.setState({ printers: response.data.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    showModal = () => {
      this.setState({ show: true });
    };

    hideModal = () => {
      this.setState({ show: false, active_id:null});
    };

    

    render() {
      return (
        <div>
          <h3 align="center">Printers List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>IP Address</th>
                <th>Status</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.state.printers.map((printer) =>(
                   <tr
                    key={printer.id}
                    >
                    <td>
                      {printer.name}
                    </td>
                    <td>
                      {printer.printer_ip}
                    </td>
                    <td>
                      {printer.status &&(
                          <span>Active</span>
                        )}
                      {!printer.status &&(
                          <span>InActive</span>
                        )}
                    </td>
                    <td>
                      <Link to={"/edit/"+printer.id} className="btn btn-primary">Edit</Link>
                    </td>
                    <td>
                      <a href="#" onClick={()=>{
                        this.delete(printer)
                      }} className="btn btn-danger" data-target="#deletemodel" data-toggle="modal">Delete</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Modal
                    className="modal"
                    show={this.state.show}
                    close={this.hideModal}
                    delete={this.execdelete}>
                       Are you sure you want to delete this Printer?
                </Modal>
          
        </div>
      );
    }
  }