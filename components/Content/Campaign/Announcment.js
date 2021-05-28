import React, {useCallback,useState} from "react";
import axioss from "axios";
import { TextField, FormLayout, List, Button, Heading} from "@shopify/polaris";
import { ResourcePicker} from '@shopify/app-bridge-react';

const  Shipping = (props) => {
  const [open, setOpen] = useState(false);
  const sendText = () => {
    let data = {
      announcement: {
        announcementText: props.announcment,
        products: props.products
      }
    }
    axioss.put("https://cleverchoicetopbar-default-rtdb.firebaseio.com/campaign.json", data).then(res => console.log(res)).then(() => {
      axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/campaign.json").then(res => {
        if (res.data) {
          props.setProducts(res.data.announcement.products)
        }
      })
    })
  }
  function handleSelection(resources) {
    const idsFromResources = resources.selection.map((product) => product);
    setOpen( false );
    props.setProducts(idsFromResources)
  }
  const handleEmptyChange = useCallback((value) => props.setAnnouncment(value), []);
  return (
    <FormLayout >
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={open}
        onCancel={() => setOpen(false)}
        onSelection={(resources) => handleSelection(resources)}
      />
      <div style={{display: "flex", flexDirection: "column"}}>
        <Heading>Selected Items:</Heading>
        <List type="bullet">
          {props.products && props.products.map((product , i) => {
            return <List.Item key = {i}>{product && product.title}</List.Item>
          })}
        </List>
        <Button onClick={() => setOpen(true)}>Select New products</Button>
      </div>
      <div className="AnnouncmenttextContainer">
        <FormLayout>
          <Heading element="h1">Announcment Text</Heading>
          <TextField
            value={props.announcment}
            onChange={handleEmptyChange}
            type="text"
            placeholder="Text which is displayed when the cart is empty"
          />
          <Button onClick={() => sendText()}>Save Changes!</Button>
        </FormLayout>
      </div>
    </FormLayout>
  );
}
export default Shipping;
