import {Injectable, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import {TreeNode} from './tree-node';
import {Subject} from 'rxjs';

@Injectable()
export class TreeService implements OnInit {
  rootNode: TreeNode;
  selectedNode: TreeNode;

  //nodeChange: Subject<TreeNode> = new Subject<TreeNode>();

  constructor(private http: Http) {
    this.http.get('./organisations.json').map((response: Response) => <TreeNode>response.json()).subscribe(
      (data: any) => {
        this.rootNode = data;
      }
    );
  }

  ngOnInit(): any {
  }

  getNodes() {
    return this.http.get('./organisations.json').map((response: Response) => <TreeNode>response.json());
  }


  checkChildren(node: any) {
    node.selected = true;
    this.selectedNode = node;
    for (let n of node.children) {
      this.checkChildren(n);
    }
  }

  uncheckChildren(node: any) {
    node.selected = false;
    for (let n of node.children) {
      this.uncheckChildren(n);
    }
  }

  checkParents(node: any) {
    let childSelected = false;
    for (let n of node.children) {
      this.checkParents(n);
      if (n == this.selectedNode) {
        childSelected = true;
      }
    }
    if (childSelected) {
      node.childSelected = true;
    }
  }

  uncheckParents(node: any) {
    let childSelected = true;
    for (let n of node.children) {
      this.uncheckParents(n);
      if (n == this.selectedNode) {
        childSelected = false;
      }
    }
    if (!childSelected) {
      node.childSelected = false;
    }
  }
}
