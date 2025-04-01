import { Router } from "@fartlabs/rt";

const router = new Router()
  .get("/", () => new Response("Hello, World!"))
  .default(() => new Response("Not found", { status: 404 }));
  
Deno.serve((request) => router.fetch(request));