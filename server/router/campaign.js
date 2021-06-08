import Router from "koa-router";
import {
  postAnnouncement,
  postCountDown,
  postLink,
  postShipping,
  getMetafields
} from "../controllers/campaign_controller";

const router = new Router({ prefix: "/campaign" });

router.put("/link", async (ctx) => {
  const link = ctx.query.link;
  const linkText = ctx.query.linkText;
  ctx.body = await postLink(ctx.myClient, link, linkText);
});

router.put("/shipping", async (ctx) => {
  const empty = ctx.query.empty
  const before = ctx.query.before;
  const after = ctx.query.after;
  const free = ctx.query.freeShipping
  ctx.body = await postShipping(ctx.myClient, empty, before, after, free);
});

router.put("/countdown", async (ctx) => {
  const finish = ctx.query.finish
  const date = ctx.query.date;
  const text = ctx.query.text;
  ctx.body = await postCountDown(ctx.myClient, text, date, finish);
});

router.put("/announcement", async (ctx) => {
  const announcement = ctx.query.announcement
  const products = ctx.query.products;
  ctx.body = await postAnnouncement(ctx.myClient, announcement, products);
});

router.get("/metafields", async (ctx) => {
  ctx.body = await getMetafields(ctx.myClient);
});


export default router;
