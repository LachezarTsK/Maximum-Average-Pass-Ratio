
// const {PriorityQueue} = require('@datastructures-js/priority-queue');
/*
 PriorityQueue is internally included in the solution file on leetcode.
 So, when running the code on leetcode it should stay commented out. 
 It is mentioned here as a comment, just for information about 
 which external library is applied for this data structure.
 */

function maxAverageRatio(classes: number[][], extraStudents: number): number {
    const maxHeapForIncreaseInSuccessRatio = createMaxHeapForIncreaseInSuccessRatio(classes);
    distributeExtraStudentsToIncreaseMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, extraStudents);
    return calculateMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, classes.length);
};

function Class(numberOfSuccessfulStudents: number, numberOfAllStudents: number, increaseInSuccessRatio: number) {
    this.numberOfSuccessfulStudents = numberOfSuccessfulStudents;
    this.numberOfAllStudents = numberOfAllStudents;
    this.increaseInSuccessRatio = increaseInSuccessRatio;
}

function createMaxHeapForIncreaseInSuccessRatio(classes: number[][]): typeof MaxPriorityQueue {
    const maxHeapForIncreaseInSuccessRatio = new MaxPriorityQueue(
        { compare: (x, y) => y.increaseInSuccessRatio - x.increaseInSuccessRatio });
    for (let current of classes) {
        maxHeapForIncreaseInSuccessRatio.enqueue(new Class(current[0], current[1], calculateIncreaseInSuccessRatio(current[0], current[1])));
    }
    return maxHeapForIncreaseInSuccessRatio;
}

function calculateIncreaseInSuccessRatio(numberOfSuccessfulStudents: number, numberOfAllStudents: number): number {
    return (numberOfSuccessfulStudents + 1) / (numberOfAllStudents + 1)
        - numberOfSuccessfulStudents / numberOfAllStudents;
}

function distributeExtraStudentsToIncreaseMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio: typeof MaxPriorityQueue, extraStudents: number): void {
    while (extraStudents > 0) {
        const current = maxHeapForIncreaseInSuccessRatio.dequeue();
        maxHeapForIncreaseInSuccessRatio.enqueue(new Class(
            current.numberOfSuccessfulStudents + 1,
            current.numberOfAllStudents + 1,
            calculateIncreaseInSuccessRatio(current.numberOfSuccessfulStudents + 1, current.numberOfAllStudents + 1)));
        --extraStudents;
    }
}

function calculateMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio: typeof MaxPriorityQueue, numberOfAllStudents: number): number {
    let maxAverageSuccessRatio = 0;
    while (!maxHeapForIncreaseInSuccessRatio.isEmpty()) {
        const current = maxHeapForIncreaseInSuccessRatio.dequeue();
        maxAverageSuccessRatio += current.numberOfSuccessfulStudents / current.numberOfAllStudents;
    }
    return maxAverageSuccessRatio / numberOfAllStudents;
}
