export class TreeNode {
  name: String;
  nr: number;
  children: Array<TreeNode>;
  selected: boolean;
  childSelected: boolean = false;

  constructor(name: String, nr: number, children: Array<TreeNode>) {
  }
}
