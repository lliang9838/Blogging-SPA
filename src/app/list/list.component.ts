import { Component, OnInit } from '@angular/core';
import {Post, BlogService} from '../blog.service';

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
    let username = parseJWT(document.cookie);
    this.blogService.fetchPosts(username);
    this.posts = this.blogService.getPosts(username);
  }

  
}

function parseJWT(token)
{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}
