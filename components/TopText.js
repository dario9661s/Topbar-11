import React, {useCallback, useEffect, useState} from "react";
import axioss from "axios";
import {Form, TextField, FormLayout, Button, Heading} from "@shopify/polaris";

const  TopText = (props) => {
  const [emptyText, setEmptyText] = useState();
  const [moreBefore, setMoreBefore] = useState();
  const [moreAfter, setMoreAfter] = useState();
  const [free, setFree] = useState();

  const handleSubmit = useCallback((_event) => {
    let data = {
      empty: emptyText,
      after : moreAfter,
      before: moreBefore,
      freeShippin: free
    }
    axioss.delete("https://cleverchoicetopbar-default-rtdb.firebaseio.com/text.json").then(res=>console.log(res)).then(()=>{
      axioss.post("https://cleverchoicetopbar-default-rtdb.firebaseio.com/text.json", data).then(res=>console.log(res))
    })
  }, []);

  const handleEmptyChange = useCallback((value) => setEmptyText(value), []);
  const handleMoreBeforeChange = useCallback((value) => setMoreBefore(value), []);
  const handleMoreAfterChange = useCallback((value) => setMoreAfter(value), []);
  const handleFreeChange = useCallback((value) => setFree(value), []);
  console.log(emptyText)
  console.log(moreAfter)
  console.log(moreBefore)
  console.log(free)


  return (
    <div style={{marginTop:"30px"}}>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <Heading element="h1">Top Bar Text</Heading>
          <TextField
            value={emptyText}
            onChange={handleEmptyChange}
            type="text"
            placeholder="Text which is displayed when the cart is empty"
          />
          <div className="MoreTextContainer">
            <TextField
              value={moreBefore}
              onChange={handleMoreBeforeChange}
              type="text"
              placeholder="Text displayed when the customer still doesnt have enough items in cart for free shipping "
            />
            <p>User cart value</p>
            <TextField
              value={moreAfter}
              onChange={handleMoreAfterChange}
              type="text"
              placeholder="Text displayed when the customer still doesnt have enough items in cart for free shipping "
            />
          </div>
          <TextField
            value={free}
            onChange={handleFreeChange}
            type="text"
            placeholder="Text displayed when the customer is ready for discount"
          />
          <Button submit>Change Text!</Button>
        </FormLayout>
      </Form>
    </div>

  );
}
export default TopText;
