import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import {Post} from '../blog.service';
import {BlogService} from '../blog.service'
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {

  posts: Post[];

  selectedPost: Post;
  selectedUsername: string;

 

  //dependency injection
  constructor(private blogService: BlogService,
              private router: Router,
              private changeDetector: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute
    ) { 
      
    }

  ngOnInit() {

    // this.act_route.paramMap.subscribe(
    //   () => {
    //      console.log("URL in list is activated")

         
    //      //console.log("In list component, property posts is " + this.posts)
    //   });

    this.activatedRoute.paramMap.subscribe(() => 
    {
      console.log('in activated route of list component')
      //console.log(document.cookie)
      let username = parseJWT(document.cookie)["usr"]; //got username here
      this.selectedUsername = username;
      //console.log(username)
      this.blogService.fetchPosts(username);

      let my_posts = this.blogService.getPosts();
      this.posts = my_posts;
    });
      
  }

  onSelect(post: Post): void{
    let route_url = "edit/" + post.postid;
    // this.zone.run(() => {
    //   this.router.navigate([route_url]);
    // });
    this.router.navigate([route_url]);
  }

  new(post: Post)
  {
    console.log("cool")
  }
  
}

function parseJWT(token)
{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}
