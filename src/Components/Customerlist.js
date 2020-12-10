import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState('');
    const gridRef = useRef();

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            fetch(link, {
                method: 'DELETE'
            })
                .then(_ => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
                .then(_ => setOpen(true))
                .then(_ => setMsg('Customer was deleted succesfully'))
                .catch(err => console.error(err))
        }
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(_ => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
            .catch(err => console.error(err))
    }

    const addTraining= (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(training)
        })
        .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
        .then(_ => setMsg('Training was added succesfully!'))
        .then(_ => setOpen(true))
        .catch(err => console.log(err))
    }

    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(_ => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
            .then(_ => setOpen(true))
            .then(_ => setMsg('Customer was updated succesfully'))
            .catch(err => console.error(err))
    }

    const columns = [
        { headerName: 'Firstname', field: 'firstname', sortable: true, filter: true },
        { headerName: 'Lastname', field: 'lastname', sortable: true, filter: true },
        { headerName: 'Address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
        {
            headerName: '',
            field: 'links.0.href',
            cellRendererFramework: params => <AddTraining addTraining={addTraining} params={params}/>
        },
        {
            headerName: '',
            width: 150,
            field: 'links',
            cellRendererFramework: params => <div><EditCustomer updateCustomer={updateCustomer} params={params} />
               
            </div>
    
        },
        
        {
            headerName: '',
            width: 90,
            field: 'links.0.href',
            cellRendererFramework: params => <div><Button  color="secondary" size="medium" onClick={() => deleteCustomer(params.value)}>Delete</Button>
               
            </div>
        }
        
    ]

    return (
        <div>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-alpine" style={{ height: '900px', width: '90%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    suppressCellSelection={true}
                    onGridReady={params => {
                        gridRef.current = params.api
                    }}
                    columnDefs={columns}
                    rowData={customers}
                    pagination="true"
                    paginationPageSize="19"
                >
                </AgGridReact>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={3000}
                    onClose={closeSnackbar}
                    message={msg}
                />
            </div>
        </div>
    );
}

export default Customerlist;