import Router from "koa-router";
import {
  postColor,
  postFontColor,
  postFontSize,
  postSize,
  postItalic
} from "../controllers/design_controller";

const router = new Router({ prefix: "/design" });

router.put("/color", async (ctx) => {
  const color = ctx.query.color;
  ctx.body = await postColor(ctx.myClient, color);
});

router.put("/fontcolor", async (ctx) => {
  const fontcolor = ctx.query.fontcolor;
  ctx.body = await postFontColor(ctx.myClient, fontcolor);
});

router.put("/fontsize", async (ctx) => {
  const fontsize = ctx.query.fontsize;
  ctx.body = await postFontSize(ctx.myClient, fontsize);
});

router.put("/size", async (ctx) => {
  const size = ctx.query.size;
  ctx.body = await postSize(ctx.myClient, size);
});
router.put("/italic", async (ctx) => {
  const italic = ctx.query.italic;
  ctx.body = await postItalic(ctx.myClient, italic);
});
export default router;
