var imgWidth
var imgHeigh
var canvas = document.getElementById('wttr')
var context = canvas.getContext('2d')

var websites = [
    "https://youtube.com", 
    "https://reddit.com/", 
    "https://soundcloud.com/", 
    "https://twitter.com/", 
    "https://stackoverflow.com", 
    "https://github.com/", 
    "https://mail.google.com", 
    "https://google.com/maps", 
    
]

drawWttrImage()
addURLs()

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

function addURLs() {
    var div = document.getElementById("grid")

    websites.forEach((item) => {
        var newDiv = document.createElement("div")
        newDiv.className = "item col-lg-3"
    
        var a = document.createElement("a")
        a.type = "button"
        a.className = "btn btn-custom"
        a.href = item
    
        var img = document.createElement("img")
        img.src = "chrome://favicon/size/22@2.000000x/" + item
    
        a.appendChild(img)
        newDiv.appendChild(a)
        div.appendChild(newDiv)
    })
}