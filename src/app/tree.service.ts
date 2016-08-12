import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import {TreeNode} from './tree-node';
import {Subject} from 'rxjs';

@Injectable()
export class TreeService {
  treeNodes: Array<TreeNode>;

  //nodeChange: Subject<TreeNode> = new Subject<TreeNode>();

  constructor(private http: Http) {
  }

  getNodes() {
    return this.http.get('./organisations.json').map((response: Response) => <TreeNode>response.json());
  }



}
