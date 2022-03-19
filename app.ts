import { serve } from "https://deno.land/std@0.130.0/http/server.ts";

function handler(req: Request): Response {
    return new Response("Hello, World!");
  }

serve(handler);
