### code하면서 중간중간

1. one way to show date as formatted data
   // const fetchTransactions = async () => {
   // const res = await fetch("/api/expense/getTransactions", {
   // ...defaultHeaders,
   // method: "GET",
   // });
   // const transactionData = await res.json();
   // const formattedTransactions = transactionData.map(transaction => ({
   // ...transaction,
   // date: new Date(transaction.date).toLocaleDateString("en-US")
   // }));
   // setTransactions(formattedTransactions);
   // };

2. Process not defined error in console
   ->The error is as a result of react-error-overlay (which many people would never have heard of because it is a dependency of react-scripts). This package's dependencies were update to support webpack v5, which unfortunately is not compatible with react-scripts v4.
   -> "overrides": {
   "react-error-overlay": "6.0.9"
   },
   Add this line in package.json

3. Fetch & Await(In TransactionForm for create and updating form data)
   The reason why you have to call await res.json() with the fetch response is that the response object returned by the fetch function is a stream that contains the response body, which needs to be parsed before you can access the JSON data.
   The json() method parses the response body and returns a promise that resolves with the JSON data. So, you need to await this promise to get the JSON data.
   Without parsing the response body, you won't be able to access the JSON data that is being returned by your API, which is why you were getting the TypeError: res.json is not a function error.
   In your updated code, you are now able to access the JSON data returned by your API because you are waiting for the json() promise to resolve with the JSON data.

//DIR 정리
->component: WEB UI components that is going to be rendered
->pages: Pages that will be rendered with the react router
->store: For redux maintaining all the autherntication, verification etc
->utils: functions that will help user be authenticated

//FILES
->index.js : root that will be rendered
->App.js : The main Scaffold of the Web(Appbar + Outlet(=>Items that will change as the page renders))
->routes.js : createBrowserRouter : Mech on how the pages will be renderd
//Function export

1. const Function = ()=>{}... export default Function...
2. export default function FuncName(){}...
3. function FuncName(){}...export default FuncName...

//DEPLOY
netlify.com
