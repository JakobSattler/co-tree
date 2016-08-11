import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import {TreeNode} from './TreeNode';

@Injectable()
export class TreeService {
  treeNodes: Array<TreeNode>;

  constructor(private http: Http) {
  }

  getNodes() {
    return this.http.get('./organisations.json').map((response: Response) => response.json());
  }
}
