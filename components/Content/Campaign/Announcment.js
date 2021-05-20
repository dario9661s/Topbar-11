import React, {useCallback, useEffect, useState} from "react";
import axioss from "axios";
import { TextField, FormLayout, Button, Heading} from "@shopify/polaris";
import { ResourcePicker} from '@shopify/app-bridge-react';

const  Shipping = (props) => {
  const [announcment, setAnnouncment] = useState();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/text.json").then(res=>{
      if(res.data){
        setAnnouncment(Object.values(res.data)[0].before)
      }
    })
  }, []);

  const sendText = () => {
    let data = {
      announcmentText: announcment,
      products: products
    }
    axioss.delete("https://cleverchoicetopbar-default-rtdb.firebaseio.com/text.json").then(res=>console.log(res)).then(()=> {
      axioss.delete("https://cleverchoicetopbar-default-rtdb.firebaseio.com/textAnnouncment.json").then(res=>console.log(res)).then(()=>{
        axioss.post("https://cleverchoicetopbar-default-rtdb.firebaseio.com/textAnnouncment.json", data).then(res=>console.log(res))
      })
    })

  }
  console.log(products)

  function handleSelection(resources) {
    const idsFromResources = resources.selection.map((product) => product);
    setOpen( false );
    setProducts(idsFromResources)
  }

  const handleEmptyChange = useCallback((value) => setAnnouncment(value), []);

  return (
    <FormLayout>
      <Button onClick={()=> setOpen(true)}>Select products</Button>
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={open}
        onCancel={() => setOpen( false )}
        onSelection={(resources) => handleSelection(resources)}
      />
      <Heading element="h1">Announcment Text</Heading>
      <TextField
        value={announcment}
        onChange={handleEmptyChange}
        type="text"
        placeholder="Text which is displayed when the cart is empty"
      />
      <Button onClick={()=>sendText()}>Change Text!</Button>
    </FormLayout>
  );
}
export default Shipping;
