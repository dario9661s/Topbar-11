import React, {useCallback, useEffect, useState} from "react";
import axioss from "axios";
import {TextField, FormLayout, Button, Heading} from "@shopify/polaris";

const  Shipping = (props) => {

  const sendText = () => {
    let data = {
      text: {
        empty: props.emptyText,
        after : props.moreAfter,
        before: props.moreBefore,
        freeShippin: props.free
      }
    }
    axioss.put("https://cleverchoicetopbar-default-rtdb.firebaseio.com/campaign.json", data).then(res => console.log(res))
  }
  const handleEmptyChange = useCallback((value) => props.setEmptyText(value), []);
  const handleMoreBeforeChange = useCallback((value) => props.setMoreBefore(value), []);
  const handleMoreAfterChange = useCallback((value) => props.setMoreAfter(value), []);
  const handleFreeChange = useCallback((value) => props.setFree(value), []);
  return (
        <FormLayout>
          <Heading element="h1">Top Bar Text</Heading>
          <TextField
            onBlur={()=>props.setShippingFocused(null)}
            onFocus={()=>props.setShippingFocused("empty")}
            value={props.emptyText}
            onChange={handleEmptyChange}
            type="text"
            placeholder="Text which is displayed when the cart is empty"
          />
          <div className="MoreTextContainer">
            <TextField
              onBlur={()=>props.setShippingFocused(null)}
              onFocus={()=>props.setShippingFocused("more")}
              value={props.moreBefore}
              onChange={handleMoreBeforeChange}
              type="text"
              placeholder="Text displayed when the customer still doesnt have enough items in cart for free shipping "
            />
            <p>User cart value</p>
            <TextField
              onFocus={()=>props.setShippingFocused("more")}
              onBlur={()=>props.setShippingFocused(null)}
              value={props.moreAfter}
              onChange={handleMoreAfterChange}
              type="text"
              placeholder="Text displayed when the customer still doesnt have enough items in cart for free shipping "
            />
          </div>
          <TextField
            onFocus={()=>props.setShippingFocused("free")}
            onBlur={()=>props.setShippingFocused(null)}
            value={props.free}
            onChange={handleFreeChange}
            type="text"
            placeholder="Text displayed when the customer is ready for discount"
          />
          <Button onClick={()=>sendText()}>Change Text!</Button>
        </FormLayout>
  );
}
export default Shipping;
