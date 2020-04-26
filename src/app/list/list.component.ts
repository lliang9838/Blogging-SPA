import {
  Component,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { Post } from "../blog.service";
import { BlogService } from "../blog.service";
import { RouterModule, Routes, Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  posts: Post[];

  selectedPost: Post;
  private url = "http://localhost:3000/api/";

  constructor(
    private blogService: BlogService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.posts = this.blogService.getPosts();
  }

  onSelect(post: Post): void {
    let route_url = "edit/" + post.postid;
    this.router.navigate([route_url]);
  }

  new(post: Post) {}
}

function parseJWT(token) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
}
