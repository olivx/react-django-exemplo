import axios from 'axios'
const API_URL = 'http://localhost:8000';

export default class CustomersService{

    getCustomers(){
        const url = `${API_URL}/api/customers/`
        return axios.get(url).then(reposnse => reposnse.data)
    }

    getCustomersByURL(link){
        const url = `${link}`
        return axios.get(url).then(reponse => reponse.data)
    }

    getCustomer(pk){
        const url = `${API_URL}/api/customers/${pk}/`
        return axios.get(url).then(response => response.data)
    }

    deleteCustomer(pk){
        const url = `${API_URL}/api/customers/${pk}/`
        return axios.delete(url)
    }

    updateCustomers(customers){
        const url  = `${API_URL}/api/customers/${customers.pk}/`
        console.log(customers)
        return axios.patch(url, customers)
    }

    createCustomers(customers){
        const url  = `${API_URL}/api/customers/`
        console.log(url, customers)
        return axios.post(url, customers)
    }



}