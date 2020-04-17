# GRAPHQL TypeORM TypeScript Blog

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

# VSCode Configuration For Debug

* settings.json
```json
{
  "debug.node.autoAttach": "on"
}
```
* launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Watch",
      "runtimeExecutable": "npm",
      "restart": true,
      "runtimeArgs": [
        "run-script",
        "debug:watch"
      ],
      "port": 5858,
      "skipFiles": [
        "<node_internals>/**"
      ]
    },
    {
      "name": "Debug With HotSwap",
      "type": "node",
      "request": "attach",
      "restart": true,
      "port": 5858,
      "outFiles": [],
      "sourceMaps": true,
      "skipFiles": [
        "<node_internals>/**"
      ]
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Launch via NPM",
      "runtimeExecutable": "npm",
      "runtimeArgs": [
        "run-script",
        "start"
      ],
      "port": 5858,
      "skipFiles": [
        "<node_internals>/**"
      ]
    }
  ]
}
```

# Examples

* mutation:
```json
mutation {
  addComment(content: "Comment 1", postId: 1, authorId: 1) {
    content
  }
}
```
* query
```json
{
  posts {
    id
    title
    content
    comments {
      id
      content
      author {
        id
        name
      }
    }
    author {
      id
      name
    }
  }
}
```
