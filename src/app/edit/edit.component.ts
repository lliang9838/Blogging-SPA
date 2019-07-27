import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { HostListener } from '@angular/core';
import {Post} from '../blog.service';
import {BlogService} from '../blog.service'
import { RouterModule, Routes, ActivatedRoute, Router, NavigationEnd} from '@angular/router';

/*
TODO: gray out save button when the content of the title and body is unchanged
*/

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  //master detail thing similar to TOH
  @Input() post: Post;
  @Input() username: string;

  //need to store this bad boy in localStorage as well

  constructor(private blogService: BlogService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private changeDetector: ChangeDetectorRef
    ) 
    { 
    }

  ngOnInit() {
    console.log("in ngoninit of edit component")


    this.activatedRoute.paramMap.subscribe( 
    () => 
    {
      console.log("in activatedRoute")
      let id = Number(this.activatedRoute.snapshot.paramMap.get('id'))

      //GOTCHA: the problem here is that we get the postid of the post that was clicked and we didnt
      // get to save the previous post, which is the desired post that we wanted to save in the first place
      console.log("id is " + id)
      this.post = this.getPost(id);
      //this.save(this.post); //makes sure any unsaved work gets saved when the URl navigates away
    } );

   // console.log("this.post after paramMap is " + this.post);  

  }


  //whenever the browser is going to change states, any unsaved changes is saved automatically
  // @HostListener('window:beforeunload') 
  // unsaved_edits()
  // {
  //   console.log("sup")

  //   this.save(this.post);

    
  // }

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

  //GOTCHA!should call the router.navigate here.. and not in blog service cuz in blog service, 
  //it wouldn't know how to resolve the router-outlet comp to display the correct component
  delete(postid: number)
  {
    console.log("delete in edit component is being called")
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

