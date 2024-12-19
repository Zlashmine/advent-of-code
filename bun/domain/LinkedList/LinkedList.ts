import { OUT_OF_BOUNDS } from 'domain/constants'

class LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null = null
  prev: LinkedListNode<T> | null = null

  constructor(value: T) {
    this.value = value
  }
}

export class LinkedList<T> {
  private head: LinkedListNode<T> | null = null
  private tail: LinkedListNode<T> | null = null
  private size: number = 0

  private nodeCache: Map<number, LinkedListNode<T>> = new Map()

  get length(): number {
    return this.size
  }

  append(value: T): void {
    const newNode = new LinkedListNode(value)

    if (!this.head) {
      this.head = this.tail = newNode
    } else {
      this.tail!.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }

    this.nodeCache.set(this.size, newNode)
    this.size++
  }

  prepend(value: T): void {
    const newNode = new LinkedListNode(value)

    if (!this.head) {
      this.head = this.tail = newNode
    } else {
      newNode.next = this.head
      this.head.prev = newNode
      this.head = newNode
    }

    this.rebuildCache()
    this.size++
  }

  insertAt(index: number, value: T): void {
    if (index < 0 || index > this.size) {
      throw new RangeError(OUT_OF_BOUNDS)
    }

    if (index === 0) {
      this.prepend(value)
      return
    }

    if (index === this.size) {
      this.append(value)
      return
    }

    const newNode = new LinkedListNode(value)
    const current = this.getNodeAt(index)
    const previous = current!.prev

    newNode.next = current
    newNode.prev = previous
    previous!.next = newNode
    current!.prev = newNode

    this.rebuildCache()
    this.size++
  }

  removeAt(index: number): T | null {
    if (index < 0 || index >= this.size) {
      throw new RangeError(OUT_OF_BOUNDS)
    }

    const current = this.getNodeAt(index)
    if (!current) return null

    const previous = current.prev
    const next = current.next

    if (previous) {
      previous.next = next
    } else {
      // Removing the head
      this.head = next
    }

    if (next) {
      next.prev = previous
    } else {
      // Removing the tail
      this.tail = previous
    }

    this.rebuildCache()
    this.size--

    return current.value
  }

  private getNodeAt(index: number): LinkedListNode<T> | null {
    if (index < 0 || index >= this.size) {
      throw new RangeError(OUT_OF_BOUNDS)
    }

    if (this.nodeCache.has(index)) {
      return this.nodeCache.get(index)!
    }

    let current = this.head
    for (let i = 0; i < index; i++) {
      current = current!.next
    }

    this.nodeCache.set(index, current!)
    return current
  }

  get(index: number): T | null {
    const node = this.getNodeAt(index)
    return node ? node.value : null
  }

  private rebuildCache(): void {
    this.nodeCache.clear()

    let current = this.head
    let index = 0

    while (current) {
      this.nodeCache.set(index, current)
      current = current.next
      index++
    }
  }

  traverse(callback: (value: T, index: number) => void): void {
    let current = this.head
    let index = 0

    while (current) {
      callback(current.value, index)
      current = current.next
      index++
    }
  }

  toArray(): T[] {
    const result: T[] = []
    this.traverse(value => result.push(value))
    return result
  }
}
