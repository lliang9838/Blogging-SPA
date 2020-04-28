import { Component, OnInit } from "@angular/core";
import { Post } from "../blog.service";
import { BlogService } from "../blog.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Parser, HtmlRenderer } from "commonmark";

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.css"],
})
export class PreviewComponent implements OnInit {
  post: Post;
  titleMarkdown: string;
  bodyMarkdown: string;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      let id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
      this.post = this.getPost(id);
      var reader = new Parser();
      var writer = new HtmlRenderer();
      this.titleMarkdown = writer.render(reader.parse(this.post.title));
      this.bodyMarkdown = writer.render(reader.parse(this.post.body));
    });
  }

  getPost(postid: number): Post {
    return this.blogService.getPost(postid);
  }

  edit(post: Post) {
    let route_url = "edit/" + post.postid;
    this.router.navigate([route_url]);
  }
}
