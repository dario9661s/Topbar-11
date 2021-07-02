import React, { useCallback } from "react";
import { useAxios } from "../../../hooks/useAxios";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, FormLayout, Button, TextStyle } from "@shopify/polaris";

const link = (props) => {
  const [axios] = useAxios();
  const sendData = () => {
    axios
      .put(
        `https://dejri-123.loca.lt/campaign/link?link=${props.link}&linkText=${props.linkText}`
      )
      .then((res) => console.log(res));
  };
  const changeLink = useCallback((value) => props.setLink(value), []);
  const changeText = useCallback((value) => props.setLinkText(value), []);
  return (
      <FormLayout>
        {props.activeCampaign === "Link" ?<TextStyle variation="positive">Active</TextStyle> : null}
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
  );
};
export default link;
