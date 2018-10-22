# Client Side First
When importing dependencies, there are two aliases configured to help ease development.


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
