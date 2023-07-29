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
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid);

    const sortedLeft = mergeSort(leftArr);
    const sortedRight = mergeSort(rightArr);

    return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
    let mergedArr = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            mergedArr.push(left[leftIndex]);
            leftIndex++;
        } else {
            mergedArr.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return mergedArr.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

const randomArray = getRandomNumbers(25)





//build a node class *data, leftChild, rightChild attributes
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

//build a tree class *accepts array, root attributes uses return value of buildTree()
class Tree {
    constructor(array) {
        this.root = this.buildTree(array)
        this.size = 0
    }

//buildTree function takes array turns it into an balanced binary tree full of Node objects *sort and remove duplicates, return the level-0 root node
    buildTree(array) {
        const sortedArray = mergeSort(array)

        if (sortedArray.length <= 0) {
            return null // Base case: no elements to create a node, return null
        }

        const rootNodeIndex = Math.floor(sortedArray.length / 2)
        const root = new Node(sortedArray[rootNodeIndex])

        root.left = this.buildTree(sortedArray.slice(0, rootNodeIndex))
        root.right = this.buildTree(sortedArray.slice(rootNodeIndex + 1))

        return root
    }
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }

        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`); // Updated from node.data to node.value
       
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }


//write insert and delete functions which accepts a value

//find function which accepts a value and return the node with the given value

//level order function accepts another fuction, traverses the tree, returns an array of values, queue array

//inorder, preorder, and postorder functions traverse tree in each way, returns array of values 

//height function accepts node returns its height

//depth function accepts node returns depth

//is balanced checks if left and right subtree have a height difference no more than 1

// rebalance unbalanced
}






const myTree = new Tree(randomArray)
console.log(myTree)







// Test the function
const array = randomArray
const root = myTree.buildTree(array);
const print = myTree.prettyPrint(root)

console.log(root); // Print the value of the level-0 root node
