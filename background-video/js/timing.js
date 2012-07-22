/*******************************************************************
*  
*  TIMING
*  
*  node1: 20s
*  node2: 30s
*  node3: 50s
*  
*******************************************************************/

var Timing = function() {
    
    var pop,
        popVideo,
        timingOptions;
        
    var node1 = function() {
        pop.code({
            start: timingOptions.node1,
            end: timingOptions.node1 + 2,
            onStart: function(options) {
                // pause the video
                pop.pause();

                // show the interactive link
                dispatch('showLinkToNode1');
            },
            onEnd: function(options) {
                pop.play();
            }
        });
    }
    
    var node2 = function() {
        pop.code({
            start: timingOptions.node2,
            end: timingOptions.node2 + 2,
            onStart: function(options) {
                // pause the video
                pop.pause();

                // show the interactive link
                dispatch('showLinkToNode2');
            },
            onEnd: function(options) {
                pop.play();
            }
        });
    }
    
    var node3 = function() {
        pop.code({
            start: timingOptions.node3,
            end: timingOptions.node3 + 2,
            onStart: function(options) {
                // pause the video
                pop.pause();

                // show the interactive link
                dispatch('showLinkToNode3');

            },
            onEnd: function(options) {
                pop.play();

            }
        });
    }
    
    var dispatch = function(name) {
        var evt = document.createEvent("Event");
        evt.initEvent(name, true, true);
        document.dispatchEvent(evt);
    }
    
    this.init = function(options) {
        timingOptions = options;
        
        // setup
        pop = Popcorn('#beeVideo');
        popVideo = $('#beeVideo');
        
        // play and listen
        node1();
        node2();
        node3();
    }
    
    this.playMain = function() {
        pop.play();
    }
};