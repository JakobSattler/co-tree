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

  /**
   * Calls checkChildren() and checkParents() using the given node
   *
   * @param selectedNode The selected node
   */
  nodeSelected(selectedNode: TreeNode) {
    this.checkChildren(selectedNode);

    this.selectedNode = selectedNode;
    this.checkParents(this.rootNode);
  }

  /**
   * Calls uncheckChildre() and uncheckParents() using the given node
   *
   * @param selectedNode The selected node
   */
  nodeUnselected(selectedNode: TreeNode) {
    this.uncheckChildren(selectedNode);

    this.selectedNode = selectedNode;
    this.uncheckParents(this.rootNode);
  }

  /**
   * Check all children of the given node
   *
   * @param node The selected node
   */
  checkChildren(node: any) {
    node.selected = true;
    for (let n of node.children) {
      this.checkChildren(n);
    }
  }

  /**
   * Uncheck all children of the given node
   *
   * @param node The selected node
   */
  uncheckChildren(node: any) {
    node.selected = false;
    for (let n of node.children) {
      this.uncheckChildren(n);
    }
  }

  /**
   * Check all parents using the variable "selectedNode"
   *
   * @param node Should be rootNode
   */
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

  /**
   * Uncheck all parents using the variable "selectedNode"
   *
   * @param node Should be rootNode
   */
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
