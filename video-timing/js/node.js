var NNode = {
    nodeContainer: {},
    mainNode: {},
    subnode1: {},
    subnode2: {},
    lineCanvas: $('#lineCanvas'),
    canvas: document.getElementById('lineCanvas'),
    animationFrameID: {},
    showNode1: function() {
        // set objects so we know what to reset if it's called
        this.nodeContainer = $('#node1Container');
        this.mainNode = $('#node1');
        this.subnode1 = $('#node1Container .subnode1');
        this.subnode2 = $('#node1Container .subnode2');
        
        // show canvas lines
        this.drawNodeLines();
        this.lineCanvas.css({opacity: 1});
        
        // set the node container to higher z-index
        this.nodeContainer.css({'z-index': 50});
        // show node 1
        this.mainNode.css({opacity: 1});
        // show subnode 1
        this.subnode1.css({opacity: 1});
        // show subnode 2
        this.subnode2.css({opacity: 1});
        
        this.animationFrameID = window.requestAnimationFrame(NNode.loop);
    },
    showNode2: function() {
        // set objects so we know what to reset if it's called
        this.nodeContainer = $('#node2Container');
        this.mainNode = $('#node2');
        this.subnode1 = $('#node2Container .subnode1');
        this.subnode2 = $('#node2Container .subnode2');
        
        // show canvas lines
        this.drawNodeLines();
        this.lineCanvas.css({opacity: 1});
        
        // set the node container to higher z-index
        this.nodeContainer.css({'z-index': 50});
        // show node 1
        this.mainNode.css({opacity: 1});
        // show subnode 1
        this.subnode1.css({opacity: 1});
        // show subnode 2
        this.subnode2.css({opacity: 1});
        
        this.animationFrameID = window.requestAnimationFrame(NNode.loop);
    },
    showNode3: function() {
        // set objects so we know what to reset if it's called
        this.nodeContainer = $('#node3Container');
        this.mainNode = $('#node3');
        this.subnode1 = $('#node3Container .subnode1');
        this.subnode2 = $('#node3Container .subnode2');
        
        // show canvas lines
        this.drawNodeLines();
        this.lineCanvas.css({opacity: 1});
        
        // set the node container to higher z-index
        this.nodeContainer.css({'z-index': 50});
        // show node 1
        this.mainNode.css({opacity: 1});
        // show subnode 1
        this.subnode1.css({opacity: 1});
        // show subnode 2
        this.subnode2.css({opacity: 1});
        
        this.animationFrameID = window.requestAnimationFrame(NNode.loop);
    },
    reset: function() {
        this.nodeContainer.css({'z-index': 1});
        this.lineCanvas.css({opacity: 0});
        this.mainNode.css({opacity: 0});
        this.subnode1.css({opacity: 0});
        this.subnode2.css({opacity: 0});
        
        window.cancelAnimationFrame(NNode.animationFrameID);
    },
    drawNodeLines: function() {
        // get positions of all elements and draw lines to those positions on the canvas
        var mainNodePos = this.mainNode.position();
        var subnode1Pos = this.subnode1.position();
        var subnode2Pos = this.subnode2.position();
        
        // set local variable context
        var canvas = this.canvas;
        var ctx = canvas.getContext('2d');
        
        // draw line from start to main node
        ctx.beginPath();
        ctx.moveTo(600, 300);
        ctx.lineTo(mainNodePos.left, mainNodePos.top);
        ctx.stroke();
        
        // draw line from main node to subnode1
        ctx.beginPath();
        ctx.moveTo(mainNodePos.left, mainNodePos.top);
        ctx.lineTo(subnode1Pos.left, subnode1Pos.top);
        ctx.stroke();
        
        // draw line from main node to subnode2
        ctx.beginPath();
        ctx.moveTo(mainNodePos.left, mainNodePos.top);
        ctx.lineTo(subnode2Pos.left, subnode2Pos.top);
        ctx.stroke();
        
        console.log('sanity')
    },
    loop: function() {
//        this.animationFrameID = requestAnimationFrame(this.loop);
        NNode.animationFrameID = window.requestAnimationFrame(NNode.loop);
        NNode.drawNodeLines();
        
    }
}