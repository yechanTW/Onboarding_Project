// boolean
let isDone : boolean = false;

// number
let decimal: number = 6;
let hex: number = 0xf00d;       // 16진수
let binary: number = 0b1010;    // 2진수
let octal: number = 0o744;      // 8진수

// string
let color: string = "blue";
color = 'red';

// 템플릿 문자열 
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence1: string = `Hello, my name is ${ fullName }.
I'll be ${ age + 1 } years old next month.`;

let sentence2: string = "Hello, my name is " + fullName + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month.";

// array
let list: number[] = [1, 2, 3];     // let list: Array<number> = [1, 2, 3]

// tuple
// 요소의 타입 , 개수를 고정한 배열을 표현 가능

let x: [string, number];
// 초기화
x = ["hello", 10]; // 성공
// 잘못된 초기화 
x = [10, "hello"]; // 순서가 다름

console.log(x[0].substring(1)); // 성공
console.log(x[1].substring(1)); // 오류, 'number'에는 'substring' 이 없습니다.
x[3] = "world";                 // 오류, '[string, number]' 타입에는 프로퍼티 '3'이 없습니다.
console.log(x[5].toString());   // '[string, number]' 타입에는 프로퍼티 '5'가 없습니다.

// enum
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// 앞에서부터 0부터 시작해서 번호를 매김. 맨 앞을 변경해서 번호를 그 수부터 매기게 하거나 , 그 이상의 값을 수동으로 설정 가능.
enum Color1 {Red = 1, Green, Blue}
let c1: Color1 = Color1.Green;

enum Color2 {Red = 1, Green = 2, Blue = 4}
let c2: Color2 = Color2.Green;

// 매겨진 값을 사용해서 enum의 이름을 알아낼 수 있다.
enum Color3 {Red = 1, Green, Blue}
let colorName: string = Color3[2];

console.log(colorName); // 값이 2인 'Green'이 출력됩니다.

// any
// 알지 못하는 타입을 표현 , 