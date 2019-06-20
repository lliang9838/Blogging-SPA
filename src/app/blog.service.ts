import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}
export class BlogService {

  private posts: Post[];
  private url = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getPosts(url): Observable<Post[]>
  {
    return this.http.get<Post[]>(url)
  }

  fetchPosts(username: string): void //returns an observable of Posts
  {
    let new_url = this.url + username;
    this.getPosts(new_url).subscribe(posts => this.posts = posts)
  }
  
}
