import React, { useCallback } from "react";
import axioss from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, FormLayout, Button } from "@shopify/polaris";

const link = (props) => {
  const sendData = () => {
    const data = {
      link: {
        link: props.link,
        linkText: props.linkText,
      },
    };
    axioss.put(`https://cleverchoicetopbar-default-rtdb.firebaseio.com/${props.shop}/campaign.json`, data).then((res) => console.log(res));};
  const changeLink = useCallback((value) => props.setLink(value), []);
  const changeText = useCallback((value) => props.setLinkText(value), []);
  return (
    <div className="CampaignContainer">
      <FormLayout>
        <TextField
          label="Link url"
          value={props.link}
          onChange={changeLink}
          type="text"
          placeholder="www.your-product.com"
        />
        <TextField
          label="Link text"
          value={props.linkText}
          onChange={changeText}
          type="text"
          placeholder="Product name"
        />
        <Button onClick={() => sendData()} primary>
          Save Changes!
        </Button>
      </FormLayout>
    </div>
  );
};
export default link;
