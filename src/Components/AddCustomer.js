import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function AddCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = useState({firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''})
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value });
      };

      const handleSave = () => {
          props.addCustomer(customer);
          handleClose();
      }
  
    return (
      <div>
        <Button variant="contained" size="large" style={{ background: '#ff9e80' }} onClick={handleClickOpen}>
          Add customer
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New customer</DialogTitle>
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
            <Button onClick={handleSave} style={{ background: '#ff9e80' }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default AddCustomer;