class DABAuthenticator {
  constructor() {
    this.points = Array(17);
    this.poses = [];
    this.intervalCheck = null;
    this.createVideoElement();
  }
  createVideoElement() {
    // Just create the DOM Element
    this.vidEl = document.createElement('video');
    this.vidEl.setAttribute('width', 640);
    this.vidEl.setAttribute('height', 480);
    this.vidEl.setAttribute('autoplay', true);
    this.vidEl.setAttribute('hidden', true);
    document.body.appendChild(this.vidEl);
  }
  login() {
    return new Promise((resolve, reject) => {
      // Allow camera utilisation
      var dabauth = this;
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            dabauth.vidEl.srcObject = stream;
            dabauth.vidEl.play();
            // Start ML5 checking
            var poseNet = ml5.poseNet(dabauth.vidEl, dabauth.modelReady);
            poseNet.on('pose', (poses) => { dabauth.gotPoses(poses, dabauth); });

            resolve(dabauth);
        });
      }
    });
  }
  detect() {
    var dabauth = this;
    return new Promise((resolve, reject) => {
      setInterval(function () {
        if(dabauth.poses.length > 0) {
          if(dabauth.isDabbing()) {
            // Stop camera
            dabauth.vidEl.play();
            dabauth.vidEl.srcObject.getTracks()[0].stop();
            resolve(dabauth);
          }
        }
      }, 100);
    });
  }
  modelReady() {
    // console.log('Model is ready');
  }
  isHeadTiltedRight() {
    return this.points[2].pos.y > this.points[1].pos.y && this.points[1].pos.y > this.points[3].pos.y;
  }
  areHarmsTilted() {
    return this.points[6].pos.y > this.points[10].pos.y && this.points[10].pos.y > this.points[5].pos.y;
  }
  isDabbing() {
    return this.isHeadTiltedRight() && this.areHarmsTilted();
  }
  gotPoses(poses, dabauth) {
    dabauth.poses = poses;
    if(poses.length > 0) {
      poses[0].pose.keypoints.forEach((kp, i) => {
        dabauth.points[i] = {
          pos: kp.position,
          index: i
        }
      });
    }
  }
}
