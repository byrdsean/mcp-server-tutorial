import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { UriTemplate } from "@modelcontextprotocol/sdk/shared/uriTemplate.js";
import z from "zod";

const main = async () => {
    const mcpServer = new McpServer(
        {
            version: "1.0.0",
            name: "MCP Tutorial",
            description: "Tutorial to learn the basics of writing a MCP server for AI agents",
            title: "MCP Tutorial"
        }
    )

    mcpServer.registerTool(
        "get_toku_name",
        {
            title: "Get a Toku name",
            description: "Given a name, prepend a random toku label, and return the new toku name.",
            inputSchema: {
                name: z
                    .string()
                    .nonempty("Name is required")
                    .describe("Required name used to generate a toku name"),
            },
            annotations: {
                destructiveHint: false,
                idempotentHint: false,
                readOnlyHint: true,
                openWorldHint: false,
                title: "Given a name, prepend a random toku label, and return the new toku name."
            }
        }, 
        async ({ name }) => {
            const tokuList = ["Sentai", "Kamen Rider", "Super Gavin", "Metal Hero", "Ultraman"];
            const randomIndex = Math.floor(Math.random() * tokuList.length);
            const tokuName = `${tokuList[randomIndex]} ${name}`;

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

    mcpServer.registerResource(
        "travel_all_activities",
        "travel://activitives",
        {
            title: "Travel Activiites",
            description: "Return a list of possible activities a traveler can do in all cities",
            mimeType: "application/json"
        },
        async (uri) => {
            console.error(`travel_activities - URI: ${uri}`);

            const sanFran = {
                city: "San Francisco",
                activities: ["hiking", "snowboarding", "wine tasting"]
            };

            const newYork = {
                city: "New York",
                activities: ["bus tours", "sightseeing", "Statue of Liberty", "Central Park", "Hudson River"]
            }

            const activities = {
                activities: [sanFran, newYork]
            }

            return {
                contents: [
                    {
                        uri: uri.href,
                        mimeType: "application/json",
                        text: JSON.stringify(activities)
                    }
                ]
            }
        }
    );

    mcpServer.registerResource(
        "travel_activities_by_city",
        new ResourceTemplate(
            "travel://activitives/city/{city}",
            { list: undefined }
        ),
        {
            title: "Traval Activiites By City",
            description: "Given the name of a city, return a list of possible activities a traveler can do in that city",
            mimeType: "application/json"
        },
        async (uri, { city }) => {
            console.error(`travel_activities_by_city - URI: ${uri}, City: ${city}`);

            const sanFran = {
                city: "San Francisco",
                activities: ["hiking", "snowboarding", "wine tasting"]
            };

            const newYork = {
                city: "New York",
                activities: ["bus tours", "sightseeing", "Statue of Liberty", "Central Park", "Hudson River"]
            }

            const activities = [sanFran, newYork];


            let parsedCity= city?.toString();
            if(parsedCity) {
                parsedCity = decodeURIComponent(parsedCity);
            } else {
                parsedCity = "";
            }

            const activity = activities
                .find(a => a.city.toLocaleLowerCase() === parsedCity.toLocaleLowerCase());

            let text = "";
            if (!activity) {
                text = `Unable to find activities for city ${city}`;
            } else {
                text = JSON.stringify(activity);
            }

            return {
                contents: [
                    {
                        uri: uri.href,
                        mimeType: "application/json",
                        text: text
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