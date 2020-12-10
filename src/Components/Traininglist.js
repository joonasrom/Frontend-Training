import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment'

function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState('');
    const gridRef = useRef();

    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }



    const closeSnackbar = () => {
        setOpen(false);
    }

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure you want to delete this training?')){
            fetch('https://customerrest.herokuapp.com/api/trainings/' + link.data.id, {
                method: 'DELETE'
            })
            .then(_ => gridRef.current.refreshCells({rowNodes: getTrainings()}))
            .then(_ => setMsg('Training was deleted succesfully!'))
            .then(_ => setOpen(true))
            .catch(err => console.log(err))
            }
    }


    const columns = [
        { headerName: 'Date', 
        field: 'date', 
        cellRenderer: (data) => { return moment(data.value).format("MM/DD/YYYY HH:mm");}, 
        sortable: true, filter: true },
        
        { headerName: 'Duration', field: 'duration', sortable: true, filter: true },
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        { headerName: 'Customer', field: 'customer.firstname', sortable: true, filter: true },
        {
            headerName: '',
            field: 'id',
            width: 90,
            cellRendererFramework: params => 
            <Button color="secondary" size="medium"  onClick={()=> deleteTraining(params)}>
                Delete
            </Button>
        },
        
    ]

    return (
        <div>
            <div className="ag-theme-alpine" style={{ height: '700px', width: '90%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    suppressCellSelection={true}
                    onGridReady={params => {
                        gridRef.current = params.api
                    }}
                    columnDefs={columns}
                    rowData={trainings}
                    pagination="true"
                    paginationPageSize="13"
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

export default Traininglist;