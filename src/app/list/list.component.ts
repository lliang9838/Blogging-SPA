import { Component, OnInit } from '@angular/core';
import {Post, BlogService} from '../blog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  //dependency injection
  constructor(private blogService: BlogService) { }

  ngOnInit() {
  }

}
