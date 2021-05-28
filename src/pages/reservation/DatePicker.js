import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers'

function DatePicker() {

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2021-05-28T12:00")
  )

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  function disableDays(date) {
    return date.getDay() === 0 || date.getDay() === 1 || date.getDay() === 2 || date.getDay() === 3 || date.getDay() === 5 || date.getDay() === 6 || date.getDay() === 6;
  }
  const today = new Date();

  return (
    <section className="reservation__datepicker">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify='start'>
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
            'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </section>
  );
}

export default DatePicker;
