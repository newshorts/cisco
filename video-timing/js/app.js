/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var App = function() {
    
    var pop;
    
    var timing = [
        {
            name: 'first',
            start: 1,
            end: 3
        },
        {
            name: 'second',
            start: 2,
            end: 3
        }
    ];
    
    this.init = function() {
        // get/set the popcorn environment
        setPop();
        
        play();
        
        addTiming();
        
    }
    
    var addTiming = function() {
        
        console.log(timing);
        
        for(var i = 0; i < timing.length; i++) {
            code(timing[i].start, timing[i].end);
        }
        
    }
    
    var setPop = function() {
        pop = Popcorn('#video');
    }
    
    var play = function() {
        pop.play();
    }
    
    var code = function(start, end) {
        pop.code({
            start: start,
            end: end,
            onStart: function(options) {
                console.log('start');
                console.log(options);
            },
            onEnd: function(options) {
                console.log('end');
                console.log(options);
            }
        });
        
    }
    
};

(function($) {
    $(window).load(function() {
        var app = new App();
        
        app.init();
    });
})(jQuery);