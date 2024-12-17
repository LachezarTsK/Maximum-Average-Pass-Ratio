
using System;
using System.Collections.Generic;

public class Solution
{
    private record Class(int numberOfSuccessfulStudents, int numberOfAllStudents){}

    public double MaxAverageRatio(int[][] classes, int extraStudents)
    {
        PriorityQueue<Class, double> maxHeapForIncreaseInSuccessRatio = CreateMaxHeapForIncreaseInSuccessRatio(classes);
        DistributeExtraStudentsToIncreaseMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, extraStudents);
        return CalculateMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, classes.Length);
    }

    private PriorityQueue<Class, double> CreateMaxHeapForIncreaseInSuccessRatio(int[][] classes)
    {
        PriorityQueue<Class, double> maxHeapForIncreaseInSuccessRatio = new PriorityQueue<Class, double>(
                Comparer<double>.Create((x, y) => y.CompareTo(x)));

        foreach (int[] current in classes) 
        {
            maxHeapForIncreaseInSuccessRatio.Enqueue(new Class(current[0], current[1]),CalculateIncreaseInSuccessRatio(current[0], current[1]));
        }
        return maxHeapForIncreaseInSuccessRatio;
    }

    private double CalculateIncreaseInSuccessRatio(int numberOfSuccessfulStudents, int numberOfAllStudents) 
    {
        return ((double) numberOfSuccessfulStudents + 1) / (numberOfAllStudents + 1)
                - ((double) numberOfSuccessfulStudents) / (numberOfAllStudents);
    }

    private void DistributeExtraStudentsToIncreaseMaxAverageSuccessRatio(PriorityQueue<Class, double> maxHeapForIncreaseInSuccessRatio, int extraStudents) 
    {
        while (extraStudents > 0) 
        {
            Class current = maxHeapForIncreaseInSuccessRatio.Dequeue();
            maxHeapForIncreaseInSuccessRatio.Enqueue(new Class(
                    current.numberOfSuccessfulStudents + 1,
                    current.numberOfAllStudents + 1), CalculateIncreaseInSuccessRatio(current.numberOfSuccessfulStudents + 1, current.numberOfAllStudents + 1));
            
            --extraStudents;
        }
    }

    private static double CalculateMaxAverageSuccessRatio(PriorityQueue<Class, double> maxHeapForIncreaseInSuccessRatio, int numberOfAllStudents) 
    {
        double maxAverageSuccessRatio = 0;
        while (maxHeapForIncreaseInSuccessRatio.Count > 0) 
        {
            var current = maxHeapForIncreaseInSuccessRatio.Dequeue();
            maxAverageSuccessRatio += (double) current.numberOfSuccessfulStudents / current.numberOfAllStudents;
        }
        return (double)maxAverageSuccessRatio / numberOfAllStudents;
    }
}
