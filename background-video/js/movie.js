var Movie = {
    movie: $('#video'),
    minimize: function() {
        this.movie.removeClass().addClass('minimize');
    },
    maximize: function() {
        this.movie.removeClass().addClass('maximize');
    }
};