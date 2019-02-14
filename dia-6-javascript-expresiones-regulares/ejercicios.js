// // function upper_case(str) {
// //   regexp = /^[A-Z]/;
// //   if (regexp.test(str)) {
// //     console.log("String con el primer carácter en mayúsculas");
// //   } else {
// //     console.log("String sin mayúsculas");
// //   }
// // }

// // upper_case("Abcd");

// // upper_case("abcd");

// function is_creditCard(str) {
//   regexp = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;

//   if (regexp.test(str)) {
//     return true;
//   } else {
//     return false;
//   }
// }

// console.log(is_creditCard("378282246310006"));

// console.log(is_creditCard("37828224630006"));

// function count_words(str1) {
//   //exclude  start and end white-space
//   str1 = str1.replace(/(^\s*)|(\s*$)/gi, "");
//   //convert 2 or more spaces to 1
//   str1 = str1.replace(/[ ]{2,}/gi, " ");
//   // exclude newline with a start spacing
//   str1 = str1.replace(/\n /, "\n");
//   document.getElementById("noofwords").value = str1.split(" ").length;
// }

// count_words("Esta es la   cadena que tiene que cambiar");

// La funcion factorial por ejemplo 5 es 5*4*3*2*1 total= 120

// function factorial(num) {
//   if (num == 1) {
//     return 1;
//   } else {
//     return num * factorial(num - 1);
//   }
// }
// var total = factorial(10);
// console.log(total);

// 3Write a JavaScript program to get the integers in range (x, y).
// Example : range(2, 9)
// Expected Output : [3, 4, 5, 6, 7, 8]

// var arr = [];
// function rango(num, num2) {
//   console.log(num + " " + num2);
//   if (num == num2) {
//     console.log(arr);
//     console.log(arr.toString());
//     console.log(num + "_" + num2);
//     return arr;
//   } else {
//     arr.push(num + 1);
//     // arr.push(num2 - 1);
//     rango(num + 1, num2);
//   }
// }

// console.log(rango(2, 9));

let n = 3;

let arr = Array(n);

arr[0] = "4 6 -1".split(" ").map(arrTemp => parseInt(arrTemp, 10));
arr[1] = "7 2 4".split(" ").map(arrTemp => parseInt(arrTemp, 10));
arr[2] = "10 4 3".split(" ").map(arrTemp => parseInt(arrTemp, 10));
arr[3] = "10 4 3".split(" ").map(arrTemp => parseInt(arrTemp, 10));

const result = diagonalDifference(arr);
console.log(result);
//(4+2+3)-(10+2-1)

function diagonalDifference(arr) {
  var rest = 0;
  var sum = 0;
  for (let index = 0; index < arr.length; index++) {
    for (let index2 = 0; index2 < arr[index].length; index2++) {
      if (index == 0) {
        rest = rest + arr[index2][index2];
      }
      if (index == arr[index].length - index2 - 1) {
        sum = sum + arr[index2][arr[index].length - index2 - 1];
      }
    }
  }
  console.log(rest + " " + sum);

  return rest - sum;
}
