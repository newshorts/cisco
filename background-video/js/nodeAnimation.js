var NodeAnimation = function(options) {
    
    // private
    var animationVideo,
        bufferCanvas,
        outputCanvas,
        buffer,
        output,
        interval;

    var processFrame = function() {
        
        buffer.drawImage(animationVideo, 0, 0);

        var image = buffer.getImageData(0,0,960,540),
            imageData = image.data;

        for(var i = 3, len = imageData.length; i < len; i += 4) {

            if(imageData[i + 1] < 100 && imageData[i + 2] < 100 && imageData[i + 3] < 100) {
                imageData[i] = 0;
            } else {
                imageData[i] = 200;   // alpha
                imageData[i+1] = 255; // red
                imageData[i+2] = 255; // green
                imageData[i+3] = 255; // blue
            }

        }

        output.putImageData(image,0,0,0,0,960,540);
        
    };
    
    var initEvents = function() {
        
        animationVideo.addEventListener('play', function() {
            clearInterval(interval);
            interval = setInterval(processFrame, 1000 / 24);
            
            outputCanvas.style.opacity = 1;
        }, false);

        animationVideo.addEventListener('ended', function() {
            // allow for interactive content to pop up here
            
            
        });
    }
    
    // public
    this.init = function() {

        animationVideo = document.getElementById(options.nodeAnimationID);
        bufferCanvas = document.getElementById('buffer');
        outputCanvas = document.getElementById('output');
        buffer = bufferCanvas.getContext('2d');
        output = outputCanvas.getContext('2d');

        initEvents();
    }
    
    this.play = function() {
        animationVideo.play();
    }
    
    this.resetOutput = function() {
        bufferCanvas.width = bufferCanvas.width;
        outputCanvas.width = outputCanvas.width;
        output.clearRect(0,0,960,540);
        buffer.clearRect(0,0,960,540);
    }

}