import { Component, OnInit, Input } from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {Post} from '../blog.service';
import {BlogService} from '../blog.service'

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
              private activatedRoute: ActivatedRoute
    ) 
    { 
    }

  ngOnInit() {
    //listening to route changes here, yay. confirmed it works
      //subscribing now makes edit component responsible for changing post when url changes
      this.activatedRoute.paramMap.subscribe( 
      () => 
        {
          let id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
          this.post = this.getPost(id);
        } );
  }

  getPost(postid: number): Post
  {
    return this.blogService.getPost(postid);
  }

  save(username: string, post: Post)
  {
    this.blogService.updatePost(username, post);
  }

  delete(username: string, postid: number)
  {
    this.blogService.deletePost(username, postid);
  }

  preview(post: Post)
  {
    console.log("preview")
  }
}
