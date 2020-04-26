import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { HostListener } from "@angular/core";
import { Post } from "../blog.service";
import { BlogService } from "../blog.service";
import {
  RouterModule,
  Routes,
  ActivatedRoute,
  Router,
  NavigationEnd,
} from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
})
export class EditComponent implements OnInit {
  //master detail thing similar to TOH
  @Input() post: Post;
  @Input() username: string;

  profileForm: FormGroup;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
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
    console.log("this.profileForm in ngOnInit(): ", this.profileForm);
  }

  getPost(postid: number): Post {
    return this.blogService.getPost(postid);
  }

  getPosts(): Post[] {
    return this.blogService.getPosts();
  }

  save(post: Post) {
    console.log("save in edit component is being called");
    this.blogService.updatePost(post);
    this.profileForm.markAsPristine();
    console.log(this.profileForm);
  }

  delete(postid: number) {
    console.log("delete in edit component is being called");
    this.blogService.deletePost(postid);
  }

  preview(post: Post) {
    console.log("preview");
  }
}
