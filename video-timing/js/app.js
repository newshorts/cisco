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
        },
        {
            name: 'third',
            start: 3,
            end: 5
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
            code(timing[i].start, timing[i].end, timing[i].name);
        }
        
    }
    
    var setPop = function() {
        pop = Popcorn('#video');
    }
    
    var play = function() {
        pop.play();
    }
    
    var pause = function() {
        pop.pause();
    }
    
    var code = function(start, end, name) {
        
        name = name || 'empty';
        
        
        if(name == 'second') {
            pop.code({
                start: start,
                end: end,
                onStart: function(options) {
                    pause();
                    console.log(options);
                },
                onEnd: function(options) {
                    play();
                    console.log(options);
                }
            });
        } else {
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
            
        
    }
    
};

(function($) {
    $(window).load(function() {
        var app = new App();
        
        app.init();
    });
})(jQuery);