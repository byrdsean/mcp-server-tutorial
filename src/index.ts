import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import z from "zod";

const main = async () => {
    const mcpServer = new McpServer(
        {
            version: "1.0.0",
            name: "MCP Tutorial",
            description: "Tutorial to lear the basics of writing a MCP server for AI agents",
            title: "MCP Tutorial"
        }
    )

    mcpServer.registerTool(
        "get_toku_name",
        {
            title: "Get a Toku name",
            description: "Returns a random toku label from a predefined list",
            inputSchema: {
                name: z.string().nonempty("Name is required"),
            }

        }, 
        async ({ name }) => {
            const tokuList = ["Sentai", "Kamen Rider", "Super Gavin", "Metal Hero", "Ultraman"];
            const randomIndex = Math.floor(Math.random() * tokuList.length);
            const tokuName = `${tokuList[randomIndex]} ${name} ${randomIndex}`;

            return {
                content: [
                    {
                        type: "text",
                        text: tokuName
                    }
                ]
            }
        }
    );

    const transport = new StdioServerTransport();
    await mcpServer.connect(transport);
    console.error("MCP Tutorial is running");
}

main()