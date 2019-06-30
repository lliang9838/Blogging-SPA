import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}

@Injectable({providedIn: 'root'})
export class BlogService {

  private posts: Post[] = [];
  private url = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  
  // private handleError(operation = 'operation') {
  //   return (error: any) => {

  //     alert("Error updating the post at the server");
  //     //need to navigate back to edit view
  //     //TODO: maybe something to do with routes?

  //   };
  // }

  getrequest(url): Observable<Post[]>
  {
    return this.http.get<Post[]>(url)
  }

  fetchPosts(username: string): void //returns an observable of Posts
  {
    let new_url = this.url + username;
    this.getrequest(new_url).subscribe(
      posts => {
        //console.log("posts[0].postid is " + posts[0].postid) //TOOD: looks like we need to look through all of posts and assign it to this.posts
        for(let i = 0; i < posts.length; i++)
        {
          //
          let p: Post = 
            { postid:posts[i].postid, 
              created: posts[i].created, 
              modified: posts[i].modified,
              title: posts[i].title,
              body: posts[i].body };

         // console.log("p is " + p)
         // console.log("p.postid is " + p.postid)
          
          this.posts.push(p)
        }

        //FINSIHED: posts are listed in ascending order according to postid
        this.posts.sort( (a,b)=> (a.postid > b.postid) ? 1 : -1);
        //console.log(this.posts)
      })
  }

  //no need to worry about this.posts not being populated, when application is loaded, should already be populated
  getPost(postid: number): Post
  {
    for(let i  = 0 ; i < this.posts.length; i++)
    {
      if(postid === this.posts[i].postid) 
      {
        return this.posts[i];
      }
    }
    
  }

  getPosts(username: string): Post[]{
    //console.log("posts in getPosts is " + this.posts);
    //needs to make sure posts are sorted by postid
    return this.posts;
  }

  // newPost(username: string): Post {
  //   return 
  // }

  //This is how you do http requests with observables, you call the http request, then you subscribe to it
  //this is what makes it asychronous
  updatePost(username: string, post: Post): void{
    //console.log("username is " +  username)
    //console.log(post)
    let new_url = this.url + username + '/'+ post.postid;
    //console.log(new_url)
    let body = {"title": post.title, "body":post.body, "modified": Date.now()}
    //adding response: text is crucial, without it, code wouldn't work
    const req =  this.http.put(new_url, body, {responseType: 'text'});
    req.subscribe( 
      ret => {

        if(ret !== "OK")
        {
          console.log("Error updating the post at the server.")
          //TODO: convert this to an alert message
          //TODO: need to navigate to "edit view" of the post
        }
      });
  }

  //TODO: need to show that the post in the list pane is deleted without refreshing page
  deletePost(username: string, postid: number): void 
  {
    console.log("postid is " + postid);
    for(let i  = 0 ; i < this.posts.length; i++)
    {
      if(postid === this.posts[i].postid) 
      {
        let new_url = this.url + username + '/' + this.posts[i].postid;

        console.log(new_url)
        // adding observe: response allows the response status to be read, without it. ret is undefined
        const req = this.http.delete(new_url, {observe: 'response'});
        req.subscribe(
          ret => {
            console.log("ret in deletePost is " + ret);

            if(ret.status !== 204)
            {
              console.log("Error deleting the post at the server.")
              //TODO: convert this to an alert message
              //TODO: need to navigate to /, the “list pane” of the editor
            }
          })
        this.posts.slice(i,1); //deletes 1 element at index i
      }
    }
  }

}
