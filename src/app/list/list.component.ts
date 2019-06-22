import { Component, OnInit } from '@angular/core';
import {Post} from '../blog.service';
import {BlogService} from '../blog.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  posts: Post[];

  //dependency injection
  constructor(private blogService: BlogService) { }

  ngOnInit() {

    //TODO: I'll worry about the sorting and ordering later
    console.log(document.cookie)
    let username = parseJWT(document.cookie)["usr"]; //got username here
    console.log(username)
    this.blogService.fetchPosts(username);

    let my_posts = this.blogService.getPosts(username);
    console.log(my_posts)
    this.posts = my_posts;
  }
  
}

function parseJWT(token)
{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}
