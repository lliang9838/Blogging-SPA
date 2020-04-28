import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { HostListener } from "@angular/core";
import { Post } from "../blog.service";
import { BlogService } from "../blog.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
})
export class EditComponent implements OnInit {
  post: Post;
  username: string;

  profileForm: FormGroup;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(() => {
      let id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
      this.post = this.getPost(id);
    });
    this.profileForm = new FormGroup({
      title: new FormControl(),
      body: new FormControl(),
    });
  }

  getPost(postid: number): Post {
    return this.blogService.getPost(postid);
  }

  @HostListener("window:beforeunload", ["$event"])
  onWindowClose($event) {
    if (this.profileForm.dirty)
      this.blogService.saveChanges(this.post).subscribe((ret) => {
        if (ret !== "OK") {
          alert("Error updating the post on the server.");
        }
      });
  }

  save(post: Post) {
    this.blogService.updatePost(post);
    this.profileForm.markAsPristine();
  }

  delete(postid: number) {
    this.blogService.deletePost(postid);
  }

  preview(post: Post) {
    if (this.profileForm.dirty) {
      this.blogService.saveChanges(post).subscribe((ret) => {
        if (ret !== "OK") {
          alert("Error updating the post on the server.");
        }
      });
    }
    let route_url = "preview/" + post.postid;
    this.router.navigate([route_url]);
  }
}
