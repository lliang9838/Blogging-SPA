import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const leslie = [
      { postid: 1, created: '111', modified: '222', title: "hey", body: "ok" },
      { postid: 2, created: '121', modified: '223', title: "hi", body: "cool" },
      { postid: 3, created: '131', modified: '224', title: "dog", body: "cat" }
    ];
    return {leslie};
  }

  
}