import React from "react";
import { useAxios } from "../../../hooks/useAxios";
import { TextField, FormLayout, Button, TextStyle } from "@shopify/polaris";

const Shipping = (props) => {
  const [axios] = useAxios();
  const sendText = () => {
    axios
      .put(
        `https://funny-goat-3.loca.lt/campaign/shipping?empty=${props.shipping.emptyText}&after=${props.shipping.moreAfter}&before=${props.shipping.moreBefore}&freeShipping=${props.shipping.free}`
      )
      .then((res) => res);
  };

  return (
      <FormLayout>
        {props.activeCampaign === "Shipping" ?<TextStyle variation="positive">Active</TextStyle> : null}
        <TextField
          label="Empty cart Text"
          onFocus={() => props.setShipping({...props.shipping, shippingFocused:"empty"})}
          value={props.shipping.emptyText}
          onChange={(value)=>props.setShipping({...props.shipping, emptyText:value})}
          type="text"
          placeholder="Cart is empty!"
        />
        <FormLayout.Group>
          <TextField
            label="Text before user cart value"
            onFocus={() => props.setShipping({...props.shipping, shippingFocused:"more"})}
            value={props.shipping.moreBefore}
            onChange={(value)=>props.setShipping({...props.shipping, moreBefore:value})}
            type="text"
            placeholder="Add more items"
          />
          <div className="CartValue">
            <p>User cart value</p>
          </div>
          <TextField
            label="Text after user cart value "
            onFocus={() => props.setShipping({...props.shipping, shippingFocused:"more"})}
            value={props.shipping.moreAfter}
            onChange={(value)=>props.setShipping({...props.shipping, moreAfter:value})}
            type="text"
            placeholder="For free shipping"
          />
        </FormLayout.Group>
        <TextField
          label="Free shipping text"
          onFocus={() => props.setShipping({...props.shipping, shippingFocused: "free"})}
          value={props.shipping.free}
          onChange={(value)=>props.setShipping({...props.shipping, free: value})}
          type="text"
          placeholder="Free shiping!!!"
        />
        <Button primary onClick={() => sendText()}>
          Save Changes!
        </Button>
      </FormLayout>
  );
};
export default Shipping;
