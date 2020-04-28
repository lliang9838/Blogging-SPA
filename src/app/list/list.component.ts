import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Post } from "../blog.service";
import { BlogService } from "../blog.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  posts: Post[];

  selectedPost: Post;

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

  new() {
    this.blogService.newPost();
  }
}
