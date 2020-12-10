import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function EditCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = useState({
      firstname: '',
      lastname: '', 
      streetaddress: '', 
      postcode: '', 
      city: '', 
      email: '', 
      phone: ''
    })


    const handleClickOpen = () => {
      console.log(props.params)
        setCustomer({
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
            phone: props.params.data.phone
        })
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value });
      };

      const saveCustomer = () => {
          props.updateCustomer(props.params.value[0].href, customer);
          handleClose();
      }
  
    return (
      <div>
        <Button style={{ background: '#ff9e80' }}  onClick={handleClickOpen}>
          Edit
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit existing customer</DialogTitle>
          <DialogContent>

            <TextField
              margin="dense"
              name="firstname"
              value={customer.firstname}
              onChange={e => inputChanged(e)}
              label="Firstname"
              fullWidth
            />
            <TextField
              margin="dense"
              name="lastname"
              value={customer.lastname}
              onChange={e => inputChanged(e)}
              label="Lastname"
              fullWidth
            />
            <TextField
              margin="dense"
              name="streetaddress"
              value={customer.streetaddress}
              onChange={e => inputChanged(e)}
              label="Street address"
              fullWidth
            />
            <TextField
              margin="dense"
              name="postcode"
              value={customer.postcode}
              onChange={e => inputChanged(e)}
              label="Postcode"
              fullWidth
            />
            <TextField
              margin="dense"
              name="city"
              value={customer.city}
              onChange={e => inputChanged(e)}
              label="City"
              fullWidth
            />
            <TextField
              margin="dense"
              name="email"
              value={customer.email}
              onChange={e => inputChanged(e)}
              label="Email"
              fullWidth
            />
            <TextField
              margin="dense"
              name="phone"
              value={customer.phone}
              onChange={e => inputChanged(e)}
              label="Phone"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{ background: '#ff9e80' }}>
              Cancel
            </Button>
            <Button onClick={saveCustomer} style={{ background: '#ff9e80' }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default EditCustomer;