import React, { useCallback, useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import {
  TextField,
  FormLayout,
  Button,
  ResourceList,
  ResourceItem,
  Thumbnail,
  TextStyle,
} from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";

const Shipping = (props) => {
  const [axios] = useAxios();
  const [open, setOpen] = useState(false);
  console.log(props.products);
  const sendText = () => {
    let products = props.products.map((product) => {
      return {
        name:product.name,
        handle: product.handle,
        src: product.src,
        alt: product.alt,
        price: product.price,
        id: product.id,
        url: product.url
      };
    });

    console.log(products);
    console.log(props.announcment);
    axios
      .put(
        `https://massive-frog-5.loca.lt/campaign/announcement?announcement=${
          props.announcment
        }&products=${JSON.stringify(products)}`
      )
      .then((res) => {
        if (res.data) {
          console.log(res.data);
        }
      });
  };
  console.log(props.products);

  function handleSelection(resources) {
    console.log(resources)
    const idsFromResources = resources.selection.map((product) => {
      return {
        name: product.title,
        handle: product.handle,
        src: product.images[0] ? product.images[0].originalSrc : "",
        alt: product.images[0] ? product.images[0].altText : "",
        price: product.variants[0].price,
        id: product.id,
        url: product.url
      }
    });
    setOpen(false);
    console.log(idsFromResources)
    props.setProducts(idsFromResources);
  }
  const handleEmptyChange = useCallback(
    (value) => props.setAnnouncment(value),
    []
  );
  return (
    <div className="CampaignContainer">
    <FormLayout>
      <ResourcePicker
        selectMultiple={5}
        resourceType="Product"
        showVariants={false}
        open={open}
        onCancel={() => setOpen(false)}
        onSelection={(resources) => handleSelection(resources)}
      />
      <ResourceList
        resourceName={{ singular: "customer", plural: "customers" }}
        items={props.products}
        renderItem={(item) => {
          const { id, url } = item;
          const media = (
            <Thumbnail
              source={item.src}
              alt={item.alt}
            />
          );
          return (
            <ResourceItem
              id={id}
              url={url}
              media={media}
              accessibilityLabel={`View details for ${item.name}`}
            >
              <h3>
                <TextStyle variation="strong">{item.name}</TextStyle>
              </h3>
              <div>{item.price}</div>
            </ResourceItem>
          );
        }}
      />
      <div style={{ height: "60px" }}>
        <Button onClick={() => setOpen(true)}>Select New products</Button>
      </div>
      <FormLayout>
        <TextField
          label="Announcement text"
          value={props.announcment}
          onChange={handleEmptyChange}
          type="text"
          placeholder="Text displayed before item links"
        />
        <Button primary onClick={() => sendText()}>
          Save Changes!
        </Button>
      </FormLayout>
    </FormLayout>
  </div>
  );
};
export default Shipping;
