import React, { Component } from 'react'
import CustomersService from './CustomersService'

const customerservice = new CustomersService()

class CustomersList extends Component {

    constructor(props){
        super(props);
        this.state =  {
            customers: [],
            nextPageURL: '',
            previousPageURL: '',
            number_of_pages: '',
            total_pages: []
        }
    
        this.getPage = this.getPage.bind(this) 
        this.nextPage = this.nextPage.bind(this) 
        this.previusPage = this.previusPage.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount(){
        var self = this
        let list = []
        customerservice.getCustomers().then(function (results){
            console.log(results)
            for(let i = 1;i < results.total_pages;i++){
                list.push(i)
            }
            self.setState({
                customers: results.data , 
                nextPageURL: results.next, 
                previousPageURL: results.previous,
                total_pages: list
            })
        })
        // console.log(this.state)
    }

    handleDelete(e, pk){
        var self = this
        customerservice.deleteCustomer(pk).then(()=>{
            var newArr = self.state.customers.filter(function(obj){
                return obj.pk !== pk;
            })
            self.setState({customers: newArr})
        })
    }

    nextPage(){
        var self =  this;
        if (this.state.nextPageURL){
            customerservice.getCustomersByURL(this.state.nextPageURL).then((results) => {
                self.setState({
                    customers: results.data, 
                    nextPageURL: results.next,
                    previousPageURL: results.previous
                })
            })
        }else{
            alert('this is the last page')
        }
    }

    getPage(event){
        var self =  this;
        customerservice.getCustomersByURL(`http://localhost:8000/api/customers/?page=${event.currentTarget.value}`).then((results) => {
            console.log(results)
            self.setState({
                customers: results.data, 
                nextPageURL: results.next,
                previousPageURL: results.previous
            })
        })
    }

    previusPage(){
        var self =  this;
        if (this.state.previousPageURL){
            customerservice.getCustomersByURL(this.state.previousPageURL).then((results) => {
                self.setState({
                    customers: results.data, 
                    nextPageURL: results.next,
                    previousPageURL: results.previous
                })
            })
        }else{
            alert('this is the first page')
        }
    }

    render(){
        return(
            <div className=''>
                <table className="table">
                    <thead key="thead">
                        <tr>
                            <th>#</th>
                            <th>FIRST NAME</th>
                            <th>LAST NAME</th>
                            <th>PHONE</th>
                            <th>EMAIL</th>
                            <th>ADDRESS</th>
                            <th>DESCRIPTION</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.customers.map( c => 
                            <tr key={c.pk}>
                                <td> {c.pk }</td>
                                <td>
                                <a  href={`/customers/${c.pk}/`}> {c.first_name}</a>
                                </td>
                                <td>{c.last_name}</td>
                                <td>{c.phone}</td>
                                <td>{c.email}</td>
                                <td>{c.address}</td>
                                <td>{c.description}</td>
                                <td>
                                    <button  className="btn btn-danger" 
                                        onClick={(e)=> this.handleDelete(e, c.pk)}>
                                            Delete
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <button className="page-link" onClick={this.previusPage} tabIndex="-1">Previous </button>
                            
                            {this.state.total_pages.map((page, index) => 
                                <li className="page-item" key={index} >
                                    <button className="page-link" value={page} onClick={this.getPage} > {page} </button>
                                </li>
                            )}
                            <li className="page-item">
                            <button className="page-link" onClick={this.nextPage}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
    
}
export default CustomersList;