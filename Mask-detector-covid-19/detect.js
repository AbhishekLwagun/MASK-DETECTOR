  let classifier;
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/Am5cDeTZ3/';

  let video;
  let flippedVideo;
  let label = "";



  function preload() {
      classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
      createCanvas(500, 300);
      video = createCapture(VIDEO);
      video.size(500, 300);
      video.hide();

      flippedVideo = ml5.flipImage(video);
      classifyVideo();
  }

  function draw() {
      background(0);
      image(flippedVideo, 0, 0);

      fill(255);
      textSize(16);
      textAlign(CENTER);
      text(label, width / 2, height - 4);
  }

  function classifyVideo() {
      flippedVideo = ml5.flipImage(video)
      classifier.classify(flippedVideo, gotResult);
      flippedVideo.remove();

  }


  function gotResult(error, results) {

      if (error) {
          console.error(error);
          return;
      }

      label = results[0].label;

      if (label === 'WithMask') {
          console.log('sucess');
          document.getElementById('inform').innerHTML = 'You are safe. Thanks for wearing marks.   ';
          document.getElementById('inform').style.background = "green";


      } else {
          console.log('fail');
          document.getElementById('inform').innerHTML = 'You are not safe. Alert , you are not allowed to go in public place without marks. Please wear mask.';
          document.getElementById('inform').style.background = "red";

      }
      // label = results[1].label;
      classifyVideo();
  }