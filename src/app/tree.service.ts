import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import {TreeNode} from './tree-node';

@Injectable()
export class TreeService {

  constructor(private http: Http) {
  }

  getNodes() {
    return this.http.get('./organisations.json').map((response: Response) => <TreeNode>response.json());
  }

  onNodeSelected(node: TreeNode) {
    alert(node.name);
  }
}
