// const containerDiv = document.getElementById('container')




const getRandomNumbers = (numberOfNumbers) => {

   let randomArray = []

    for (let i = 0; i < numberOfNumbers; i++) {
        let number = Math.floor(Math.random() * 100)
        randomArray.push(number)
    }

    return randomArray      
}

function mergeSort(arr) {
    console.log()
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






//build a node class *data, leftChild, rightChild attributes
class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

//build a tree class *accepts array, root attributes uses return value of buildTree()
//buildTree function takes array turns it into an balanced binary tree full of Node objects *sort and remove duplicates, return the level-0 root node
class Tree {
    constructor() {
        this.root = this.buildTree(sortedArray)    
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
            return
        } else {
            const searchTree = (node) => {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data)
                        return
                    } else {
                        searchTree(node.left)
                    }
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data)
                        return
                    } else {
                        searchTree(node.right)
                    }
                }
            }
            searchTree(node)
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
//write insert and delete functions which accepts a value
// insert(value, root = this.root) {
//     if (root === null) {
//       this.size++;
//       return new Node(value);
//     }
  
//     if (value < root.value) {
//       root.left = this.insert(value, root.left);
//     } else if (value > root.value) {
//       root.right = this.insert(value, root.right);
//     }
  
//     return root;
//   }
    removeFrom(index) {

    }
//find function which accepts a value and return the node with the given value

//level order function accepts another fuction, traverses the tree, returns an array of values, queue array

//inorder, preorder, and postorder functions traverse tree in each way, returns array of values 

//height function accepts node returns its height

//depth function accepts node returns depth

//is balanced checks if left and right subtree have a height difference no more than 1

// rebalance unbalanced
}

const randomArray = getRandomNumbers(50)
const sortedArray = mergeSort(randomArray)




console.log(sortedArray)

const myTree = new Tree()
console.log(myTree)
console.log(randomArray)
console.log(myTree.sortArray(randomArray))
console.log(myTree.getSortedArrayLength(randomArray))

myTree.buildTree(myTree.sortArray(randomArray))


// Test the function
// myTree.buildTreeRecursive(randomArray)
// const root = myTree.insert(myTree.returnData(sortedArray))
// // const insert = myTree.insert(99)
// const print = myTree.prettyPrint(root)

// console.log(root); // Print the value of the level-0 root node
// console.log(myTree.returnData(randomArray))