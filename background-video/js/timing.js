/*******************************************************************
*  
*  TIMING
*  
*  node1: 20s
*  node2: 30s
*  node3: 50s
*  
*******************************************************************/
var Timing = {
    pop: Popcorn('#video'),
    popVideo: $('#video'),
    init: function() {
        this.pop.play();
        this.node1();
        this.node2();
        this.node3();
    },
    node1: function() {
        this.pop.code({
            start: 2,
            end: 21,
            onStart: function(options) {
                // pause the video
                Timing.pop.pause();

                // show the interactive link
                Timing.dispatch('showLinkToNode1');
            },
            onEnd: function(options) {
                Timing.pop.play();
            }
        });
    },
    node2: function() {
        this.pop.code({
            start: 4,
            end: 31,
            onStart: function(options) {
                // pause the video
                Timing.pop.pause();

                // show the interactive link
                Timing.dispatch('showLinkToNode2');
            },
            onEnd: function(options) {
                Timing.pop.play();
            }
        });
    },
    node3: function() {
        this.pop.code({
            start: 6,
            end: 51,
            onStart: function(options) {
                // pause the video
                Timing.pop.pause();

                // show the interactive link
                Timing.dispatch('showLinkToNode3');

            },
            onEnd: function(options) {
                Timing.pop.play();

            }
        });
    },
    dispatch: function(name) {
        var evt = document.createEvent("Event");
        evt.initEvent(name, true, true);
        document.dispatchEvent(evt);
    }
    
}