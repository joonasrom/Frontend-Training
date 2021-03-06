import React,  { useState, useEffect } from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';

function CustomerCalendar() {
    const [session, setSession] = useState([]);
    const localizer = momentLocalizer(moment);

    const getData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(trainings => {
                return setSession(
                    trainings.map((training, i) => ({

                        id: i,
                        title: training.activity + " / " + training.customer.firstname + " " + training.customer.lastname + " / " + moment(training.date).format("HH:mm"),

                        start: moment(training.date)._d,

                        end: moment(training.date).add(training.duration, 'minutes')._d                        
                }))
                )
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getData();
    }, [])

    return (

        <div>
        <Calendar
        events={session}
        startAccessor="start"
        endAccessor="end"
        localizer={localizer}
        style={{height: "1100px"}}
        />
        </div>
    )
}

export default CustomerCalendar;
