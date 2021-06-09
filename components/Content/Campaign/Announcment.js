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
        name: product.title,
        handle: product.title,
      };
    });

    console.log(products);
    console.log(props.announcment);
    axios
      .put(
        `https://mighty-hound-83.loca.lt/campaign/announcement?announcement=${
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
    const idsFromResources = resources.selection.map((product) => product);
    setOpen(false);
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
                source={item.images[0] ? item.images[0].originalSrc : ""}
                alt={item.images[0] ? item.images[0].altText : ""}
              />
            );

            return (
              <ResourceItem
                id={id}
                url={url}
                media={media}
                accessibilityLabel={`View details for ${item.title}`}
              >
                <h3>
                  <TextStyle variation="strong">{item.title}</TextStyle>
                </h3>
                <div>{item.variants[0].price}</div>
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
