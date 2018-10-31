# Entry file
The main entry file is `src/index.js` for both the client and server. 
During development, we use webpack to host and serve our application so the entry file for the server will is technically `webpack.config.js` but the client side code is still loaded via `src/index.js`.


# 3 contexts signature
In order to keep the business logic clean, there exists three standard parameters that is typically passed from function to function: `req`, `locals` and `context`.

## `req`
In order to build a fully universal application, we must not tie ourselves to a specific implementation of request. Any property existing on this parameter must be able to provide a sensible value both on the client-side and server-side. Although this reduces the amount of information available to your functions, it also improves the usefulness of any code that uses it. Any code using `req` as is, typically can run universally on server-side and client-side.

## `locals`
Instead of exposing an express `res`, we chose to expose the `locals` property. The locals parameter is a simple plain object which makes it easy to recreate on the client-side. We use `locals` directly as the view-model. Any data here is sent to the root react component `App` as props and given to the template during server-side rendering. See `client.start.js` and `server.start.js`. 

## `context`
On node, multiple requests are handled by the same global scope. Apart from passing dependencies down a large chain of functions, there are few ways to share dependencies between functions. The context object serves as a `request-context` on the server-side, and a `server-response-context` on the client-side. They may have unique structures and should not be used by any functions designed to be universal. 

 - Using `context` in your function will inheritly tie it to either a server or client implementation.
 - These functions will typically live in their respective `client` or `server` folders.
 - You should avoid storing functions on the context, instead store some state for the desired function to consume.
 - - As an example, instead of storing an initialised logger, store the default headers and use the original logger. (This will make code discovery easier because implementations of functions are imported and not implicitly passed around)
 - Use a `partition-file` (coined here) to enable callers of your function to remain universal.
 - - An example of one of these files is `src/app/context/createContext.js`. These files are optimised at build time but are designed to make the separation of client and server logic easy to navigate, manage, and discover.
 - Whilst defining the react dom, you can use the `SeedContext` to gain access to the `context` object. You should treat it like a [handle](https://docs.microsoft.com/en-us/windows/desktop/sysinfo/handles-and-objects) and never access its properties directly from the component. Instead, you should import a `partitioned` (coined again) function and allow it to deal with reading the context object.
 - - See `src/app/openComponents/components/Oc.js` for an example of this.

# Universal app restrictions
Any code within the `src/app` folder must not read or modify the context parameter.
===================


# Babel Configuration
## Development
Using `babel.config.js`, we are able to build a customised build based on environment variables. This is the recommended way to configure babel as it removes uncertainty around environment based differences.



## Production
Production builds have not been created yet.

## React hot lodaing
https://www.youtube.com/watch?v=xsSnOQynTHs

=====================
NOTES:

Client side hydration:
- We need the same data that we had on the server side.
- We feed that same data to React in the client side.
- We could encapsulate that process, but on the server side, we can’t even wait for data while executing logic in the react application.

Business Logic
- This leads to the fact that we shouldn’t have any “Business Logic” in the application.
- React is a more dynamic declarative language. It is DHTML. (lol)
- When changing routes, we need to fetch data prior to re-rendering
- On the client side, we mitigate the confusion by having an interim “loading” view.
- Server side rendering is not dynamic, it is “calculate and send”.
- So let’s calculate and render.
- We use a different model (design patterns) on server and client out of necessity.
- db -> server -> draw -> send -> 🌎 dynamic ⟳

HttpReq => HttpServices => Model -> React -> Http -> Hydrate -> Run.
==> Interaction -> HttpServices -> Render -> ⟳

code splitting

Redux is about storing a global state.

React has the context concept: ==> building data structural state ==> is calculated state from existing props data so should it not be necessary to do anything special for this.

Data should be presented nicely to the browser: 
```html
<script type=“model/x.page-state+json” id=“initial-state”>{
	“message”:”hello world”
}</script>

<script type=“application/javascript”>
	const json = document.getElementById(‘initial-state’);
	const state = JSON.parse(json);

	// Data that is readily available to the browser can and 
	// should be omitted from the page state.
	const model = buildModel(state);

	React.hydrate(<App {…model} />
</script>
```

# Knowing what data you need for the view:
- The react render tree is dynamic and over time, the data it requires is ever-growing.
- There will be obvious requirements of data
- There will be global (contextual) data (eg. request data)
- Typically this is enough for a normal application, why complicate it.

`<head>` and other stateful changes:
- don’t use react to manage things outside of the react root.
- create functions the way you normally would
- call those functions at appropriate times:
    - react router?
    - track addressbar? (decouples)

module aliasing and/or IDE support

is it slow to swap 2 identical components if they render the same DOM?
we need web pack for client and server builds :(
