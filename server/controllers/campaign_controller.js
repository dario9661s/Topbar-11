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
        const picked = (({ rates }) => ({ rates }))(value)
        picked['link'] = link;
        picked['linkText'] = linkText
        client.put({
          path: `metafields/${metafield.id}`,
          data : {
            "metafield": {
              "id": metafield.id,
              "value": JSON.stringify(picked),
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
      const picked = (({ rates }) => ({ rates }))(value)
      picked['empty'] = empty
      picked['before'] = before
      picked['after'] = after
      picked['free'] = free
      client.put({
        path: `metafields/${metafield.id}`,
        data : {
          "metafield": {
            "id": metafield.id,
            "value": JSON.stringify(picked),
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
      const picked = (({ rates }) => ({ rates }))(value)
      picked['text'] = text
      picked['date'] = date
      picked['finish'] = finish
      client.put({
        path: `metafields/${metafield.id}`,
        data : {
          "metafield": {
            "id": metafield.id,
            "value": JSON.stringify(picked),
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
      const picked = (({ rates }) => ({ rates }))(value)
      picked['announcement'] = announcement
      picked['products'] = products
      productsForFrontEnd['products'] = products
      console.log(picked)
      client.put({
        path: `metafields/${metafield.id}`,
        data : {
          "metafield": {
            "id": metafield.id,
            "value": JSON.stringify(picked),
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
