export class TreeNode {
  name: String;
  number: number;
  children: Array<TreeNode>;
  selected: boolean;
  childSelected: boolean = false;
  level: number;

  /*
  constructor() {}

  constructor(name: String, number: number, children: Array<TreeNode>, selected: boolean) {
    this.childSelected = false;
    this.name = name;
    this.number = number;
    this.children = children;
    this.selected = selected;
  }
  */

  public setName(name: String) {
    this.name = name;
  }

}
