
// const {PriorityQueue} = require('@datastructures-js/priority-queue');
/*
 PriorityQueue is internally included in the solution file on leetcode.
 So, when running the code on leetcode it should stay commented out. 
 It is mentioned here as a comment, just for information about 
 which external library is applied for this data structure.
 */

/**
 * @param {number[][]} classes
 * @param {number} extraStudents
 * @return {number}
 */
var maxAverageRatio = function (classes, extraStudents) {
    const maxHeapForIncreaseInSuccessRatio = createMaxHeapForIncreaseInSuccessRatio(classes);
    distributeExtraStudentsToIncreaseMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, extraStudents);
    return calculateMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, classes.length);
};

/**
 * @param {number} numberOfSuccessfulStudents
 * @param {number} numberOfAllStudents
 * @param {number} increaseInSuccessRatio
 */
function Class(numberOfSuccessfulStudents, numberOfAllStudents, increaseInSuccessRatio) {
    this.numberOfSuccessfulStudents = numberOfSuccessfulStudents;
    this.numberOfAllStudents = numberOfAllStudents;
    this.increaseInSuccessRatio = increaseInSuccessRatio;
}

/**
 * @param {number[][]} classes
 * @return {MaxPriorityQueue<Class>}
 */
function createMaxHeapForIncreaseInSuccessRatio(classes) {
    const maxHeapForIncreaseInSuccessRatio = new MaxPriorityQueue(
            {compare: (x, y) => y.increaseInSuccessRatio - x.increaseInSuccessRatio});
    for (let current of classes) {
        maxHeapForIncreaseInSuccessRatio.enqueue(new Class(current[0], current[1], calculateIncreaseInSuccessRatio(current[0], current[1])));
    }
    return maxHeapForIncreaseInSuccessRatio;
}

/**
 * @param {number} numberOfSuccessfulStudents
 * @param {number} numberOfAllStudents
 * @return {number}
 */
function calculateIncreaseInSuccessRatio(numberOfSuccessfulStudents, numberOfAllStudents) {
    return (numberOfSuccessfulStudents + 1) / (numberOfAllStudents + 1)
            - numberOfSuccessfulStudents / numberOfAllStudents;
}

/**
 * @param {MaxPriorityQueue<Class>} maxHeapForIncreaseInSuccessRatio
 * @param {number} extraStudents
 * @return {void}
 */
function distributeExtraStudentsToIncreaseMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, extraStudents) {
    while (extraStudents > 0) {
        const current = maxHeapForIncreaseInSuccessRatio.dequeue();
        maxHeapForIncreaseInSuccessRatio.enqueue(new Class(
                current.numberOfSuccessfulStudents + 1,
                current.numberOfAllStudents + 1,
                calculateIncreaseInSuccessRatio(current.numberOfSuccessfulStudents + 1, current.numberOfAllStudents + 1)));
        --extraStudents;
    }
}

/**
 * @param {MaxPriorityQueue<Class>} maxHeapForIncreaseInSuccessRatio
 * @param {number} numberOfAllStudents
 * @return {number}
 */
function calculateMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, numberOfAllStudents) {
    let maxAverageSuccessRatio = 0;
    while (!maxHeapForIncreaseInSuccessRatio.isEmpty()) {
        const current = maxHeapForIncreaseInSuccessRatio.dequeue();
        maxAverageSuccessRatio += current.numberOfSuccessfulStudents / current.numberOfAllStudents;
    }
    return maxAverageSuccessRatio / numberOfAllStudents;
}
