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

  private posts: Post[];
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
        console.log(posts[0]) //TOOD: looks like we need to look through all of posts and assign it to this.posts
        this.posts = posts // **BUG**, why's it undefined here
        console.log(this.posts)})
  }

  getPosts(username: string): Post[]{
    console.log("posts in getPosts is " + this.posts);
    return this.posts;
  }
  
}
