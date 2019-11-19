import  React, {Component} from 'react'
import  { Redirect } from 'react-router-dom'

import  CustomersService from './CustomersService'

const customersService = new CustomersService()

class  CustomersCreateUpdate extends Component{
    constructor(props){
        super(props)
        // this.clean_form = this.clean_form.bind(this)
        this.handleUpdate = this.handleUPdate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        const { match: {params}} = this.props
        
        if (params && params.pk){
            customersService.getCustomer(params.pk).then((c) => {
                this.refs.firstName.value = c.first_name
                this.refs.lastName.value = c.last_name
                this.refs.email.value = c.email
                this.refs.phone.value = c.phone
                this.refs.address.value = c.address
                this.refs.description.value = c.description    
            })
        }
    }

    clean_form(){
        this.refs.firstName.value = ''
        this.refs.lastName.value = ''
        this.refs.email.value = ''
        this.refs.phone.value = ''
        this.refs.address.value = ''
        this.refs.description.value = ''
    }

    handleCreate(){
        customersService.createCustomers({
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "email": this.refs.email.value,
            "phone": this.refs.phone.value,
            "address": this.refs.address.value,
            "description": this.refs.description.value
        }).then((result)=> {
            alert('Customer Create!')
            this.clean_form()
        }).catch(()=>{
            alert('There was na error ! Please re-check your form')
        })
    }

    handleUPdate(pk){
        customersService.updateCustomers({
            "pk": pk,
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "email": this.refs.email.value,
            "phone": this.refs.phone.value,
            "address": this.refs.address.value,
            "description": this.refs.description.value
        }).then((result)=> {
            alert('Customer Updated!')
            this.clean_form()
        }).catch(()=>{
            alert('There was na error ! Please re-check your form')
        })
    }


    handleSubmit(event){
        event.preventDefault()
        const { match: {params}} = this.props
        if(params  &&  params.pk){
            this.handleUpdate(params.pk)
        }else{
            this.handleCreate()
        }

    }

    render(){
        var divStyle = {
            padding: "40px",
          };
          
        return(
            <div className="container col-md-6 " style={divStyle}>
                <form>
                    <div className='form-group'>
                        <input  type="hidden" ref="pk"/>
                        <label> First Name:</label>
                        <input className="form-control" type="text" ref="firstName" />

                        <label> Last Name:</label>
                        <input className="form-control" type="text" ref="lastName"/>

                        <label> Phone:</label>
                        <input className="form-control" type="text" ref="phone"/>

                        <label>  Email:</label>
                        <input className="form-control" type="text" ref="email"/>

                        <label> Address:</label>
                        <input className="form-control" type="text" ref="address"/>

                        <label> Description:</label>
                        <textarea className="form-control" type="text" ref="description"></textarea>

                    </div>
                        <input className="btn btn-primary" type="submit" value="submit" onClick={this.handleSubmit}/>
                </form>
            </div>
            
        )
    }
}
export default CustomersCreateUpdate