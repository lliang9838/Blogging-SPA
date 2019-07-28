import { Component, OnInit, NgZone, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import {Post} from '../blog.service';
import {BlogService} from '../blog.service'
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {

  posts: Post[];

  selectedPost: Post;
  selectedUsername: string;
  private url = 'http://localhost:3000/api/';

  @Output() listLoaded: EventEmitter<boolean> = new EventEmitter();

  //dependency injection
  constructor(private blogService: BlogService,
              private router: Router,
              private changeDetector: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute,
              private http: HttpClient
    ) { 
      
    }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(() => 
    {
      console.log('in activated route of list component')
      //console.log(document.cookie)
      let username = parseJWT(document.cookie)["usr"]; //got username here
      this.selectedUsername = username;
      //console.log(username)

      let new_url = this.url + this.selectedUsername;
      //GOTCHA: when the get request is called, the array goes from being empty to being undefined
      this.getrequest(new_url).subscribe(
        posts => {

          //whenever fetchPosts is called, we should initialize the array back to empty, if not it would just keep on adding redundant data into our array
          this.posts = []; 
          //console.log("posts[0].postid is " + posts[0].postid) //TOOD: looks like we need to look through all of posts and assign it to this.posts
          for(let i = 0; i < posts.length; i++)
          {
            //
            let p: Post = 
              { postid:posts[i].postid, 
                created: posts[i].created, 
                modified: posts[i].modified,
                title: posts[i].title,
                body: posts[i].body };

          // console.log("posts is " + posts);
            
            //console.log("this.posts is " + this.posts);
            this.posts.push(p)
          }

          //FINSIHED: posts are listed in ascending order according to postid
          this.posts.sort( (a,b)=> (a.postid > b.postid) ? 1 : -1);
          console.log("this.posts in fetchPost before setting localStorage is " + this.posts);
          //localStorage.setItem(this.storage, JSON.stringify(this.posts)); //storing posts in localstorage
          //console.log(this.posts)
          //this.posts = this.blogService.getPosts();
          console.log("this.posts is " + this.posts)
          this.blogService.populatePosts(this.posts)
          console.log('List Loaded');
          this.listLoaded.next(true);
        })
        
      
      });
      
  }
  ngAfterViewInit(){
    
  }

  getrequest(url): Observable<Post[]>
  {
    return this.http.get<Post[]>(url)
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
