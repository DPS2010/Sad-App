Webcam.set({
    height: 300,
    width: 350,
    image_format:"jpeg",
    jpeg_quality:90
})
Webcam.attach("#camera")
function capture() {
    Webcam.snap(
        function(img){
            document.getElementById("snapshot").innerHTML = `<img id="capturedimage" src=${img}>`
            
        }
    )
}
console.log("Version of ML5 ="+ml5.version)
var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/4Z_vc18RD/model.json",getModel)
function getModel () {
    console.log("Model Uploaded!!!!!!!!!!!!!!")
}
function speak() {
    API = window.speechSynthesis
    speechData1 = "The first prediction is" + prediction1
    speechData2 = "The second prediction is" + prediction2
 utterthis= new SpeechSynthesisUtterance(speechData1 + speechData2)
 API.speak(utterthis)
}
function identify() {
    image=document.getElementById("capturedimage")
    classifier.classify(image, gotResult)
}
function gotResult(error, result) {
    if (error) {
        console.error(error)
    }else {
        console.log(result)
        prediction1 = result[0].label
        prediction2 = result[1].label
        document.getElementById("emotion1").innerHTML = prediction1
        document.getElementById("emotion2").innerHTML = prediction2
        speak()
        if (prediction1 == "Crying") {
            document.getElementById("emoji1").innerHTML = "&#128546"
        } 
        if (prediction1 == "Angry" ) {
            document.getElementById("emoji1").innerHTML = "&#128545;"

        }
        if (prediction1 == "Sad") {
            document.getElementById("emoji1").innerHTML = "&#128532;"
        }
        if (prediction1 == "Happy") {
            document.getElementById("emoji1").innerHTML = "&#128512;"
        }
        if (prediction2 == "Crying") {
            document.getElementById("emoji2").innerHTML = "&#128546"
        } 
        if (prediction2 == "Angry" ) {
            document.getElementById("emoji2").innerHTML = "&#128545;"

        }
        if (prediction2 == "Sad") {
            document.getElementById("emoji2").innerHTML = "&#128532;"
        }
        if (prediction2 == "Happy") {
            document.getElementById("emoji2").innerHTML = "&#128512;"
        }
    }
}