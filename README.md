# mcp-server-tutorial
Learning how to build a simple MCP server in typescript

# Initial build
## Initialize a new npm project
npm init -y

## Install dependencies
npm install @modelcontextprotocol/sdk zod@3
npm install -D @types/node typescript
npx tsc --init (create tsconfi.json)

## Update package.json
```
"scripts": {
    "watch": "tsc --watch",
    "build": "tsc",
    "start": "tsc && node dist/index.js"
},
"type": "module",
```
## Update tsconfig.json
```
"compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "sourceMap": false,
    "declaration": false,
    "declarationMap": false,
},
"include": ["src/**/*"],
"exclude": ["node_modules"]
```
## Sources: 
1. https://modelcontextprotocol.io/docs/develop/build-server#typescript
2. https://www.youtube.com/watch?v=ZoZxQwp1PiM


# Add MCP server to workspace
```
{
	"folders": [
		{
			"path": "."
		}
	],
	"settings": {
		"mcp": {
			"servers": {
				"my-mcp-server-tutorial": {
					"type": "stdio",
					"command": "npm",
					"args": [
						"run",
						"start"
					],
					"cwd": "${workspaceFolder}"  // current workspace directory
				},
			},
			"inputs": []
		}
	}
}
```