import { Component, OnInit } from '@angular/core';

import {Post} from '../blog.service';
import {BlogService} from '../blog.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  post: Post;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
  }

}
