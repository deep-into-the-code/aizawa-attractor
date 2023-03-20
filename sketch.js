let a = 0.95, b = 0.7, c = 0.65, d = 3.5, e = 0.25, f = 0.1;
let dt = 5e-2; // 0.05;

let node = { x: 0.1, y: 0, z: 0 }
let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  colorMode(HSB);
  this.hue = 0;
}

function draw() {
  background(10);
  rotateX(HALF_PI);
  rotateZ(-frameCount / 100)
  scale(200);

  let dx = (node.z - b) * node.x - d * node.y;
  let dy = d * node.x + (node.z - b) * node.y;
  let dz = c + a * node.z - (Math.pow(node.z, 3)) / 3 - ((Math.pow(node.x, 2) + Math.pow(node.y, 2)) * (1 + e * node.z)) + f * node.z * Math.pow(node.x, 3);

  node.x += dx * dt;
  node.y += dy * dt;
  node.z += dz * dt;

  stroke(255);
  points.push({ x: node.x, y: node.y, z: node.z });

  if (this.hue >= 255)
    this.dir = -0.1;
  if (this.hue <= 0)
    this.dir = 0.1;

  this.hue += this.dir;

  stroke(this.hue, 255, 255, 50);
  fill(this.hue, 255, 255, 50);

  let len = points.length - 1;
  if (len > 5) {
    for (let i = 0; i < 4; i++) {
      strokeWeight(10 - i * 2);
      point(points[len - i].x, points[len - i].y, points[len - i].z)
    }
  }

  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    strokeWeight(2);

    vertex(points[i].x, points[i].y, points[i].z);
  }
  endShape();
}
