
import java.util.PriorityQueue;

public class Solution {

    private record Class(int numberOfSuccessfulStudents, int numberOfAllStudents, double increaseInSuccessRatio){}

    public double maxAverageRatio(int[][] classes, int extraStudents) {
        PriorityQueue<Class> maxHeapForIncreaseInSuccessRatio = createMaxHeapForIncreaseInSuccessRatio(classes);
        distributeExtraStudentsToIncreaseMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, extraStudents);
        return calculateMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, classes.length);
    }

    private PriorityQueue<Class> createMaxHeapForIncreaseInSuccessRatio(int[][] classes) {
        PriorityQueue<Class> maxHeapForIncreaseInSuccessRatio = new PriorityQueue<>(
                (x, y) -> Double.compare(y.increaseInSuccessRatio, x.increaseInSuccessRatio));
        for (int[] current : classes) {
            maxHeapForIncreaseInSuccessRatio.add(new Class(current[0], current[1], calculateIncreaseInSuccessRatio(current[0], current[1])));
        }
        return maxHeapForIncreaseInSuccessRatio;
    }

    private double calculateIncreaseInSuccessRatio(int numberOfSuccessfulStudents, int numberOfAllStudents) {
        return ((double) numberOfSuccessfulStudents + 1) / (numberOfAllStudents + 1)
                - ((double) numberOfSuccessfulStudents) / (numberOfAllStudents);
    }

    private void distributeExtraStudentsToIncreaseMaxAverageSuccessRatio(PriorityQueue<Class> maxHeapForIncreaseInSuccessRatio, int extraStudents) {
        while (extraStudents > 0) {
            Class current = maxHeapForIncreaseInSuccessRatio.poll();
            maxHeapForIncreaseInSuccessRatio.add(new Class(
                    current.numberOfSuccessfulStudents + 1,
                    current.numberOfAllStudents + 1,
                    calculateIncreaseInSuccessRatio(current.numberOfSuccessfulStudents + 1, current.numberOfAllStudents + 1)));
            --extraStudents;
        }
    }

    private double calculateMaxAverageSuccessRatio(PriorityQueue<Class> maxHeapForIncreaseInSuccessRatio, int numberOfAllStudents) {
        double maxAverageSuccessRatio = 0;
        for (Class current : maxHeapForIncreaseInSuccessRatio) {
            maxAverageSuccessRatio += (double) current.numberOfSuccessfulStudents / current.numberOfAllStudents;
        }
        return maxAverageSuccessRatio / numberOfAllStudents;
    }
}
