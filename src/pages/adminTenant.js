import React,{Component} from 'react'
import {Container} from 'react-bootstrap'
import AdminTenantView from '../components/adminTenant/adminTenantView'


class AdminTenant extends Component {

    render(){
        return(
            <Container>
                <AdminTenantView/>
            </Container>

        )
    }
}
export default AdminTenant