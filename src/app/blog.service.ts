import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private posts: Post[];
  private url = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  fetchPosts(username: string): void
  {
    let new_url = this.url + username;
    console.log(this.http.get(new_url))
  }
}

export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}