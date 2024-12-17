
#include <span>
#include <queue>
#include <vector>
using namespace std;

class Solution {

    struct Class {

        int numberOfSuccessfulStudents{};
        int numberOfAllStudents{};
        double increaseInSuccessRatio{};

        Class(int numberOfSuccessfulStudents, int numberOfAllStudents, double increaseInSuccessRatio) :
                numberOfSuccessfulStudents{ numberOfSuccessfulStudents },
                numberOfAllStudents{ numberOfAllStudents },
                increaseInSuccessRatio{ increaseInSuccessRatio } {}
    };

    struct Comparator {
        auto operator()(const Class& first, const Class& second) {
            return calculateIncreaseInSuccessRatio(first.numberOfSuccessfulStudents, first.numberOfAllStudents)
                    < calculateIncreaseInSuccessRatio(second.numberOfSuccessfulStudents, second.numberOfAllStudents);
        }
    };

    using MaxHeap = priority_queue<Class, vector<Class>, Comparator>;

public:
    double maxAverageRatio(const vector<vector<int>>& classes, int extraStudents) const {
        MaxHeap maxHeapForIncreaseInSuccessRatio = createMaxHeapForIncreaseInSuccessRatio(classes);
        distributeExtraStudentsToIncreaseMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, extraStudents);
        return calculateMaxAverageSuccessRatio(maxHeapForIncreaseInSuccessRatio, classes.size());
    }

private:
    MaxHeap createMaxHeapForIncreaseInSuccessRatio(span<const vector<int>> classes) const {
        MaxHeap maxHeapForIncreaseInSuccessRatio;
        for (const auto& current : classes) {
            maxHeapForIncreaseInSuccessRatio.emplace(current[0], current[1], calculateIncreaseInSuccessRatio(current[0], current[1]));
        }
        return maxHeapForIncreaseInSuccessRatio;
    }

    static double calculateIncreaseInSuccessRatio(int numberOfSuccessfulStudents, int numberOfAllStudents) {
        return static_cast<double>(numberOfSuccessfulStudents + 1) / (numberOfAllStudents + 1)
                - static_cast<double>(numberOfSuccessfulStudents) / numberOfAllStudents;
    }

    void distributeExtraStudentsToIncreaseMaxAverageSuccessRatio(MaxHeap& maxHeapForIncreaseInSuccessRatio, int extraStudents) const {
        while (extraStudents > 0) {
            Class current = maxHeapForIncreaseInSuccessRatio.top();
            maxHeapForIncreaseInSuccessRatio.pop();

            maxHeapForIncreaseInSuccessRatio.emplace(
                current.numberOfSuccessfulStudents + 1,
                current.numberOfAllStudents + 1,
                calculateIncreaseInSuccessRatio(current.numberOfSuccessfulStudents + 1, current.numberOfAllStudents + 1));

            --extraStudents;
        }
    }

    double calculateMaxAverageSuccessRatio(MaxHeap& maxHeapForIncreaseInSuccessRatio, int numberOfAllStudents) const {
        double maxAverageSuccessRatio = 0;
        while (!maxHeapForIncreaseInSuccessRatio.empty()) {
            Class current = maxHeapForIncreaseInSuccessRatio.top();
            maxHeapForIncreaseInSuccessRatio.pop();
            maxAverageSuccessRatio += static_cast<double>(current.numberOfSuccessfulStudents) / current.numberOfAllStudents;
        }
        return maxAverageSuccessRatio / numberOfAllStudents;
    }
};
