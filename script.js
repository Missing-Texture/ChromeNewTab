var imgWidth
var imgHeigh
var canvas = document.getElementById('wttr')
var context = canvas.getContext('2d')

drawWttrImage()

function drawWttrImage() {
    img = new Image()
    img.crossOrigin = '';
    img.src = 'https://v2.wttr.in/.png'
    img.onload = function() {
        // safe image size globally
        imgWidth = img.width
        imgHeight = img.height

        // resize canvas
        context.canvas.width = imgWidth
        context.canvas.height = imgHeight

        context.drawImage(img, 0, 0, imgWidth, imgHeight)

        removeCanvasBackground()
    }
}

function removeCanvasBackground() {
    var imageDataAll = context.getImageData( 0, 0, imgWidth, imgHeight)
    var imageData = imageDataAll.data

    for (var i = 0; i < imageData.length; i+= 4) {
        // check if pixel color is black (0,0,0) in rgb
        if(imageData[i] === 0 && imageData[i+1] === 0 && imageData[i+2] === 0){
            // set Alpha to 0
            imageData[i+3] = 0;
        }
    }

    context.putImageData(imageDataAll, 0, 0)
}