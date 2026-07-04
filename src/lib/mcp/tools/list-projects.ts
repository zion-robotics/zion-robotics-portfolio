import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "../../../data/projectsData.js";

export default defineTool({
  name: "list_projects",
  title: "List portfolio projects",
  description: "Return all featured projects in Adeogun Daniel Joseph's portfolio with descriptions, tags, and live URLs.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(projects, null, 2) }],
    structuredContent: { projects },
  }),
});
