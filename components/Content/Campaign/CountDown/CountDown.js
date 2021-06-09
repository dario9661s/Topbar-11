import React, { useCallback, useEffect, useState } from "react";
import { useAxios } from "../../../../hooks/useAxios";

import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker"
import {
  TextField,
  FormLayout,
  Button,
  DatePicker,
  Heading,
} from "@shopify/polaris";

const CountDown = (props) => {
  const [axios] = useAxios();
  const [startDate, setStartDate] = useState(null);
  const [{ month, year }, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(Date.now()),
    end: new Date(Date.now()),
  });

  useEffect(() => {
    if (startDate) {
      const oneDay = 1000; // hours*minutes*seconds*milliseconds
      const firstDate = startDate.end;
      const secondDate = new Date(Date.now());
      const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
      props.setTimeRemaining(diffDays);
    }
  }, [startDate]);
  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );
  console.log(startDate);
  const sendData = () => {
    axios
      .put(
        `https://mighty-hound-83.loca.lt/campaign/countdown?text=${props.countDownText}&date=${startDate.end}&finish=${props.countDownFinished}`
      )
      .then((res) => console.log(res));
  };
  const handleChangeCountDownFinished = useCallback(
    (value) => props.setCountDownFinished(value),
    []
  );
  const handleChange = useCallback(
    (value) => props.setCountDownText(value),
    []
  );
  return (
    <div className="CampaignContainer">
      <FormLayout>
        <DatePicker
          disableDatesBefore={new Date(Date.now())}
          month={month}
          year={year}
          onChange={setStartDate}
          onMonthChange={handleMonthChange}
          selected={selectedDates}
        />
        {/* <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={Date.now()}
        placeholderText="Select a date after 5 days ago"
      /> */}
        <TextField
          label="Text before Timer"
          onFocus={() => props.setCountDownFocus("timer")}
          value={props.countDownText}
          onChange={handleChange}
          type="text"
          placeholder="Sale!"
        />
        <TextField
          label="Text displayed when the timer is finished"
          onFocus={() => props.setCountDownFocus("finished")}
          value={props.countDownFinished}
          onChange={handleChangeCountDownFinished}
          type="text"
          placeholder="Timer finished!!!"
        />
        <Button onClick={() => sendData()} primary>
          Save Changes!
        </Button>
      </FormLayout>
    </div>
  );
};
export default CountDown;
