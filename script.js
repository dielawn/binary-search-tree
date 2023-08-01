const containerDiv = document.getElementById('container')

const getRandomNumbers = (numberOfNumbers) => {

   let randomArray = []

    for (let i = 0; i < numberOfNumbers; i++) {
        let number = Math.floor(Math.random() * 100)
        randomArray.push(number)
    }

    return randomArray      
}

function mergeSort(arr) {
   
    if (arr.length <= 1) {
        return arr
    }

    const mid = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, mid)
    const rightArr = arr.slice(mid)

    const sortedLeft = mergeSort(leftArr)
    const sortedRight = mergeSort(rightArr)

    return merge(sortedLeft, sortedRight)
}

function merge(left, right) {
    let mergedArr = []
    let leftIndex = 0
    let rightIndex = 0

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            if (mergedArr.length === 0 || left[leftIndex] !== mergedArr[mergedArr.length - 1]) {
                mergedArr.push(left[leftIndex]);
            }
            leftIndex++;
        } else if (right[rightIndex] < left[leftIndex]) {
            if (mergedArr.length === 0 || right[rightIndex] !== mergedArr[mergedArr.length - 1]) {
                mergedArr.push(right[rightIndex]);
            }
            rightIndex++;
        } else {
            // If both elements are equal, push one of them (avoid duplicates)
            if (mergedArr.length === 0 || left[leftIndex] !== mergedArr[mergedArr.length - 1]) {
                mergedArr.push(left[leftIndex]);
            }
            leftIndex++;
            rightIndex++;
        }
    }

    // Add remaining elements from both arrays
    while (leftIndex < left.length) {
        if (mergedArr.length === 0 || left[leftIndex] !== mergedArr[mergedArr.length - 1]) {
            mergedArr.push(left[leftIndex]);
        }
        leftIndex++;
    }

    while (rightIndex < right.length) {
        if (mergedArr.length === 0 || right[rightIndex] !== mergedArr[mergedArr.length - 1]) {
            mergedArr.push(right[rightIndex]);
        }
        rightIndex++;
    }

    return mergedArr;
    }

class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array)    
        this.size = this.getSortedArrayLength(this.sortArray)
    }
    sortArray(array) {

        return mergeSort(array)    
    }
    getSortedArrayLength(array) {

        let sortedArray = mergeSort(array)
        this.size = sortedArray.length
        return  sortedArray.length
    } 
    buildTree(array, start = 0, end = this.getSortedArrayLength(array)) {
        
        if (start >= end) return null 

        let midPoint = Math.floor((start + end) / 2)
        
        let node = new Node(array[midPoint])                    
        node.right = this.buildTree(array, midPoint + 1, end)
        node.left = this.buildTree(array, start, midPoint - 1)
    
        return node
    }
    insert(data) {
        
        const node = this.root
        if (node === null) {
            this.root = new Node(data)
            this.size++
            return
        } else {
            const searchTree = (node) => {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data)
                        this.size++
                        return
                    } else searchTree(node.left)
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data)
                        this.size++
                        return
                    } else searchTree(node.right)
                }
            }
            searchTree(node)
        }
    }
    remove(data) {
        this.root = this.removeNode(this.root, data)
        this.size-- 
    }
    removeNode(root, data) {
        if (root === null) return root
        
        if (data < root.data)  {
            root.left = this.removeNode(root.left, data)
            return root
        } else if (data > root.data) {
            root.right = this.removeNode(root.right, data)
            return root
        } else {
            //node with no children
            if (root.left === null) return root.right
            else if (root.right === null) return root.left

            //node with 2 children
            let succParent = root
            let succ = root.right

            while (succ.left !== null) {
                succParent = succ
                succ = succ.left
            }

            //update connection from succParent to succ.right
            if (succParent !== root) succParent.left = succ.right
            else succParent.right = succ.right

            root.data = succ.data
            
            return root
        }
    }
     //find function which accepts a value and return the node with the given value
    find(data) {
        const searchTree = (node) => {

            if (node === null) return null
            if (data === node.data) return node
            else if (data < node.data) return searchTree(node.left)
            else return searchTree(node.right)
        }
        
        return searchTree(this.root)
    }
    //level order function accepts another fuction, traverses the tree, returns an array of values, queue array
    levelOrderTraversal() {

        if (this.root == null) return null

        let queue = []
        let result = []

        queue.push(this.root)

        while (queue.length > 0) {
            let node = queue.shift()

            result.push(node.data)

            if (node.left) {
                queue.push(node.left)
            }

            if (node.right) {
                queue.push(node.right)
            }
        }

        return result   
    }
    inOrder() {

        if (this.root == null) return null
        
        const result = []
        const inOrderTraverse = (node) => {
            node.left && inOrderTraverse(node.left)
            result.push(node.data)
            node.right && inOrderTraverse(node.right)
        }

        inOrderTraverse(this.root)
        return result

    }    
    preOrder() {

        if (this.root == null) return null

        const result = []
        const preOrderTraverse = (node) => {
            result.push(node.data)
            node.left && preOrderTraverse(node.left)
            node.right && preOrderTraverse(node.right)
        }

        preOrderTraverse(this.root)
        return result

    }
    postOrder() {

        if (this.root === null) return null

        const result = []
        const postOrderTraverse = (node) => {
            result.push(node.data)
            node.right && postOrderTraverse(node.right)
            node.left && postOrderTraverse(node.left)
        }

        postOrderTraverse(this.root)
        return result

    }
    getHeight(node) {

        if (node === null) return -1

        let left = this.getHeight(node.left)
        let right = this.getHeight(node.right)

        if (left > right) return left + 1
        else return right + 1

    }
    getDepth(node) {

        if (node === null) return 0

        let left = this.getDepth(node.left)
        let right = this.getDepth(node.right)

        if (left < right) return left + 1
        else return right + 1

    }
    

//is balanced checks if left and right subtree have a height difference no more than 1

// rebalance unbalanced         
    
    htmlPrint(node = this.root,  prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
    
        if (node.right !== null) {
            this.htmlPrint(node.right,  `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
    
        const newNode = document.createElement("div");
        newNode.classList.add('node')
        newNode.textContent = `${prefix}${isLeft ? "  └────   " : "  ┌──── "}${node.data}`;
        containerDiv.appendChild(newNode);
    
        if (node.left !== null) {
            this.htmlPrint(node.left,  `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
    

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return
        }

        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
       
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
        }
    }


}

const nameArray = ['alex', 'bob', 'cindy', 'dave', 'ed', 'frank', 'gina', 'helen', 'ira', 'john', 'karen', 'loyd', 'mary', 'ned', 'opal', 'piper', 'quinton', 'rachel', 'sally', 'tom', 'unis', 'vicki', 'wendel', 'xavier', 'yanni', 'zoe' ]
const unsortedNames = ['zoe', 'alex', 'xavier', 'bob', 'wendel','cindy', 'vicki','dave','unis','ed','tom', 'frank', 'gina', 'helen', 'yanni', 'ira', 'john', 'karen', 'loyd', 'mary', 'ned', 'opal', 'piper', 'quinton', 'rachel', 'sally']
const randomArray = getRandomNumbers(50)
const sortedArray = mergeSort(randomArray)
const sortedNames = mergeSort(unsortedNames)


const nameTree = new Tree(sortedNames)
nameTree.buildTree(sortedNames)

// console.log(sortedArray)

const myTree = new Tree(sortedArray)
myTree.buildTree(sortedArray)
// console.log(myTree)
// console.log(randomArray)
// console.log(myTree.sortArray(randomArray))
// console.log(myTree.getSortedArrayLength(randomArray))


// Test the function
// myTree.buildTreeRecursive(randomArray)
// const root = myTree.insert(myTree.returnData(sortedArray))
// // const insert = myTree.insert(99)
// const print = myTree.prettyPrint(root)

// console.log(root); // Print the value of the level-0 root node
// console.log(myTree.returnData(randomArray))

// myTree.htmlPrint(myTree.root)
// nameTree.htmlPrint()
// nameTree.prettyPrint()

myTree.htmlPrint()
myTree.prettyPrint()