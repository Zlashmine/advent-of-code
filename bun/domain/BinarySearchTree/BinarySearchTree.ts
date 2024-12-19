import { TreeNode } from './TreeNode'

export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null

  public getRoot(): TreeNode<T> | null {
    return this.root
  }

  public insert(value: T): void {
    const newNode = new TreeNode(value)

    if (!this.root) {
      this.root = newNode
      return
    }

    this.insertAt(this.root, newNode)
  }

  private insertAt(root: TreeNode<T>, newNode: TreeNode<T>): void {
    const key = newNode.value < root.value ? 'left' : 'right'

    if (!root[key]) {
      root[key] = newNode
      return
    }

    this.insertAt(root[key]!, newNode)
  }

  public searchTree(value: T): boolean {
    return this.searchAt(this.root, value)
  }

  private searchAt(root: TreeNode<T> | null = this.root, value: T): boolean {
    if (!root) return false
    if (root.value === value) return true

    const nextRoot = value < root.value ? root.left : root.right
    return this.searchAt(nextRoot, value)
  }

  public min = (root: TreeNode<T> | null): T | null => {
    if (!root) return null
    if (!root.left) return root.value

    return this.min(root.left)
  }

  public max = (root: TreeNode<T> | null): T | null => {
    if (!root) return null
    if (!root.right) return root.value

    return this.max(root.right)
  }

  public inOrderTraversal(
    node: TreeNode<T> | null = this.root,
    result: T[] = []
  ): T[] {
    if (node) {
      this.inOrderTraversal(node.left, result)
      result.push(node.value)
      this.inOrderTraversal(node.right, result)
    }
    return result
  }

  public preOrderTraversal(
    node: TreeNode<T> | null = this.root,
    result: T[] = []
  ): T[] {
    if (node) {
      result.push(node.value)
      this.preOrderTraversal(node.left, result)
      this.preOrderTraversal(node.right, result)
    }
    return result
  }

  public postOrderTraversal(
    node: TreeNode<T> | null = this.root,
    result: T[] = []
  ): T[] {
    if (node) {
      this.postOrderTraversal(node.left, result)
      this.postOrderTraversal(node.right, result)
      result.push(node.value)
    }
    return result
  }
}
