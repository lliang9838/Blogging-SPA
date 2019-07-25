# Simulate a data server
* mimics communication with a remote data server by using the In-memory Web API module
```
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const leslie = [
      { postid: 1, created: '111', modified: '222', title: "hey", body: "ok" },
      { postid: 2, created: '121', modified: '223', title: "hi", body: "cool" },
      { postid: 3, created: '131', modified: '224', title: "dog", body: "cat" }
    ];
    const rumman = [
      { postid: 1, created: '111', modified: '222', title: "hey", body: "ok" },
    ];
    return {leslie, rumman};
  }
  ```
* now in the service that does HTTP request, the url has two parts: prev_url + resource. 
Previous url can be anything, resource can be leslie or rumman and the approproate array will be returned

## TIP: Think simple. Understand the problem, search online, read carefully
* cannot read undefined property of error simply means the variable's property was not defined, 
and we need to initialize the variable to something

## StackOverflow
* positioning elements side by side: https://stackoverflow.com/questions/7448363/is-it-possible-to-put-two-div-elements-side-by-side-without-using-css-float
* sorted array of objects: https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/

## Reading full response using httpclient
* https://stackoverflow.com/questions/50920833/how-can-we-get-httpclient-status-code-in-angular-4

---
* For authentication and authorization problems, always remember to terminate all chrome instances by for quiting chrome and then start chrome again with `open -a Google\ Chrome --args --disable-web-security --user-data-dir`, and wait until you see the message **open -a Google\ Chrome --args --disable-web-security --user-data-dir** to know that you are in the clear. 
---
* on refresh data gets lost. Need to store data in localstorage or constantly retrieve it from database
in order for data to show on the browser. The reason why retrieving from database didn't work for edit
component is because we accessed a temp variable (which gets lost), we didn't actually make a call to 
the database, so for the edit component no data actually gets displayed on refresh. For the list component, we actually made a call to the database, so we eventually got the data, even though it may seem we didn't get the data at first (bc of asychronicity). 
* on refresh not only does data gets lost, it becomes **null**
---
* we can use two levels of **two-way** binding to bink data across **TWO** components
---
* Two bugs we need to solve before we do preview component
  1. when URL changes, we need to make sure we save the post
  2. when save and delete is processed, how to render the components properly as to reflect the 
  latest changes