export class TreeNode {
  name: String;
  number: number;
  children: Array<TreeNode>;
  selected: boolean;
  childSelected: boolean = false;
  level: number;

  constructor(name: String, number: number, children: Array<TreeNode>, selected: boolean) {
    this.childSelected = false;
  }
}
