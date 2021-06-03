import React, { useCallback, useState } from "react";
import axioss from "axios";
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
  const [open, setOpen] = useState(false);
  const sendText = () => {
    let data = {
      announcement: {
        announcementText: props.announcment,
        products: props.products,
      },
    };
    axioss
      .put(
        `https://cleverchoicetopbar-default-rtdb.firebaseio.com/${props.shop}/campaign.json`,
        data
      )
      .then((res) => console.log(res))
      .then(() => {
        axioss
          .get(
            `https://cleverchoicetopbar-default-rtdb.firebaseio.com/${props.shop}/campaign.json`
          )
          .then((res) => {
            if (res.data) {
              props.setProducts(res.data.announcement.products);
            }
          });
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
          selectMultiple = {5}
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
