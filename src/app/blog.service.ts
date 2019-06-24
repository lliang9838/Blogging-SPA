import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


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

  httprequest(url): Observable<Post[]>
  {
    return this.http.get<Post[]>(url)
  }

  fetchPosts(username: string): void //returns an observable of Posts
  {
    let new_url = this.url + username;
    this.httprequest(new_url).subscribe(
      posts => {
        console.log("posts[0].postid is " + posts[0].postid) //TOOD: looks like we need to look through all of posts and assign it to this.posts
        for(let i = 0; i < posts.length; i++)
        {
          //
          let p: Post = 
            { postid:posts[i].postid, 
              created: posts[i].created, 
              modified: posts[i].modified,
              title: posts[i].title,
              body: posts[i].body };

          console.log("p is " + p)
          console.log("p.postid is " + p.postid)
          
          this.posts.push(p)
        }
        this.posts.sort( (a,b)=> (a.postid > b.postid) ? 1 : -1);
        console.log(this.posts)})
  }

  getPosts(username: string): Post[]{
    console.log("posts in getPosts is " + this.posts);
    //needs to make sure posts are sorted by postid
    return this.posts;
  }
  
}
