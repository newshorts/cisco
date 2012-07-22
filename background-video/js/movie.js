var Movie = function() {
    this.movie;
    
    this.minimize = function() {
        this.movie.removeClass().addClass('minimize');
    }
    
    this.maximize = function() {
        this.movie.removeClass().addClass('maximize');
    }
    
    this.init = function() {
        this.movie = $('#beeVideo');
    }
    
};