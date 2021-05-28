import React, {useCallback, useEffect, useState} from "react";
import axioss from "axios";
import "react-datepicker/dist/react-datepicker.css";

import {TextField, FormLayout, Button, Heading} from "@shopify/polaris";

const link = (props) => {
  const sendData = () => {
    const data = {
      link: {
        link: props.link,
        linkText: props.linkText
      }
    }
    axioss.put("https://cleverchoicetopbar-default-rtdb.firebaseio.com/campaign.json", data).then(res => console.log(res)).then(() => {

    })
  }

  const changeLink = useCallback((value) => props.setLink(value), []);
  const changeText = useCallback((value) => props.setLinkText(value), []);
  return (
    <FormLayout>
      <TextField
        value={props.link}
        onChange={changeLink}
        type="text"
        placeholder="Text before the countdown"
      />
      <TextField
        value={props.linkText}
        onChange={changeText}
        type="text"
        placeholder="Text displayed when the countdown is finished"
      />
      <Button onClick={() => sendData()} primary>Save Changes</Button>
    </FormLayout>

  );
};
export default link;
