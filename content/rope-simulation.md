---
title: Rope physics with p5.js
description: Creating a working rope physics simulation with p5.js
category: physics,simulation,p5.js
createdAt: Sunday, July 17 2022, 10:00 AM
---


# Wow this sounds complicated
The general idea of this simulation is to use constraints thorugh Verlet integration to achieve rope physics. There are a few initial constants that I want to include:

- Gravity: The gravity in the simulation
- Tension: How much the segments of rope are allowed to change in length
- Friction: I need air friction to prevent chaotic movement
- Iteration count: How many times should I apply the physics to each rope segment each frame? (Note: This does not include gravity). More times will make the simulation both look faster and be more stable. Increasing this requries a decrease in gravity to look similar.

# Starting out - Creating point and vector classes


## Vectors
To start out I need to have a way to add, subtract, normalize and divide vectors. 

<Callout>A vector is an object with an x and y component, it can represent a point, or a speed in two dimensions, or even a direction</Callout>

**Operations on vectors:**
- **Add**: Add two vectos together, this is as simple as adding the x and y components, e.g. `(3, 5)` + `(1, 2)` would be equal to `(3 + 1, 5 + 2)` = `(4, 7)`.
- **Subtract**: This is just subtracting each component of a vector `(a, b) + (e, f) = (a - e, b - f)`
- **Multiplication**: You're not in kindergarten, you understand how this works now
- **Division**: etc etc etc
- **Normalization**: This means making the **magnitude** of a vector 1, the magnitude of a vector is calculated like this: `|(x, y)| = sqrt(x^2 + y^2)`.
  - To make this 1 we do the following: `(x, y) = (x / magnitude, y / magnitude)` (where magnitude is calculated as above)

To achieve all of this I created the following [JavaScript class object](https://devdocs.io/javascript/classes):

<details>
  <summary>See code</summary>
  
  
```js
class Vector {
  constructor(x, y){
    Object.assign(this, {x, y});
  }
  // Clone this vector
  clone(){
    return new Vector(this.x, this.y);
  }
  // Distance to another vector
  distance(vector){
    vector = this._v(vector);
    return Math.sqrt((vector.x - this.x)**2 + (vector.y - this.y) **2);
  }
  // Add
  add(vector){
    vector = this._v(vector);
    const a = this.clone();
    a.x += vector.x;
    a.y += vector.y;
    return a;
  }
  // Subtract
  subtract(vector){
    vector = this._v(vector);
    const a = this.clone();
    a.x -= vector.x;
    a.y -= vector.y;
    return a;
  }
  // Multiply
  multiply(vector){
    vector = this._v(vector);
    const a = this.clone();
    a.x *= vector.x;
    a.y *= vector.y;
    return a;
  }
  // Divide by another vector
  divide(vector){
    vector = this._v(vector);
    const a = this.clone();
    a.x /= vector.x;
    a.y /= vector.y;
    return a;
  }
  // Make the magnitude 1
  normalize(){
    return new Vector(this.x / this.length, this.y / this.length);
  }
  // Magnitude of the vector (pythagorean theorum)
  get length(){
    return Math.sqrt(this.x**2 + this.y**2);
  }
  /*
  This method creates a vector based on something non-vector, so you could do this:
  let a = new Vector(0, 1);
  a.add(2);// Add 2 to both the x and y components
  a.divide(2); // Divide by 2
  */
  _v(vector){
    if (!(vector instanceof Vector)){
      if (typeof vector === "number"){
        return new Vector(vector, vector);
      }
      console.log(vector)
      throw new Error("Vector must be number or vector");
    } else if (vector.x && vector.y){
      return new Vector(vector.x, vector.y);
    }else {
      return vector;
    }
  }
}
```

  
</details>


Now I could do things like this!
```js
let a = new Vector(3, 5);
let b = new Vector(9, 10);

let average = a.add(b).divide(2);
```

## Points
Now that I had vectors out of the way I needed to create points, these will have a few properties:
- **Dragging:** Whether the user is dragging the current point, if so, then during the update loop we'll set its position to the mouse position
- **Position:** A vector representing its current position on the screen (x, y)
- **Previous position:** The previous position of the current vector (can be used to infer velocity and direction)
- **Locked:** Should this point get physics or not? If it's locked it won't be influenced by gravity or physics and instead serve as a point for other points to attach to.

I also wanted a few methods:
- **connect(point)**: This method should connect the current point to another point. This will add a `Connection` object to both this point and the point connected to. When rendered this will simply appear as a line.
- **addBetween(number, point)**: Add a certain number of points between the current point and another point. Useful for creating lines of points.
- **applyFriction(multiplier)**: This method will alter the previous position of the point to change its velocity by a multiplier. 

<details>
  <summary>See code</summary>
  
  ```js
  class Point {
    constructor({position, prevPosition, locked = false}){
      if (!prevPosition){prevPosition = position.clone()}
      Object.assign(this, {
        position, 
        prevPosition, 
        locked,
        dragging: false,
        connections: [],
      });
    }
    connect(point){
      this.connections = [...this.connections, new Connection(this, point)];
      connections = [...connections, ...this.connections.slice(-1)]
    }
    addBetween(p2, {count, ...opts}){
      let newpoints = [];
      let weight = 0;
      let inc = 1 / (count + 1);
      for (let i = 0; i < count; i++){
        weight += inc;
        let p = new Point({
          position: new Vector(mix(this.position.x, p2.position.x, weight), mix(this.position.y, p2.position.y, weight)),
          prevPosition: new Vector(mix(this.prevPosition.x, p2.prevPosition.x, weight), mix(this.prevPosition.y, p2.prevPosition.y, weight)),
          ...opts,
        })
        newpoints.push(p)
      }
      return newpoints;
    }
    get x(){return this.position.x}
    get y(){return this.position.y}
    get index(){return points.indexOf(this) < 0 ? null : points.indexOf(this)}
    applyFriction(friction){
      this.prevPosition = new Vector(
        mix(this.position.x, this.prevPosition.x, friction),
        mix(this.position.y, this.prevPosition.y, friction),
      )
    }
    draw(){
      if (this.dragging){
        strokeWeight(DRAG_DISTANCE);
        stroke("#fff2");
        point(this.x, this.y);
      }
      strokeWeight(POINT_SIZE);
      if (this.locked){
        stroke("#f55");
      } else {
        stroke("#fff");
      }
      point(this.x, this.y);
    }
  }
  ```
  
</details>


## Connections
This wasn't fancy, a `Connection` object should just have a draw method and be linked to two `Point` objects.
The only important part here was that the connection have a **set length** that ideally doesn't change over time. This means that while simulating we can **push points away until they match the length of the connection between each other.** This is simple inverse kinematics (if you're a math nerd look that up, lots of really cool uses + examples).

<details>
  <summary>See code</summary>
  
  ```js
  class Connection {
    // p1 and p2 should be instanceof Point
    constructor(p1, p2){
      Object.assign(this, {
        p1,
        p2,
        //Give is how stretchy it is (0-1).
        give: GIVE,
        // If give is 0 it acts like a steel bar.
        length: Math.sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2),
      })
    }
    draw(){
      strokeWeight(LINE_WEIGHT);
      stroke("#999");
      line(this.p1.x, this.p1.y, this.p2.x, this.p2.y)
    }
  }
  ```
</details>

# PHYSICS!!!
Now for the fun part! Creating physics! First I created some basic boilerplate to set up the canvas, allow dragging of points, show connections between them, render the points, etc (see full code at the end), but now I wanted to create the actual physics.

## Steps
1. For each point:
  a. Apply gravity, change the point's position by its velocity, bounce off the walls of the simulation, don't apply this to `locked` points.
  b. Apply physics to point
  c. Done

Now we'll look at the important part, "Apply physics to point". For this I wanted to run through the points, then for each point after altering it's position with gravity and velocity change its position **by moving it so that the distance between it and the previous point was equal to the length assigned to the connection between said points**.

The psuedo code for this is as follows:
```
// The more iterations the less jittery the simulation will be. I find a good iteration count is 3. 
// **Note that because gravity is not applied here they won't fall or move in a direction faster.**
for each iteration {
  for each connection between points {
    // Center of the connection, calculated by p1 and p2 positions
    center = average of p1 and p2 positions
    direction = normalize(p1 - p2) // Calculate the direction by subtracting the points to get the direction between them then normalize the vector
    magnitude = connection.length // Remember that **this is set and will never changed. It is calculated on connection initialization**
    if p1 isn't locked:
      // Center is halfway between the points
      // Direction is the direction between p1 and p2
      // Connection.length never changes and represents how far away the points should be.
      // By scaling direction by half of the length
      //    of the connection, we end up with a position
      //    that represents the ideal end of the connection where p1 should be
      // Distance from center and either point is half of the magnitude. So simply adding half of the magnitude will result in a point that's at the end of the connection.
      p1 position = center + (direction * (connection.length / 2))
    if p2 isn't locked:
      // Here we're moving the starting point to the ideal start position of the connection
      p2 position = center - (direction * (connection.length / 2))
  }
}
```

The real code for this is as follows:
```js
for (let i = 0; i < ITERATION_COUNT; i++){
  for (let connection of connections){
    //Find the center
    let center = connection.p1.position.add(connection.p2.position).divide(2);
    // Make it's magnitude 1
    let dir = connection.p1.position.subtract(connection.p2.position).normalize();
    if (!connection.p1.locked){
      let newpos = center.add(dir.multiply(connection.length / 2));
      connection.p1.position = connection.p1.position.multiply(connection.give).add(newpos.multiply(1 - connection.give));
    }
    if (!connection.p2.locked){
      let newpos = center.subtract(dir.multiply(connection.length / 2));
      connection.p2.position = connection.p2.position.multiply(connection.give).add(newpos.multiply(1 - connection.give));
    }
  }
}
```

You can view the full code [here](https://editor.p5js.org/Intervill/sketches/dIiuAbIsQ), or play with it below:

<CodeEditor class="standout h-96" lang="js" code="fetch('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js').then(r => r.text()).then(eval)__BREAK____BREAK__const GRAVITY = 1;__BREAK__const STEP = 0.5;__BREAK__const DOWN = 1;__BREAK__const POINT_SIZE = 10;__BREAK__const LINE_WEIGHT = 3;__BREAK__// Maximum distance to drag a point from __BREAK__const DRAG_DISTANCE = POINT_SIZE * 2;__BREAK__//Friction to apply after bouncing__BREAK__const BOUNCE_FRICTION = .5;__BREAK__// Between 0 and 1, 1 == Steel rods, 0 == no connections__BREAK__const GIVE = 0;__BREAK__// Multiply each point's velocity by this every frame.__BREAK__const AIR_FRICTION = .95;__BREAK__//Iterations to apply physics to points, more == less bounce and a stabler animation__BREAK__const ITERATION_COUNT = 3;__BREAK__class Vector {__BREAK__  constructor(x, y){__BREAK__    Object.assign(this, {x, y});__BREAK__  }__BREAK__  clone(){__BREAK__    return new Vector(this.x, this.y);__BREAK__  }__BREAK__  distance(vector){__BREAK__    vector = this._v(vector);__BREAK__    return Math.sqrt((vector.x - this.x)**2 + (vector.y - this.y) **2);__BREAK__  }__BREAK__  add(vector){__BREAK__    vector = this._v(vector);__BREAK__    const a = this.clone();__BREAK__    a.x += vector.x;__BREAK__    a.y += vector.y;__BREAK__    return a;__BREAK__  }__BREAK__  subtract(vector){__BREAK__    vector = this._v(vector);__BREAK__    const a = this.clone();__BREAK__    a.x -= vector.x;__BREAK__    a.y -= vector.y;__BREAK__    return a;__BREAK__  }__BREAK__  multiply(vector){__BREAK__    vector = this._v(vector);__BREAK__    const a = this.clone();__BREAK__    a.x *= vector.x;__BREAK__    a.y *= vector.y;__BREAK__    return a;__BREAK__  }__BREAK__  divide(vector){__BREAK__    vector = this._v(vector);__BREAK__    const a = this.clone();__BREAK__    a.x /= vector.x;__BREAK__    a.y /= vector.y;__BREAK__    return a;__BREAK__  }__BREAK__  normalize(){__BREAK__    return new Vector(this.x / this.length, this.y / this.length);__BREAK__  }__BREAK__  get length(){__BREAK__    return Math.sqrt(this.x**2 + this.y**2);__BREAK__  }__BREAK__  _v(vector){__BREAK__    if (!(vector instanceof Vector)){__BREAK__      if (typeof vector === 'number'){__BREAK__        return new Vector(vector, vector);__BREAK__      }__BREAK__      console.log(vector)__BREAK__      throw new Error('Vector must be number or vector');__BREAK__    } else if (vector.x && vector.y){__BREAK__      return new Vector(vector.x, vector.y);__BREAK__    }else {__BREAK__      return vector;__BREAK__    }__BREAK__  }__BREAK__}__BREAK____BREAK__class Point {__BREAK__  constructor({position, prevPosition, locked = false}){__BREAK__    if (!prevPosition){prevPosition = position.clone()}__BREAK__    Object.assign(this, {__BREAK__      position, __BREAK__      prevPosition, __BREAK__      locked,__BREAK__      dragging: false,__BREAK__      connections: [],__BREAK__    });__BREAK__  }__BREAK__  connect(point){__BREAK__    this.connections = [...this.connections, new Connection(this, point)];__BREAK__    connections = [...connections, ...this.connections.slice(-1)]__BREAK__  }__BREAK__  addBetween(p2, {count, ...opts}){__BREAK__    let newpoints = [];__BREAK__    let weight = 0;__BREAK__    let inc = 1 / (count + 1);__BREAK__    for (let i = 0; i < count; i++){__BREAK__      weight += inc;__BREAK__      let p = new Point({__BREAK__        position: new Vector(mix(this.position.x, p2.position.x, weight), mix(this.position.y, p2.position.y, weight)),__BREAK__        prevPosition: new Vector(mix(this.prevPosition.x, p2.prevPosition.x, weight), mix(this.prevPosition.y, p2.prevPosition.y, weight)),__BREAK__        ...opts,__BREAK__      })__BREAK__      newpoints.push(p)__BREAK__    }__BREAK__    return newpoints;__BREAK__  }__BREAK__  get x(){return this.position.x}__BREAK__  get y(){return this.position.y}__BREAK__  get index(){return points.indexOf(this) < 0 ? null : points.indexOf(this)}__BREAK__  applyFriction(friction){__BREAK__    this.prevPosition = new Vector(__BREAK__      mix(this.position.x, this.prevPosition.x, friction),__BREAK__      mix(this.position.y, this.prevPosition.y, friction),__BREAK__    )__BREAK__  }__BREAK__  draw(){__BREAK__    if (this.dragging){__BREAK__      strokeWeight(DRAG_DISTANCE);__BREAK__      stroke('#fff2');__BREAK__      point(this.x, this.y);__BREAK__    }__BREAK__    strokeWeight(POINT_SIZE);__BREAK__    if (this.locked){__BREAK__      stroke('#f55');__BREAK__    } else {__BREAK__      stroke('#fff');__BREAK__    }__BREAK__    point(this.x, this.y);__BREAK__  }__BREAK__}__BREAK____BREAK__class Connection {__BREAK__  // p1 and p2 should be instanceof Point__BREAK__  constructor(p1, p2){__BREAK__    Object.assign(this, {__BREAK__      p1,__BREAK__      p2,__BREAK__      //Give is how stretchy it is (0-1).__BREAK__      give: GIVE,__BREAK__      // If give is 0 it acts like a steel bar.__BREAK__      length: Math.sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2),__BREAK__    })__BREAK__  }__BREAK__  draw(){__BREAK__    strokeWeight(LINE_WEIGHT);__BREAK__    stroke('#999');__BREAK__    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y)__BREAK__  }__BREAK__}__BREAK____BREAK__let points = [];__BREAK__let connections = [];__BREAK____BREAK__function setup(){__BREAK__  createCanvas(400, 400);__BREAK__  pixelDensity(1);__BREAK__  points = [__BREAK__    new Point({__BREAK__      locked: true,__BREAK__      position: new Vector(0, height / 2),__BREAK__    }),__BREAK__    new Point({__BREAK__      position: new Vector(width, height / 2),__BREAK__      locked: true,__BREAK__    })__BREAK__  ]__BREAK__  points.splice(__BREAK__    1,__BREAK__    0,__BREAK__    ...points[0].addBetween(points[1], {__BREAK__      count: 10,__BREAK__      locked: false,__BREAK__    })__BREAK__  )__BREAK__  for (let i = 0; i < points.length - 1; i++){__BREAK__    points[i].connect(points[i+1]);__BREAK__  }__BREAK__  let a = new Point({__BREAK__    locked: true,__BREAK__    position: new Vector(width / 2, 50),__BREAK__  });__BREAK__  points.push(a)__BREAK__  let len = points.length;__BREAK__  points.splice(points.length - 1, 0, ...points[5].addBetween(a, {__BREAK__    count: 3,__BREAK__  }))__BREAK__  for (let i = len - 1; i < points.length - 1; i++){__BREAK__    points[i].connect(points[i+1])__BREAK__  }__BREAK__  points[len - 1].connect(points[5])__BREAK__}__BREAK____BREAK__function draw(){__BREAK__  simulate()__BREAK__  background('#335')__BREAK__  strokeWeight(0)__BREAK__  let t = 'Click to add points, drag points on top of one another to join';__BREAK__  fill('white')__BREAK__  textAlign('center')__BREAK__  text(t, width / 2, height - 20)__BREAK__  connections.forEach(c => c.draw())__BREAK__  points.forEach(p => p.draw())__BREAK__}__BREAK____BREAK__function simulate(){__BREAK__  for (let point of points){__BREAK__    if (point.dragging){__BREAK__      point.prevPosition.x = mouseX;__BREAK__      point.prevPosition.y = mouseY;__BREAK__      point.position.x = mouseX;__BREAK__      point.position.y = mouseY;__BREAK__    }__BREAK__    if (!point.locked){__BREAK__      point.applyFriction(AIR_FRICTION);__BREAK__      let before = point.position.clone();__BREAK__      // Continue moving as before__BREAK__      const vel = point.position.subtract(point.prevPosition);__BREAK__      __BREAK__      point.position = point.position.add(vel);__BREAK__      // Gravity__BREAK__      point.position = point.position.add(new Vector(0, getGravity()));__BREAK__      // Reassign prevPos__BREAK__      point.prevPosition = before;__BREAK__      __BREAK__      // Bouncing:__BREAK__      const vx = vel.x;__BREAK__      const vy = vel.y;__BREAK__      if (point.position.x > width){__BREAK__        point.position.x = width;__BREAK__        point.prevPosition.x = point.position.x + vx;__BREAK__        point.applyFriction(BOUNCE_FRICTION)__BREAK__      }__BREAK__      if (point.position.x < 0){__BREAK__        point.position.x = 0;__BREAK__        point.prevPosition.x = point.position.x + vx;__BREAK__        point.applyFriction(BOUNCE_FRICTION)__BREAK__      }__BREAK__      if (point.position.y > height){__BREAK__        point.position.y = height;__BREAK__        point.prevPosition.y = point.position.y + vy;__BREAK__        point.applyFriction(BOUNCE_FRICTION)__BREAK__      }__BREAK__      if (point.position.y < 0){__BREAK__        point.position.y = 0;__BREAK__        point.prevPosition.y = point.position.y + vy;__BREAK__        point.applyFriction(BOUNCE_FRICTION)__BREAK__      }__BREAK__    }__BREAK__  }__BREAK__  for (let i = 0; i < ITERATION_COUNT; i++){__BREAK__    for (let connection of connections){__BREAK__      //Find the center__BREAK__      let center = connection.p1.position.add(connection.p2.position).divide(2);__BREAK__      // Make it's magnitude 1__BREAK__      let dir = connection.p1.position.subtract(connection.p2.position).normalize();__BREAK__      if (!connection.p1.locked){__BREAK__        let newpos = center.add(dir.multiply(connection.length / 2));__BREAK__        connection.p1.position = connection.p1.position.multiply(connection.give).add(newpos.multiply(1 - connection.give));__BREAK__      }__BREAK__      if (!connection.p2.locked){__BREAK__        let newpos = center.subtract(dir.multiply(connection.length / 2));__BREAK__        connection.p2.position = connection.p2.position.multiply(connection.give).add(newpos.multiply(1 - connection.give));__BREAK__      }__BREAK__    }__BREAK__  }__BREAK__}__BREAK____BREAK__function mouseReleased(){__BREAK__  if (points.find(i => i.dragging)){__BREAK__    let dragging = points.find(i => i.dragging)__BREAK__    let closest = points.filter(i => i !== dragging).sort((a, b) => a.position.distance(dragging.position) - b.position.distance(dragging.position))[0];__BREAK__    if (closest.position.distance(dragging.position) < 3){__BREAK__      dragging.connect(closest)__BREAK__    }__BREAK__  }__BREAK__  points.forEach(i => {__BREAK__    if (i.dragging){__BREAK__      i.dragging = false;__BREAK__    }__BREAK__  })__BREAK__}__BREAK____BREAK__function mousePressed(){__BREAK__  points.forEach(i => {__BREAK__    if (i.dragging){__BREAK__      i.dragging = false;__BREAK__    }__BREAK__  })__BREAK__  __BREAK__  let closest = points.sort((a, b) => a.position.distance(new Vector(mouseX, mouseY)) - b.position.distance(new Vector(mouseX, mouseY)))[0];__BREAK__  if (closest.position.distance(new Vector(mouseX, mouseY)) >= DRAG_DISTANCE){__BREAK__    let b = new Point({position: new Vector(mouseX, mouseY)});__BREAK__    points.push(b)__BREAK__    closest.connect(b);__BREAK__  }__BREAK__  closest.dragging = true;__BREAK__  return false;__BREAK__}__BREAK____BREAK__function getGravity(){__BREAK__  return GRAVITY * STEP * STEP * DOWN;__BREAK__}__BREAK____BREAK__function mix(num1, num2, amt){__BREAK__  return num2 * amt + num1 * (1 - amt);__BREAK__}">
</CodeEditor>

Until next time!

--Explosion--
