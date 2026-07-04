import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "../../../data/projectsData.js";

export default defineTool({
  name: "get_project",
  title: "Get project details",
  description: "Get full details of one portfolio project by its title (case-insensitive substring match).",
  inputSchema: {
    title: z.string().min(1).describe("Project title or substring, e.g. 'litepress', 'ingenium', 'bioresonance'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ title }) => {
    const q = title.toLowerCase();
    const match = projects.find((p: any) => p.title.toLowerCase().includes(q));
    if (!match) {
      return { content: [{ type: "text", text: `No project matches "${title}".` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(match, null, 2) }],
      structuredContent: { project: match },
    };
  },
});
