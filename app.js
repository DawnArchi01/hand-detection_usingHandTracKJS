const defaultParams = {
    flipHorizontal: false,
    outputStride: 16,
    imageScaleFactor: 1,
    maxNumBoxes: 20,
    iouThreshold: 0.2,
    scoreThreshold: 0.6,
    modelType: "ssd320fpnlite",
    modelSize: "large",
    bboxLineWidth: "2",
    fontSize: 17,
};

const model = await handTrack.load(defaultParams)


navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

// const model =  await handTrack.load();
const predictions = await model.detect(video) ;


handTrack.startVideo(video)
    .then(status => {
        if (status) {
            navigator.getUserMedia(
                { video: {} },

                stream => {
                    video.srcObject = stream;
                    // setInterval(runDetection , 1000) ;
                    runDetection();
                },
                console.error()
            );
        }
    })

function runDetection() {
    model.detect(video)
        .then(predictions => {
            model.renderPredictions(predictions, canvas, context, video);
            console.log(predictions);

            if (predictions.length > 0)
                audio.play();
            requestAnimationFrame(runDetection);
        })
}

handTrack.load(defaultParams).then(lmodel => {
    model = lmodel;
})