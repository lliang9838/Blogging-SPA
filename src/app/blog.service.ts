import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { RouterModule, Routes, ActivatedRoute, Router } from "@angular/router";

export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}

@Injectable({ providedIn: "root" })
export class BlogService {
  public posts: Post[] = [];
  private url = "http://localhost:3000/api/";
  private username: string = "";

  private storage: string = "posts";

  constructor(private http: HttpClient, private router: Router) {
    this.username = parseJWT(document.cookie)["usr"]; //got username here
    this.fetchPosts(this.username);
  }

  getrequest(url): Observable<Post[]> {
    return this.http.get<Post[]>(url);
  }

  fetchPosts(username: string) {
    this.username = username;

    let new_url = this.url + this.username;
    this.getrequest(new_url).subscribe((posts) => {
      console.log("posts: ", posts);
      for (let i = 0; i < posts.length; i++) {
        let p: Post = {
          postid: posts[i].postid,
          created: posts[i].created,
          modified: posts[i].modified,
          title: posts[i].title,
          body: posts[i].body,
        };

        this.posts.push(p);
      }
      this.posts.sort((a, b) => (a.postid > b.postid ? 1 : -1));
    });
  }

  getPost(postid: number): Post {
    for (let i = 0; i < this.posts.length; i++) {
      if (postid === this.posts[i].postid) {
        return this.posts[i];
      }
    }
  }

  getPosts(): Post[] {
    return this.posts;
  }

  updatePost(post: Post): void {
    let new_url = this.url + this.username + "/" + post.postid;
    console.log("blogService::updatePost, this.username is ", this.username);
    console.log("blogService::updatePost, new_url is ", new_url);
    let body = { title: post.title, body: post.body, modified: Date.now() };
    const req = this.http.put(new_url, body, { responseType: "text" });
    req.subscribe((ret) => {
      if (ret !== "OK") {
        alert("Error updating the post at the server.");
        let route_url = "edit/" + post.postid;
      }
      let route_url = "edit/" + post.postid;
      this.router.navigate([route_url]);
    });
  }

  deletePost(postid: number): void {
    let username = parseJWT(document.cookie)["usr"]; //got username here

    for (let i = 0; i < this.posts.length; i++) {
      if (postid === this.posts[i].postid) {
        let new_url = this.url + username + "/" + this.posts[i].postid;

        const req = this.http.delete(new_url, { observe: "response" });
        req.subscribe((ret) => {
          if (ret.status !== 204) {
            alert("Error deleting the post at the server.");
          }
          this.posts.splice(i, 1); //deletes 1 element at index i
          this.router.navigate(["/"]);
        });
      }
    }
  }
}

function parseJWT(token) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
}
