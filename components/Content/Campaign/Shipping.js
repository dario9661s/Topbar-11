import React, { useCallback } from "react";
import {useAxios} from "../../../hooks/useAxios";
import { TextField, FormLayout, Button } from "@shopify/polaris";

const Shipping = (props) => {
  const [axios] = useAxios();
  const sendText = () => {
    axios
      .put(
        `https://blue-emu-26.loca.lt/campaign/shipping?empty=${props.emptyText}&after=${props.moreAfter}&before=${props.moreBefore}&freeShipping=${props.free}`
      )
      .then((res) => console.log(res));
  };
  const handleEmptyChange = useCallback(
    (value) => props.setEmptyText(value),
    []
  );
  const handleMoreBeforeChange = useCallback(
    (value) => props.setMoreBefore(value),
    []
  );
  const handleMoreAfterChange = useCallback(
    (value) => props.setMoreAfter(value),
    []
  );
  const handleFreeChange = useCallback((value) => props.setFree(value), []);
  return (
    <div className="CampaignContainer">
      <FormLayout>
        <TextField
          label="Empty cart Text"
          onFocus={() => props.setShippingFocused("empty")}
          value={props.emptyText}
          onChange={handleEmptyChange}
          type="text"
          placeholder="Cart is empty!"
        />
        <FormLayout.Group>
          <TextField
            label="Text before user cart value"
            onFocus={() => props.setShippingFocused("more")}
            value={props.moreBefore}
            onChange={handleMoreBeforeChange}
            type="text"
            placeholder="Add more items"
          />
          <div className="CartValue">
            <p>User cart value</p>
          </div>
          <TextField
            label="Text after user cart value "
            onFocus={() => props.setShippingFocused("more")}
            value={props.moreAfter}
            onChange={handleMoreAfterChange}
            type="text"
            placeholder="For free shipping"
          />
        </FormLayout.Group>

        <TextField
          label="Free shipping text"
          onFocus={() => props.setShippingFocused("free")}
          value={props.free}
          onChange={handleFreeChange}
          type="text"
          placeholder="Free shiping!!!"
        />
        <Button primary onClick={() => sendText()}>Save Changes!</Button>
      </FormLayout>
    </div>

  );
};
export default Shipping;
