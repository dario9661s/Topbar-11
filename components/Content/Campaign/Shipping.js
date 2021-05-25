import React, {useCallback, useEffect, useState} from "react";
import axioss from "axios";
import {TextField, FormLayout, Button, Heading} from "@shopify/polaris";

const  Shipping = (props) => {
  const sendText = () => {
    let data = {
      empty: props.emptyText,
      after : props.moreAfter,
      before: props.moreBefore,
      freeShippin: props.free
    }
    axioss.delete("https://cleverchoicetopbar-default-rtdb.firebaseio.com/textAnnouncment.json").then(res=>console.log(res)).then(()=>{
      axioss.delete("https://cleverchoicetopbar-default-rtdb.firebaseio.com/text.json").then(res=>console.log(res)).then(()=>{
        axioss.post("https://cleverchoicetopbar-default-rtdb.firebaseio.com/text.json", data).then(res=>console.log(res)).then(()=> {
          axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/text.json").then(res=>{
            if (res.data){
              props.setEmptyText(Object.values(res.data)[0].before)
              props.setFree(Object.values(res.data)[0].freeShippin)
              props.setMoreAfter(Object.values(res.data)[0].after)
              props.setMoreBefore(Object.values(res.data)[0].before)
            }
          })
        })
      })
    })
  }
  const handleEmptyChange = useCallback((value) => props.setEmptyText(value), []);
  const handleMoreBeforeChange = useCallback((value) => props.setMoreBefore(value), []);
  const handleMoreAfterChange = useCallback((value) => props.setMoreAfter(value), []);
  const handleFreeChange = useCallback((value) => props.setFree(value), []);
  return (
        <FormLayout>
          <Heading element="h1">Top Bar Text</Heading>
          <TextField
            value={props.emptyText}
            onChange={handleEmptyChange}
            type="text"
            placeholder="Text which is displayed when the cart is empty"
          />
          <div className="MoreTextContainer">
            <TextField
              value={props.moreBefore}
              onChange={handleMoreBeforeChange}
              type="text"
              placeholder="Text displayed when the customer still doesnt have enough items in cart for free shipping "
            />
            <p>User cart value</p>
            <TextField
              value={props.moreAfter}
              onChange={handleMoreAfterChange}
              type="text"
              placeholder="Text displayed when the customer still doesnt have enough items in cart for free shipping "
            />
          </div>
          <TextField
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
