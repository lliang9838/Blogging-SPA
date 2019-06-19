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