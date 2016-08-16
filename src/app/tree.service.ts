import {Injectable, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import {TreeNode} from './tree-node';
import {Subject} from 'rxjs';

@Injectable()
export class TreeService implements OnInit {
  selectedNode: TreeNode;

  //nodeChange: Subject<TreeNode> = new Subject<TreeNode>();

  constructor(private http: Http) {
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
   * @param rootNode
   */
  nodeSelected(selectedNode: TreeNode, rootNode: TreeNode) {
    this.checkChildren(selectedNode);
    this.selectedNode = selectedNode;
    this.checkParents(rootNode);
  }

  /**
   * Calls uncheckChildren() and uncheckParents() using the given node
   *
   * @param selectedNode The selected node
   * @param rootNode
   */
  nodeUnselected(selectedNode: TreeNode, rootNode: TreeNode) {
    this.uncheckChildren(selectedNode);
    this.selectedNode = selectedNode;
    this.uncheckParents(rootNode);
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
   * Check all parents of the variable "selectedNode"
   *
   * @param node Should be rootNode
   */
  checkParents(node: any) {
    for (let n of node.children) {
      if (n == this.selectedNode) {
        node.childSelected = true;
      }
      this.checkParents(n);
    }
  }

  /**
   * Uncheck all parents of the variable "selectedNode"
   *
   * @param node Should be rootNode
   */
  uncheckParents(node: any) {
    for (let n of node.children) {
      if (n == this.selectedNode) {
        node.childSelected = false;
      }
      this.uncheckParents(n);
    }
  }
}
