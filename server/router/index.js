import combineRouters from "koa-combine-routers";
import scriptTagRouter from "./script_tag";
import campaign from "./campaign"

const router = combineRouters(scriptTagRouter, campaign);

export default router;
