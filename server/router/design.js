import Router from "koa-router";
import { postColor } from "../controllers/design_controller";

const router = new Router({ prefix: "/design" });

router.put("/design", async (ctx) => {
  const italic = ctx.query.italic;
  const size = ctx.query.size;
  const color = ctx.query.color;
  const fontsize = ctx.query.fontsize;
  const fontcolor = ctx.query.fontcolor;
  ctx.body = await postColor(
    ctx.myClient,
    color,
    italic,
    size,
    fontsize,
    fontcolor
  );
});

export default router;
