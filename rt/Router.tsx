import { Get, Router } from "@fartlabs/rtx";

const router = (
  <Router default={() => new Response("Not found", { status: 404 })}>
    <Get
      pattern="/"
      handle={() =>
        new Response("Hello, World!")}
    />
  </Router>
);

Deno.serve((request) => router.fetch(request));