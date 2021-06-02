import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'

import TimePicker1 from "./TimePicker1"
import TimePicker2 from "./TimePicker2"

function DatePicker() {

  const [selectedDate, setSelectedDate] = React.useState(
    null
  )

  const handleDateChange = (date) => {
    setSelectedDate(date);
    window.localStorage.setItem('timedate', date);
  };

  const [isOpen, setIsOpen] = React.useState(false);

  function disableDays(date) {
    return date.getDay() === 0 || date.getDay() === 1 || date.getDay() === 2 || date.getDay() === 3 || date.getDay() === 5 || date.getDay() === 6;
  }
  const today = new Date();

  return (
    <section className="reservation__datepicker">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify='space-between'>
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
