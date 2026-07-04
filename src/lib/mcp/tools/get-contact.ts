import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact_info",
  title: "Get contact info",
  description: "Get contact information and social links for Adeogun Daniel Joseph (Zion Robotics).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Adeogun Daniel Joseph",
      brand: "Zion Robotics",
      role: "Full-stack developer, robotics builder, SaaS founder",
      website: "https://zionrobotics.com",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
