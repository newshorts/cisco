//////////////////////////////////////////////////
// Ablaze.js
//////////////////////////////////////////////////
var particles;
var lineColor;
var spawnY;
var maxDist = 64;
var numParticles = 128;
var canvas;
var drawer;
var bumpmap;
var colormap;
var ctx;

var menu;
var menuTweenX;

var saveBtn;
var generateBtn;
var fullscreenBtn;
var fbShareBtn;
var twShareBtn;
var speedRangeSlider;
var directionRangeSlider;
var numPointsSlider;
var maxDistSlider;
var bumpmapEffectSlider;

var circleArrangementModeBtn
var lineArrangementModeBtn;
var randomArrangementModeBtn;

var menuLabel;
var newNumParticles;
var newMaxDist;
var bumpmapEffect;
var ringAngle;
var ringRadius = 200;
var centerX;
var centerY;

var positionMethod = 0;
var drawMethod = 0;

var drawCommands;
var drawPoints;

var frameTimer;
var framerate = 1000/72;


function init(){
        availableShapeCount = 0;
        usedShapeCount = 0;

        lineColor = 0xffffff;
        numParticles = 128;
        spawnY = 360;
        maxDist = 80;
        bumpmapEffect = .1;
        positionMethod = 0;
        colormap = $("#colormap");

        //var bmd:BitmapData = new BitmapData(100, 100);
        //bmd.perlinNoise(100, 100, 3, Math.random(), false, true, 1, true);
        //bumpmap = new Bitmap(bmd);
        //addChild(bumpmap);

        setupMenu()
        setupCanvas();
        reset();

        frameTimer = setInterval(oef, framerate)

        $("#drawer").bind("click", onClick);
        $("window").bind("keyup", onKeyUph);
        console.log("init()")
}

function setupCanvas(){
        console.log($(window).width() + "px", $(window).height() + "px");

        var html = "<canvas id='drawer' width='" + $(window).width() + "px' height='" + $(window).height() + "px'></canvas>";
        $("#contentWrapper").append(html);
}

/*function setupMenu(){
        posY += 25
        new Label(menu, 20, posY, "Initial Arrangement")
        posY += 20
        circleArrangementModeBtn = new RadioButton(menu, 20, posY, "Circle", true, setInitialArrangementMode);
        posY += 15
        lineArrangementModeBtn = new RadioButton(menu, 20, posY, "Line", false, setInitialArrangementMode);	
        posY += 15
        randomArrangementModeBtn = new RadioButton(menu, 20, posY, "Random", false, setInitialArrangementMode);

        posY += 40
        generateBtn = new PushButton(menu, 20, posY, "Restart", reset);
        generateBtn.width = 125

        //posY += 25
        //var loadColorMapBtn:PushButton = new PushButton(menu, 20, posY, "Load Color Map", loadColorMap);
        //loadColorMapBtn.width = 125

        posY += 25
        saveBtn = new PushButton(menu, 20, posY, "Save", saveFile);
        saveBtn.width = 125

        posY += 30
        fullscreenBtn = new PushButton(menu, 20, posY, "Toggle Full Screen", toggleFullScreen);
        fullscreenBtn.width = 125

        posY += 30
        fbShareBtn = new PushButton(menu, 20, posY, "Share On Facebook", shareOnFB);
        fbShareBtn.width = 125

        posY += 25
        twShareBtn = new PushButton(menu, 20, posY, "Share On Twitter", shareOnTwitter);
        twShareBtn.width = 125

        menuLabel = new Label(menu, 210, 10, "OPTIONS")
}*/

function setInitialArrangementMode(e){
        if (circleArrangementModeBtn.selected){
                positionMethod = 0;
        } else if (lineArrangementModeBtn.selected){
                positionMethod = 1;
        } else if (randomArrangementModeBtn.selected){
                positionMethod = 2;
        }
}

function showMenu(){
        $("#menu").animate({left: 0}, 400);
        menuShowing = true;
        $("#showOptionsBtn").hide();
        $("#hideOptionsBtn").show();
}

function hideMenu(){
        $("#menu").animate({left: -360}, 400);
        menuShowing = false;
        $("#showOptionsBtn").show();
        $("#hideOptionsBtn").hide();
}

function shareOnFB(e){
        ExternalInterface.call("fb_share");
}

function shareOnTwitter(e){
        ExternalInterface.call("tw_share");
}

function reset(e){
        //bumpmap.bitmapData.perlinNoise(100, 100, 3, Math.random() * 70000, false, true, 1, true);
        ctx = document.getElementById("drawer").getContext("2d");
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(0,0,$("#drawer").width(),$("#drawer").height())


        bumpmap = new SimplexNoise();
        bumpmap.offsetX = 0;
        bumpmap.offsetY = 0;
        bumpmap.scale = 200;

        centerX = $("#drawer").width() >> 1;
        centerY = $("#drawer").height() >> 1;

        lineColor = 0xffffff;


        positionMethod = Number($('input[name=alignmentRadio]:checked', '#alignmentRadio').val())
        drawMethod = Number($('input[name=drawMethodRadio]:checked', '#drawMethodRadio').val())
        numParticles = $( "#particleCountSlider" ).slider( "value" );
        maxDist = $( "#maxDistSlider" ).slider( "value" );
        bumpmapEffect = $( "#bumpmapEffectSlider" ).slider( "value" );
        makeParticles()
        ringRadius = Math.min($("#drawer").width(), $("#drawer").height()) >> 2;

        //canvas.bitmapData = new BitmapData($("#drawer").width(), $("#drawer").height(), false, 0);
}

function onClick(e){
        reset();
        console.log("CLICKED")
}

function onKeyUph(e){
        /*trace("Key up");
        switch (e.keyCode) {
                case Keyboard.S:
                        saveFile();
                case Keyboard.C:
                        loadColorMap(e);
                break;
        }*/
}

/*function toggleFullScreen(e = null){
        if (stage.displayState == StageDisplayState.NORMAL){
                stage.displayState = StageDisplayState.FULL_SCREEN_INTERACTIVE;
        } else {
                stage.displayState = StageDisplayState.NORMAL;
        }
        reset();
}*/

function makeParticles(){
        particles = new Array(numParticles);
        var p;
        var i = -1;	
        var propX;
        var propY;
        var data;
        var col;
        var row;
        var rowWidth;
        while(++i < numParticles){
                p = {};
                particles[i] = p;
                p.angle = getRandomFromRange($( "#directionRangeSlider" ).slider( "values" )[0], $( "#directionRangeSlider" ).slider( "values" )[1]);
                p.speed = getRandomFromRange($( "#speedRangeSlider" ).slider( "values" )[0], $( "#speedRangeSlider" ).slider( "values" )[1]);
                setInitialPosition(p, positionMethod)
                p.distances = new Array(numParticles);
                p.px = p.x;
                p.py = p.y;
                p.color = 0xffffff;//colormap.bitmapData.getPixel(propX * colormap.width, propY * colormap.height);
                if (cmapCtx){
                        propX = p.x / $("#drawer").width();
                        propY = p.y / $("#drawer").height();
                        data = cmapData.data//.getImageData(propX * cmapCtx.width, propY * cmapCtx.height,1, 1)
                        col = (propX * cmapData.width) << 2;
                        row = (propY * cmapData.height) >> 0;
                        rowWidth = cmapData.width << 2
                        p.color = (data[col + (row * rowWidth) + 0] << 16) | (data[col + (row * rowWidth) + 1] << 8) | data[col + (row * rowWidth) + 2];
                        /*console.log(
                                p.x, p.y,
                                propX, propY,
                                cmapData.width, cmapData.height,
                                cmapData.data[0],
                                col, row,
                                data[col + (row * rowWidth) + 0],
                                data[col + (row * rowWidth) + 1],
                                data[col + (row * rowWidth) + 2]
                        )*/
                }
        }
}

function setInitialPosition(f_obj, f_method){
        if (!f_method){
                f_method = 0;
        }

        switch (f_method){
                // circle
                case 0:
                        ringAngle = getRandomFromRange(0, Math.PI * 2)
                        f_obj.x = Math.cos(ringAngle) * ringRadius + centerX;
                        f_obj.y = Math.sin(ringAngle) * ringRadius + centerY;
                        break;

                //Horizontal Line
                case 1:
                        f_obj.x = Math.random() * $("#drawer").width();
                        f_obj.y = $("#drawer").height() >> 1;
                        break;

                //Random
                case 2:
                        f_obj.x = Math.random() * $("#drawer").width();
                        f_obj.y = Math.random() * $("#drawer").height();
                        break;
        }
}

function oef(e){
        //console.log("oef()")
        /*
                            if(stage.mouseX < 200){
                                showMenu();
                        } else{
                                hideMenu();
                        }*/
        particles.forEach(moveParticle);
        particles.forEach(resetDistances);
        particles.forEach(getDistances);
        particles.forEach(drawLines);
}

function checkReset(f_array){
        var done = 0;

        var i = -1;
        var endi = f_array.length;
        var p;
        while (++i < endi){
                p = f_array[i]
                if ((p.x < 0 || p.x > $("#drawer").width()) || (p.y < 0 || p.y > $("#drawer").height())){
                        done++;
                }
        }
        if (done >= f_array.length){
                if (lineColor == 0){
                        lineColor = 0xffffff;
                } else {
                        lineColor = 0;
                }
                makeParticles()
        }
}

function moveParticle(f_obj, f_id, f_array){
        f_obj.px = f_obj.x;
        f_obj.py = f_obj.y;
        if (f_obj.x < 0 || f_obj.x > $("#drawer").width() || f_obj.y < 0 || f_obj.y > $("#drawer").height()){

        } else {
                var propX = f_obj.x / $("#drawer").width();
                var propY = f_obj.y / $("#drawer").height();
                //var colorVal = 0x80; //bumpmap.bitmapData.getPixel(propX * 100, propY * 100);
                //colorVal = (colorVal & 0xff) - 0x80;
                //var angleOffset = bumpmapEffect * (colorVal / 0x80);
                colorVal = bumpmap.noise((bumpmap.offsetX + f_obj.x) / bumpmap.scale, (bumpmap.offsetY + f_obj.y) / bumpmap.scale);
                var angleOffset = bumpmapEffect * colorVal;
                f_obj.angle += angleOffset;
        }
        f_obj.x += Math.cos(f_obj.angle) * f_obj.speed;
        f_obj.y += Math.sin(f_obj.angle) * f_obj.speed;
}

function resetDistances(f_obj, f_id, f_array){
        f_obj.distances = new Array(numParticles);
}

function getDistances(f_obj, f_id, f_array){
        var dx;
        var dy;
        var i = -1;
        while(++i < numParticles){
                if (f_array[i].distances[f_id] == null){
                        dx = f_array[i].x - f_obj.x;
                        dy = f_array[i].y - f_obj.y;
                        f_obj.distances[i] = Math.sqrt((dx * dx) + (dy * dy));
                }
        }
}

function drawLines(f_obj, f_id, f_array){
        var i = -1;
        var dx;
        var dy;
        var p0 = {};
        var radius;
        var r;
        var g;
        var b;
        while(++i < numParticles){
                if (f_obj.distances[i] != null){
                        if (f_obj.distances[i] < maxDist && f_obj.distances[i] > 1){
                                p0.x = f_obj.x + ((f_array[i].x - f_obj.x) * 0.5);
                                p0.y = f_obj.y + ((f_array[i].y - f_obj.y) * 0.5);

                                r = f_obj.color >> 16;
                                g = (f_obj.color >> 8) & 0xff;
                                b = f_obj.color & 0xff;
                                ctx.beginPath();
                                ctx.strokeStyle = "rgba("+ r +","+ g +","+ b +","+ (0.2 - (0.2 * (f_obj.distances[i] / maxDist))) +")";
                                if (drawMethod == 0){
                                        ctx.moveTo(f_obj.x, f_obj.y);
                                        ctx.lineTo(f_array[i].x, f_array[i].y)
                                } else if (drawMethod == 1){
                                        dx = f_obj.x - f_array[i].x;
                                        dy = f_obj.y - f_array[i].y;
                                        radius = Math.sqrt((dx*dx) + (dy*dy));
                                        ctx.moveTo(p0.x + radius, p0.y);
                                        ctx.arc(p0.x,p0.y,radius, 0, Math.PI * 2);
                                }
                                ctx.stroke();
                        }
                }
        }
}
function getRandomFromRange(f_min, f_max){
        return (Math.random() * (f_max - f_min)) + f_min;
}

function saveFile(e){ 
        var reader = new FileReader();
        var now = new Date();
        var filename = "AblazeJS_" +now.fullYear + "-" + now.month + "-" + now.date + "_" + now.hours +"-"+ now.minutes +"-"+ now.seconds + ".png";
        var img = document.getElementById("drawer").toDataURL("image/png");
        window.open(img, "_blank")
} 



var oFReader = new FileReader();
var cmapCtx;
var cmapImg;
var cmapData;
function fileInputs(){
        oFReader = new FileReader();
        oFReader.onload = onFileLoaded;
        var $this = $(this),
        $val = $this.val(),
        valArray = $val.split('\\'),
        newVal = valArray[valArray.length-1]
        if(newVal !== '') {
                loadImageFile();
        }
}

function loadImageFile() {
        console.log("loadImageFile()")
        if (document.getElementById("colormapBtn").files.length === 0) { console.log("loadImageFile() no file") }
        var oFile = document.getElementById("colormapBtn").files[0];
        //if (!rFilter.test(oFile.type)) { alert("You must select a valid image file!"); return; }
        oFReader.readAsDataURL(oFile);
}


    function onFileLoaded(e) {

        console.log("loadImageFile()")
        var imgSrc = e.target.result;
        cmapImg = new Image();
        //cmapImg.onload = postCmapImgLoad;
        cmapImg.src = e.target.result
        setTimeout(postCmapImgLoad, 500)
}

function postCmapImgLoad(){   
        var canvasHtml = "<canvas id='cmap' width='" + 100 + "px' height='" + 100 + "px'></canvas>";
        $("#colormapHolderr").html(canvasHtml);
        cmapCtx = document.getElementById("cmap").getContext("2d");
        cmapCtx.drawImage(cmapImg,0,0, 100, 100);
        cmapData = cmapCtx.getImageData(0,0,100,100)
        reset();
}
