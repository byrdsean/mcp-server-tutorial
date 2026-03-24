import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import z from "zod";
const main = async () => {
    const mcpServer = new McpServer({
        version: "1.0.0",
        name: "MCP Tutorial",
        description: "Tutorial to lear the basics of writing a MCP server for AI agents",
        title: "MCP Tutorial"
    });
    const transport = new StdioServerTransport();
    await mcpServer.connect(transport);
    console.error("MCP Tutorial is running");
};
main();
