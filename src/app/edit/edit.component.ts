import { Component, OnInit, Input } from '@angular/core';
import { HostListener } from '@angular/core';
import {Post} from '../blog.service';
import {BlogService} from '../blog.service'
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  //master detail thing similar to TOH
  @Input() post: Post;
  @Input() username: string;

  constructor(private blogService: BlogService,
              private activatedRoute: ActivatedRoute,
              private router: Router
    ) 
    { 
    }

  ngOnInit() {
    console.log("in ngoninit of edit component")
    console.log("post 1 is " + this.post); 
    //listening to route changes here, yay. confirmed it works
      //subscribing now makes edit component responsible for changing post when url changes
    this.activatedRoute.paramMap.subscribe( 
    () => 
    {
      console.log("in activatedRoute")
      let id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
      console.log("id is " + id)
      this.post = this.getPost(id);
      console.log("posts are" + this.getPosts())
    } );

    console.log("post 2 is " + this.post);  
  }

  //whenever the browser is going to change states, any unsaved changes is saved automatically
  @HostListener('window:beforeunload') 
  unsaved_edits()
  {
    console.log("sup)")

    this.save(this.post);

    let route_url = "edit/" + this.post.postid;
    this.router.navigate([route_url]);
  }

  getPost(postid: number): Post
  {
    return this.blogService.getPost(postid);
  }

  getPosts(): Post[]{
    //console.log("posts in getPosts is " + this.posts);
    //needs to make sure posts are sorted by postid
    return this.blogService.getPosts();
  }

  
  save(post: Post)
  {
    console.log("save in edit component is being called")
    this.blogService.updatePost(post);
  }

  delete(postid: number)
  {
    this.blogService.deletePost(postid);
  }

  preview(post: Post)
  {
    console.log("preview")
  }
}

function parseJWT(token)
{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}

