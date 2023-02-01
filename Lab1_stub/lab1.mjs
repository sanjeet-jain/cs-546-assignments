export const questionOne = (arr) => {
  // Implement question 1 here
  // using reduce function to calculate the cube of each element and add it to the initial value of 0
  //Reference : https://www.w3schools.com/jsref/jsref_reduce.asp
  let sum = arr.reduce(
    (previousValue, currentValue) => previousValue + Math.pow(currentValue, 3),
    0
  );
  //loop through numbers 2 to the the sum-1 and check if its divisible by any number other than itself and 1
  for (let i = 2; i < sum; i++) {
    if (sum % i == 0) {
      return { [sum]: false };
    }
  }
  return { [sum]: true };
};

export const questionTwo = (numArray) => {
  // Implement question 2 here
  for (let i = 0; i < numArray.length - 1; i++) {
    if (numArray[i] > numArray[i + 1]) {
      // since we have found first occurence we return indices and false flag
      return [i, i + 1, false];
    }
  }
  // no occurence found so its sorted
  return [true];
};

export const questionThree = (obj1, obj2) => {
  // Implement question 3 here

  let arrA = Object.keys(obj1);
  let arrB = Object.keys(obj2);
  let result = new Object();
  // we find the common keys of both key lists and append to result object with flag true
  arrA
    .filter((x) => arrB.includes(x))
    .forEach((element) => {
      result[element] = true;
    });
  // then we find the uncommon ones and append to result object with flag false
  arrA
    .filter((x) => !arrB.includes(x))
    .concat(arrB.filter((x) => !arrA.includes(x)))
    .forEach((element) => {
      result[element] = false;
    });
  return result;
};

export const questionFour = (string) => {
  // Implement question 4 here
  let initialArr = string.split("\n");
  for (let i = 0; i < initialArr.length; i++) {
    initialArr[i] = initialArr[i].split(",");
    for (let j = 0; j < initialArr[i].length; j++) {
      initialArr[i][j] = initialArr[i][j].trim();
    }
  }
  return initialArr; //return result
};

export const studentInfo = {
  firstName: "Sanjeet Vinod",
  lastName: "Jain",
  studentId: "20012768",
};
