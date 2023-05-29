# Expense_Tracker_Server

\*add "type": "module", to your package.json if you would like to use the import instead of require in server.js

\*CORS error
-> This is going to block any other website get or post to use any API from any unknown URL : For server the client is an unknown URL.

\* Why json.stringify
->In web development, data is commonly transferred between client and server using JSON (JavaScript Object Notation) format. JSON is a lightweight data interchange format that is easy for both humans and machines to read and write. When you send data from the client to the server, it needs to be in a format that the server can understand. JSON.stringify() is a method that converts a JavaScript object or value to a JSON string, which can be easily sent to the server.

When you send data from the client to the server using a POST request, the data is usually sent as the body of the request. The body of the request is a string, so the data you want to send needs to be converted to a string before it can be sent. This is where JSON.stringify() comes in handy. It converts the data into a JSON string, which can be sent as the body of the request.

On the server side, when you receive the data in the body of the request, you use a method like JSON.parse() to convert the JSON string back into a JavaScript object or value that can be easily manipulated and used by your code.

\* express body-parser
->body-parser is a middleware for Express.js that parses incoming request bodies in a middleware before handlers, available under the req.body property.

By default, Node.js does not come with built-in support for parsing request bodies, so using body-parser allows Express.js to parse incoming request bodies in various formats such as JSON, url-encoded, raw, and text.

In the example code you provided earlier, express.json() middleware is being used instead of body-parser. express.json() is a built-in middleware in Express.js that does the same job as body-parser by parsing incoming request bodies as JSON.

If you don't use a body-parsing middleware, the incoming request body will not be parsed automatically and you will have to manually parse it yourself, which can be cumbersome and error-prone.

\* '$'?

The "$" symbol in your code examples is used in MongoDB's aggregation framework. It is a special operator that is used to perform various operations during the aggregation pipeline. The "$" symbol is used to identify a field in a document or an operator in the aggregation framework. In your server-side code, the "$match", "$group", "$push", "$sum", and "$month" operators are all part of the MongoDB aggregation pipeline.

\*jwt&jwt-passport
Sure, I'd be happy to explain how Passport JWT works and how it differs from regular JWT.

JWT stands for JSON Web Token, and it's a standard for creating and verifying tokens. A token is a string that represents a user's identity and any additional data that might be needed to authenticate and authorize their access to a system. In a JWT, this data is encoded as a JSON object and signed using a secret key.

Passport is an authentication middleware for Node.js that provides a simple, configurable way to authenticate users. It has a number of different authentication strategies, including one for JWT. Passport JWT is a Passport strategy that uses JWT tokens to authenticate users.

Here's how it works:

When a user logs in to your system, you create a JWT token that includes their user ID and any other data you need to store in the token. You also sign the token using a secret key that only your server knows.

You send the JWT token to the client, typically in a cookie or in the response body.

When the client makes a subsequent request to your server, it includes the JWT token in the request. Typically, this is done using an HTTP header called "Authorization" with a value of "Bearer [token]".

Your server extracts the JWT token from the request and verifies its signature using the secret key. If the signature is valid, it decodes the token to extract the user ID and any other data stored in the token.

If the user ID is valid and the user is authorized to perform the requested action, your server returns a response.

Compared to regular JWT, Passport JWT adds a layer of abstraction to the authentication process. Rather than handling the token verification and decoding yourself, you can use Passport's JWT strategy to handle it for you. This makes it easier to add authentication to your Node.js application without having to worry about the details of JWT verification and decoding. Additionally, Passport provides a standard interface for defining authentication middleware, which makes it easier to switch between authentication strategies if you need to in the future.

\* res.send & res.json
In Express.js, res.send() and res.json() are both methods used to send data in response to an HTTP request.

res.send() is used to send a generic response and can be used to send different types of data such as a string, HTML, or JSON. When the response type is not specified, Express sets the content type of the response to text/html. For example:

```
app.get('/', function(req, res){
res.send('Hello, world!');
});
```

In the example above, res.send() is used to send a simple string as the response.

res.json() is a method that is specifically used to send JSON data as a response. It sets the content type of the response to application/json. When res.json() is used to send a response, the data passed to it is automatically converted to JSON format. For example:

```
app.get('/data', function(req, res){
const data = { name: 'John', age: 30 };
res.json(data);
});
```

In the example above, res.json() is used to send a JSON object as the response. The data object is automatically converted to JSON before it is sent as the response.

//DEPLOY
render.com(https://www.youtube.com/watch?v=8vkvsv1Mcg0)
