import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {TreeNode} from './tree-node';

/**
 * Used to get data using HTTP and to (un)check nodes
 */
@Injectable()
export class TreeService {
  selectedNode: TreeNode;

  //nodeChange: Subject<TreeNode> = new Subject<TreeNode>();

  constructor(private http: Http) {
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
    if (selectedNode.children.length > 0) {
      selectedNode.childSelected = true;
    }
    console.log(selectedNode);
    this.checkChildren(selectedNode);
    this.selectedNode = selectedNode;

    this.checkParents(rootNode);

    //this.checkChildrenIt(rootNode);
  }

  /**
   * Calls uncheckChildren() and uncheckParents() using the given node
   *
   * @param selectedNode The selected node
   * @param rootNode
   */
  nodeUnselected(selectedNode: TreeNode, rootNode: TreeNode) {
    if (selectedNode.children.length > 0) {
      selectedNode.childSelected = false;
    }
    console.log(selectedNode);
    this.checkChildren(selectedNode);
    this.selectedNode = selectedNode;
    this.uncheckParents(rootNode);
  }

  /**
   * Check (if unchecked) or uncheck (if checked) all children of the given node
   *
   * @param node The selected node
   */
  checkChildren(node: any) {
    node.selected = !node.selected;
    console.log(node.name);
    for (let n of node.children) {
      this.checkChildren(n);
    }
  }

  checkChildrenIt(node: any) {
    if (node == null) {
      return;
    }
    let nodes: TreeNode[] = [];
    nodes.push(node);

    while (nodes.length > 0) {
      node = nodes[nodes.length - 1];
      nodes.splice(nodes.length - 1, 1);
      console.log(node.name);
      for (let n of node.children) {
        nodes.push(n);
      }
    }
  }

  /**
   * Check all parents of the variable "selectedNode"
   *
   * @param node Should be rootNode
   */
  checkParents(node: any) {
    for (let n of node.children) {
      n.childSelected = this.checkParents(n);
      if (n == this.selectedNode) {
        return true;
      }
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
