
import java.util.PriorityQueue

class Solution {

    private data class Class(val numberOfSuccessfulStudents: Int, val numberOfAllStudents: Int, val increaseInSuccessRatio: Double){}

    fun maxAverageRatio(classes: Array<IntArray>, extraStudents: Int): Double {
        val maxHeapForIncreaseInSuccessRatio: PriorityQueue<Class> = createMaxHeapForIncreaseInSuccessRatio(classes)
        distributeExtraStudentsToIncreaseMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, extraStudents)
        return calculateMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, classes.size)
    }

    private fun createMaxHeapForIncreaseInSuccessRatio(classes: Array<IntArray>): PriorityQueue<Class> {
        val maxHeapForIncreaseInSuccessRatio = PriorityQueue<Class>() { x, y -> y.increaseInSuccessRatio.compareTo(x.increaseInSuccessRatio) }
        for (current in classes) {
            maxHeapForIncreaseInSuccessRatio.add(Class(current[0], current[1], calculateIncreaseInSuccessRatio(current[0], current[1])))
        }
        return maxHeapForIncreaseInSuccessRatio
    }

    private fun calculateIncreaseInSuccessRatio(numberOfSuccessfulStudents: Int, numberOfAllStudents: Int): Double {
        return (numberOfSuccessfulStudents.toDouble() + 1) / (numberOfAllStudents + 1) - numberOfSuccessfulStudents.toDouble() / numberOfAllStudents
    }

    private fun distributeExtraStudentsToIncreaseMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio: PriorityQueue<Class>, extraStudents: Int) {
        var extraStudents = extraStudents
        while (extraStudents > 0) {
            val current = maxHeapForIncreaseInSuccessRatio.poll()
            maxHeapForIncreaseInSuccessRatio.add(
                Class(
                    current.numberOfSuccessfulStudents + 1,
                    current.numberOfAllStudents + 1,
                    calculateIncreaseInSuccessRatio(current.numberOfSuccessfulStudents + 1,current.numberOfAllStudents + 1)
                )
            )
            --extraStudents
        }
    }

    private fun calculateMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio: PriorityQueue<Class>, numberOfAllStudents: Int): Double {
        var maxAverageSuccessRatio: Double = 0.0
        for (current in maxHeapForIncreaseInSuccessRatio) {
            maxAverageSuccessRatio += current.numberOfSuccessfulStudents.toDouble() / current.numberOfAllStudents
        }
        return maxAverageSuccessRatio / numberOfAllStudents
    }
}
