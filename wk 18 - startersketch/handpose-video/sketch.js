let video;
let handPose;
let hands = [];
let indexPreviousX;
let indexPreviousY;
let drawing = [];
let dots = [];

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  console.log(hands);
}

function goHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  handPose.detectStart(video, goHands);
}

function draw() {
  image(video, 0, 0);

  if (hands.length > 0) {

    let thumb = hands[0].thumb_tip;
    let index = hands[0].index_finger_tip;

    let d = dist(thumb.x, thumb.y, index.x, index.y);
    console.log(d);

    if (d < 20) {
      stroke(255, 140, 15);
      strokeWeight(8);

      // for (dots == 100)

      line(index.x, index.y, indexPreviousX, indexPreviousY);

      let previousObj = {};
      previousObj["x"] = index.x;
      previousObj["y"] = index.y;
      drawing.push(previousObj);

      for (let i = 0; i < drawing.length - 1; i++) {
      line(drawing[i].x, drawing[i].y, drawing[i + 1].x, drawing[i + 1].y);
    }

    indexPreviousX = index.x;
    indexPreviousY = index.y;

      // let middle = hands[0].middle_finger_tip;
      // circle(middle.x, middle.y, 16);

      // let ring = hands[0].ring_finger_tip;
      // circle(ring.x, ring.y, 16);

      // let pinky = hands[0].pinky_finger_tip;
      // circle(pinky.x, pinky.y, 16);

      //   for (let i = 0;  i < hands[0].keypoints.length; i++) {
      //       let keypoint = hands[0].keypoints[i];
      //       fill(122, 147, 172);
      //       if (hands[0].handedness == "Left") {
      //         fill(255, 140, 15);
      //       }
      //       noStroke();
      //       circle(keypoint.x, keypoint.y, 16);

      //       console.log(hands[0].handedness);
      //   }
      // }
    }

  }

}
