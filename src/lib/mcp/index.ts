import { defineMcp } from "@lovable.dev/mcp-js";
import listProjectsTool from "./tools/list-projects";
import getProjectTool from "./tools/get-project";
import getContactTool from "./tools/get-contact";

export default defineMcp({
  name: "zion-robotics-mcp",
  title: "Zion Robotics Portfolio MCP",
  version: "0.1.0",
  instructions:
    "Tools for exploring Adeogun Daniel Joseph's (Zion Robotics) portfolio. Use list_projects to see all work, get_project for detail on a single project, and get_contact_info for how to reach out.",
  tools: [listProjectsTool, getProjectTool, getContactTool],
});
