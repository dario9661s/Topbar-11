import {DataType} from "@shopify/shopify-api";
let namespace = 'cleverchoice';
let key = 'topbar';
function msg () {
  console.error(
    "Could not make the rest request as the client does not exist!"
  );
}

export async function postLink(client, link, linkText) {
  if (!client) {
    msg()
    return;
  }
  const rateMetafields = await client.get({
    path: "metafields",
  })
  rateMetafields['body']['metafields'] && rateMetafields['body']['metafields'].forEach(metafield => {
    if(metafield['namespace'] === namespace && metafield['key'] === key){
        let value = JSON.parse(metafield.value);
        value["campaign"] = {}
        value['campaign']['link'] = link;
        value['campaign']['linkText'] = linkText
        client.put({
          path: `metafields/${metafield.id}`,
          data : {
            "metafield": {
              "id": metafield.id,
              "value": JSON.stringify(value),
              "value_type": "json_string"
            }
          },
          type: DataType.JSON,
        })
    }
  })
  return "returned" ;
}

export async function postShipping(client, empty, before, after, free) {
  if (!client) {
    msg()
    return;
  }
  const rateMetafields = await client.get({
    path: "metafields",
  })
  rateMetafields['body']['metafields'] && rateMetafields['body']['metafields'].forEach(metafield => {
    if(metafield['namespace'] === namespace && metafield['key'] === key){
      let value = JSON.parse(metafield.value);
      value["campaign"] = {}
      value['campaign']['empty'] = empty
      value['campaign']['before'] = before
      value['campaign']['after'] = after
      value['campaign']['free'] = free
      client.put({
        path: `metafields/${metafield.id}`,
        data : {
          "metafield": {
            "id": metafield.id,
            "value": JSON.stringify(value),
            "value_type": "json_string"
          }
        },
        type: DataType.JSON,
      })
    }
  })
  return "return";
}

export async function postCountDown(client, text, date, finish) {
  if (!client) {
    msg()
    return;
  }
  const rateMetafields = await client.get({
    path: "metafields",
  })
  rateMetafields['body']['metafields'] && rateMetafields['body']['metafields'].forEach(metafield => {
    if(metafield['namespace'] === namespace && metafield['key'] === key){
      let value = JSON.parse(metafield.value);
      value["campaign"] = {}
      value['campaign']['text'] = text
      value['campaign']['date'] = date
      value['campaign']['finish'] = finish
      client.put({
        path: `metafields/${metafield.id}`,
        data : {
          "metafield": {
            "id": metafield.id,
            "value": JSON.stringify(value),
            "value_type": "json_string"
          }
        },
        type: DataType.JSON,
      })
    }
  })
  return "return";
}

export async function postAnnouncement(client, announcement, products) {
  if (!client) {
    msg()
    return;
  }
  let productsForFrontEnd = {}
  const rateMetafields = await client.get({
    path: "metafields",
  })
  rateMetafields['body']['metafields'] && rateMetafields['body']['metafields'].forEach(metafield => {
    if(metafield['namespace'] === namespace && metafield['key'] === key){
      let value = JSON.parse(metafield.value);
      value["campaign"] = {}
      value['campaign']['announcement'] = announcement
      value['campaign']['products'] = products
      productsForFrontEnd['products'] = products
      console.log(value)
      client.put({
        path: `metafields/${metafield.id}`,
        data : {
          "metafield": {
            "id": metafield.id,
            "value": JSON.stringify(value),
            "value_type": "json_string"
          }
        },
        type: DataType.JSON,
      })
    }
  })
  return productsForFrontEnd;
}


export async function getMetafields(client) {
  if (!client) {
    msg()
    return;
  }
  const result = await client.get({
    path: "metafields",
  });

  return result;
}
