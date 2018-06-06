"use strict"
const svgContainer = document.getElementById("svg-container");
const svgCanvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgCanvas.setAttribute("height", "80%");
svgCanvas.setAttribute("width", "100%");
svgCanvas.setAttribute("style", "background-color: rgba(0, 0, 0, 0.3)");
svgContainer.appendChild(svgCanvas);
let trianglesArray = [];


class Triangles {

  constructor(apxCord = {
    x1: 0,
    y1: 0,
    x2: 50,
    y2: 0,
    x3: 25,
    y3: 43
  }) {
    this.triangleElem;
    this.apxCord = apxCord;
  }

  drawTriangle(fill = "rgb(25, 25, 24)") {

    this.triangleElem = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    this.triangleElem.setAttribute("points", `${this.apxCord.x1},${this.apxCord.y1} ${this.apxCord.x2},${this.apxCord.y2} ${this.apxCord.x3},${this.apxCord.y3}`);
    this.triangleElem.setAttribute("fill", fill);
    svgCanvas.appendChild(this.triangleElem);
  }

}

let belowViewport;
let svgWidth = svgCanvas.clientWidth;
// let a = 1;
let upsideDown = false;
let shifted = true;
let triangleField = new Triangles();
triangleField.drawTriangle();
trianglesArray.push(triangleField.triangleElem);
while (!belowViewport) {

  const lastIndex = trianglesArray.lastIndexOf(triangleField.triangleElem);
  belowViewport = elementBelowViewport(trianglesArray[lastIndex]);

  if (!upsideDown) {
    triangleField.apxCord.x1 += 50;
    triangleField.apxCord.y1 += 0;
    triangleField.apxCord.x2 += 25;
    triangleField.apxCord.y2 += 43;
    triangleField.apxCord.x3 += 0;
    triangleField.apxCord.y3 += 0;
    triangleField.drawTriangle();
    trianglesArray.push(triangleField.triangleElem);
    upsideDown = true;
  } else {
    triangleField.apxCord.x1 += 0;
    triangleField.apxCord.y1 += 0;
    triangleField.apxCord.x2 += 25;
    triangleField.apxCord.y2 += -43;
    triangleField.apxCord.x3 += 50;
    triangleField.apxCord.y3 += 0;
    triangleField.drawTriangle();
    trianglesArray.push(triangleField.triangleElem);
    // trianglesArray[lastIndex].setAttribute("fill", "blue"); //do usuniecia
    upsideDown = false;
    if (triangleField.apxCord.x1 > svgWidth && shifted) {
      triangleField.apxCord.x1 = -25;
      triangleField.apxCord.y1 += 43;
      triangleField.apxCord.x2 = 25;
      triangleField.apxCord.y2 += 43;
      triangleField.apxCord.x3 = 0;
      triangleField.apxCord.y3 += 43;
      triangleField.drawTriangle();
      trianglesArray.push(triangleField.triangleElem);
      shifted = false;
    } else if (triangleField.apxCord.x1 > svgWidth) {
      triangleField.apxCord.x1 = 0;
      triangleField.apxCord.y1 += 43;
      triangleField.apxCord.x2 = 50;
      triangleField.apxCord.y2 += 43;
      triangleField.apxCord.x3 = 25;
      triangleField.apxCord.y3 += 43;
      triangleField.drawTriangle();
      trianglesArray.push(triangleField.triangleElem);
      shifted = true;
    };
  };

  console.log(belowViewport); // do usuniecia
  //  a++;
  //   break;
}


let random;

// let shuffledArray = shuffle(trianglesArray);

let limit;
$(window).width() > 739 ? limit = 6 : limit = 3;

let flyAnim = setInterval(function () {
  if (trianglesArray.length === 0) {
    clearInterval(flyAnim);
  };
  console.log(+new Date()); // do usuniecia


  for (let i = 0; i <= limit; i++) {
    random = Math.floor(Math.random() * trianglesArray.length);
    if (trianglesArray.length > 0) {
      trianglesArray[random].classList.add("animate");
      trianglesArray.splice(random, 1);
    }

  };
}, 10);




// function myFunction() {
//   random = Math.floor(Math.random() * trianglesArray.length);
//   if (trianglesArray.length > 0) {
//     trianglesArray[random].classList.add("animate");
//     trianglesArray.splice(random, 1);
//   }
// };

function shuffle(array) { // Fisher-Yates shuffling
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}




// trianglesArray[trianglesArray.lastIndexOf(triangleField.triangleElem)].setAttribute("style", "fill: red");



function elementBelowViewport(element) {
  let rect = element.getBoundingClientRect();
  let html = document.documentElement;
  return (
    rect.top >= (svgCanvas.clientHeight)
  );
}