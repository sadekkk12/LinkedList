class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(payload) {
        const newNode = new Node(payload);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }

    addFirst(payload) {
        const newNode = new Node(payload);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
    }

    clear() {
        this.head = this.tail = null;
    }

    get(index) {
        let currentNode = this.head;
        let count = 0;
        while (currentNode !== null && count < index) {
            currentNode = currentNode.next;
            count++;
        }
        return currentNode ? currentNode.data : undefined;
    }

    indexOf(payload) {
        let currentNode = this.head;
        let index = 0;
        while (currentNode !== null) {
            if (currentNode.data === payload) return index;
            currentNode = currentNode.next;
            index++;
        }
        return -1;
    }

    insertAfter(index, payload) {
        const newNode = new Node(payload);
        if (index === 0 && !this.head) {
            this.head = this.tail = newNode;
            return;
        }

        let currentNode = this.head;
        let count = 0;
        while (currentNode !== null && count < index) {
            currentNode = currentNode.next;
            count++;
        }

        if (!currentNode) {
            console.log("Index out of bounds");
            return;
        }

        newNode.next = currentNode.next;
        newNode.prev = currentNode;
        if (currentNode.next) currentNode.next.prev = newNode;
        else this.tail = newNode;
        currentNode.next = newNode;
    }

    insertBefore(index, payload) {
        if (index === 0) {
            this.addFirst(payload);
            return;
        }
        this.insertAfter(index - 1, payload);
    }

    first() {
        return this.head ? this.head.data : undefined;
    }

    last() {
        return this.tail ? this.tail.data : undefined;
    }

    remove(index) {
        if (index === 0) return this.removeFirst();
        let currentNode = this.head;
        let count = 0;
        while (currentNode !== null && count < index) {
            currentNode = currentNode.next;
            count++;
        }

        if (!currentNode) {
            console.log("Index out of bounds");
            return undefined;
        }

        if (currentNode.next) currentNode.next.prev = currentNode.prev;
        else this.tail = currentNode.prev;
        if (currentNode.prev) currentNode.prev.next = currentNode.next;
        else this.head = currentNode.next;

        return currentNode.data;
    }

    removeFirst() {
        if (!this.head) return undefined;
        const data = this.head.data;
        this.head = this.head.next;
        if (this.head) this.head.prev = null;
        else this.tail = null;
        return data;
    }

    removeLast() {
        if (!this.tail) return undefined;
        const data = this.tail.data;
        this.tail = this.tail.prev;
        if (this.tail) this.tail.next = null;
        else this.head = null;
        return data;
    }


    dumpList() {
        let current = this.head;
        console.log("List:");
        while (current !== null) {
            console.log(`Data: ${current.data}, Prev: ${current.prev ? current.prev.data : 'null'}, Next: ${current.next ? current.next.data : 'null'}`);
            current = current.next;
        }
    }
}

const myList = new LinkedList();
myList.add("Node 1"); // Adds to the end of the list
myList.add("Node 2"); // Continues adding to the end
myList.addFirst("Node 0"); // Adds to the beginning of the list
myList.dumpList();
