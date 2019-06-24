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