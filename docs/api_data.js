define({ "api": [
  {
    "type": "post",
    "url": "/api/login",
    "title": "Authenticate the user",
    "group": "Authenticate",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of LCCs.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of LCCs.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token, valid for 20 minutes.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbHJjIiwiaWF0IjoxNTI3MTY1NTg2LCJleHAiOjE1MjcxNjY3ODZ9.VEvOcyPa-LKSr0kJXTa6TvpCqyKmenJRbEgdxNKJjik\" \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidJSON",
            "description": "<p>The fields &quot;username&quot; and &quot;password&quot; are required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCredentials",
            "description": "<p>The credentials are invalid.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InvalidJSON",
          "content": "HTTP/1.1 422 BadRequest\n{\n   \"error\": \"Invalid JSON\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidCredentials",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"error\": \"Invalid Credentials\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/login.js",
    "groupTitle": "Authenticate",
    "name": "PostApiLogin"
  },
  {
    "type": "get",
    "url": "/api/directories",
    "title": "List items",
    "group": "Directories",
    "description": "<p>List items from specified path. The token is needed.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>The directory path.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage",
        "content": "curl -H \"Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbCIsImlhdCI6MTUyNzI5Mjk2NSwiZXhwIjoxNTI3Mjk0MTY1fQ.M8HAJAjq5E8k-e4LzxMXccG7z5ay4Yrs05ZmhXhMv6g\" http://127.0.0.1:3000/api/directories?path=Documents/example",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n    \"items\": [\n        {\n            \"name\": \"dir1\",\n            \"path\": \"/dir1\",\n            \"isFile\": false\n        },\n        {\n            \"name\": \"file1.txt\",\n            \"path\": \"/file1.txt\",\n            \"isFile\": true\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ENOENT",
            "description": "<p>No such file or directory.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoTokenProvided",
            "description": "<p>No token provided.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidToken",
            "description": "<p>Invalid token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ENOENT",
          "content": "HTTP/1.1 404 NotFound\n{\n   \"error\": \"ENOENT: no such file or directory, scandir '<directory_path>'\"\n}",
          "type": "json"
        },
        {
          "title": "NoTokenProvided",
          "content": "HTTP/1.1 401 Unauthorized\n{\n   \"error\": \"Access denied. No token provided.\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidToken",
          "content": "HTTP/1.1 400 BadRequest\n{\n   \"error\": \"Invalid token\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/directories.js",
    "groupTitle": "Directories",
    "name": "GetApiDirectories"
  }
] });
