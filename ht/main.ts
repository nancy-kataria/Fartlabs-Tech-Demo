import { a } from "@fartlabs/ht";

const html = a({ href: "https://jsr.io/@fartlabs/ht" }, "@fartlabs/ht");

Deno.writeTextFileSync("index.html", html);
