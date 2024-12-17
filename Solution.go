
package main

import (
    "container/heap"
    "fmt"
)

func maxAverageRatio(classes [][]int, extraStudents int) float64 {
    var maxHeapForIncreaseInSuccessRatio PriorityQueue = createMaxHeapForIncreaseInSuccessRatio(classes)
    distributeExtraStudentsToIncreaseMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, extraStudents)
    return calculateMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, len(classes))
}

func createMaxHeapForIncreaseInSuccessRatio(classes [][]int) PriorityQueue {
    maxHeapForIncreaseInSuccessRatio := make(PriorityQueue, 0)
    for _, current := range classes {
        heap.Push(&maxHeapForIncreaseInSuccessRatio, NewClass(current[0], current[1], calculateIncreaseInSuccessRatio(current[0], current[1])))
    }
    return maxHeapForIncreaseInSuccessRatio
}

func calculateIncreaseInSuccessRatio(numberOfSuccessfulStudents int, numberOfAllStudents int) float64 {
    return float64(numberOfSuccessfulStudents + 1) / float64(numberOfAllStudents + 1) - float64(numberOfSuccessfulStudents) / float64(numberOfAllStudents)
}

func distributeExtraStudentsToIncreaseMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio PriorityQueue, extraStudents int) {
    for extraStudents > 0 {
        current := heap.Pop(&maxHeapForIncreaseInSuccessRatio).(*Class)
        heap.Push(&maxHeapForIncreaseInSuccessRatio,
            NewClass(current.numberOfSuccessfulStudents+1,
                    current.numberOfAllStudents+1,
                    calculateIncreaseInSuccessRatio(current.numberOfSuccessfulStudents+1, current.numberOfAllStudents+1)))
        extraStudents--
    }
}

func calculateMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio PriorityQueue, numberOfAllStudents int) float64 {
    var maxAverageSuccessRatio float64 = 0.0
    for _, current := range maxHeapForIncreaseInSuccessRatio {
        maxAverageSuccessRatio += float64(current.numberOfSuccessfulStudents) / float64(current.numberOfAllStudents)
    }
    return float64(maxAverageSuccessRatio) / float64(numberOfAllStudents)
}

type Class struct {
    numberOfSuccessfulStudents int
    numberOfAllStudents        int
    increaseInSuccessRatio     float64
}

func NewClass(numberOfSuccessfulStudents int, numberOfAllStudents int, increaseInSuccessRatio float64) *Class {
    return &Class{
        numberOfSuccessfulStudents: numberOfSuccessfulStudents,
        numberOfAllStudents:        numberOfAllStudents,
        increaseInSuccessRatio:     increaseInSuccessRatio,
    }
}

type PriorityQueue []*Class

func (pq PriorityQueue) Len() int {
    return len(pq)
}

func (pq PriorityQueue) Less(first int, second int) bool {
    return pq[first].increaseInSuccessRatio > pq[second].increaseInSuccessRatio
}

func (pq PriorityQueue) Swap(first int, second int) {
    pq[first], pq[second] = pq[second], pq[first]
}

func (pq *PriorityQueue) Push(object any) {
    *pq = append(*pq, object.(*Class))
}

func (pq *PriorityQueue) Pop() any {
    class := (*pq)[pq.Len() - 1]
    (*pq)[pq.Len() - 1] = nil
    *pq = (*pq)[0 : pq.Len() - 1]
    return class
}
