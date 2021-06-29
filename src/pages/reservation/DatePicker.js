import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import axios from "axios";
import UrlService from "../../services/UrlService";

import TimePicker1 from "./TimePicker1"
import TimePicker2 from "./TimePicker2"

var reservedTimes = "Kies een datum";

function getWindowDimensions() {
  const { innerWidth: width} = window;
  return {
    width
  };
}

function getDeviceData() {
  var deviceid = window.localStorage.getItem('device');
  var date = window.localStorage.getItem('timedate');
  axios.get(UrlService.GetReservationMenu(deviceid, date), {}).then(res => {
    const data = res.data;
    if (data.length !== 0) {
      reservedTimes = "Reserveringen op deze dag: "
      data.forEach((item, i) => {
        reservedTimes = reservedTimes + item.start_time + " tot " + item.end_time + ", ";
      });
    } else {
      reservedTimes = "Er zijn op deze dag nog geen reserveringen";
    }
  });
}

function DatePicker() {
  const { width } = getWindowDimensions();
  if (width < 1024) {
    var justify = 'space-around';
  } else {
    justify = 'space-between';
  }

  const [selectedDate, setSelectedDate] = React.useState(
    null
  )

  const handleDateChange = (date) => {
    setSelectedDate(date);
    var dateFormat = require("dateformat");
    date = dateFormat(date, "yyyy-mm-dd");
    window.localStorage.setItem('timedate', date);
    //console.log("datum: " + date);
    getDeviceData();
  };

  const [isOpen, setIsOpen] = React.useState(false);

  function disableDays(date) {
    return date.getDay() === 0 || date.getDay() === 1 || date.getDay() === 2 || date.getDay() === 3 || date.getDay() === 5 || date.getDay() === 6;
  }
  const today = new Date();

  return (
    <section className="reservation__datepicker">
      <section>
        <h1> {reservedTimes} </h1>
      </section>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify={justify}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Selecteer dag:"
            minDate={today}
            shouldDisableDate={disableDays}
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              onFocus: e => {
                setIsOpen(true);
              }
            }}
            PopoverProps={{
              disableRestoreFocus: true,
              onClose: () => {
                setIsOpen(false);
              }
            }}
            InputProps={{
              onFocus: () => {
                setIsOpen(true);
              }
            }}
            open={isOpen}
          />
          <TimePicker1 />
          <TimePicker2 />
        </Grid>
      </MuiPickersUtilsProvider>
    </section>
  );
}

export default DatePicker;
