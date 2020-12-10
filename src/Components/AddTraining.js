import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker  } from "@material-ui/pickers";

function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [training, setTraining] = useState({date: '', duration: '', activity: '', customer: props.params.value,})


    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

    const handleChange = (date) => {

        setDate(date);
        setTraining({...training, date: date })

    };

    const handleSave = () => {
        props.addTraining(training);
        console.log(training);
        handleClose();
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return(
       <div>
           <Button style={{ background: '#ff9e80' }}  onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New customer</DialogTitle>
            <DialogContent>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify='space-around'>
                    <DateTimePicker
                        variant="inline"
                        name="date"
                        value={training.date}
                        format="MM/dd/yyy HH:mm"
                        selected={training.date}
                        onChange={handleChange}
                        animateYearScrolling
                    />
                </Grid>
            </MuiPickersUtilsProvider>
                

                 <TextField
                 margin="dense"
                 name="duration"
                 value={training.duration}
                 onChange={inputChanged}
                 label="duration"
                 fullWidth
                />

                 <TextField
                 margin="dense"
                 name="activity"
                 value={training.activity}
                 onChange={inputChanged}
                 label="activity"
                 fullWidth
                />

            </DialogContent>

            <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>

            </Dialog>
       </div>
    );
}

export default AddTraining;