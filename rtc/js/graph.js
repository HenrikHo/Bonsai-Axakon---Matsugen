/**
 * Created by henri on 2017-10-04.
 */
$(document).ready(function(){
    $('#salesStatistics').stop(true, true).fadeIn(500);
    setGraph();
});

var graph;
var xPadding = 30;
var yPadding = 30;

var data = { value: [
    {X: "Gaspar", Y: 27.4},
    {X: "2017-05-09", Y: 27.8874},
    {X: "2017-06-09", Y: 28.999},
    {X: "2017-07-09", Y: 15},
    {X: "2017-08-09", Y: 15.7},
    {X: "2017-09-09", Y: 16},
]};

function getMaxY(){
    var max = 0;

    for(var i = 0; i < data.value.length; i++){
        if(data.value[i].Y > max){
            max = data.value[i].Y;
        }
    }
    max += 10 - max % 10;
    return max;
}
function getXPixel(val){
    return ((graph.width() - xPadding) / data.value.length) * val + (xPadding * 1.5);
}

function getYPixel(val){
    return graph.height() - (((graph.height() - yPadding) / getMaxY()) * val) - yPadding;
}


function setGraph(){
     graph = $('#graphCanvas');
     var c = graph[0].getContext('2d');

     c.clearRect(0,0, graph.width(), graph.height()); // clear the canvas before drawing again.

     c.lineWidth = 4;
     c.strokeStyle = '#333';
     c.font = 'italic 18px sans-serif';
     c.textAlign= "center";

    /*----------set the graph lines, one vertical one horizontal------------*/
     c.beginPath();
     c.moveTo(xPadding, 0);
     c.lineTo(xPadding, graph.height() - yPadding);
    // c.lineTo(graph.width(), graph.height() - yPadding);
     c.stroke();

    /*----------set the text at the bottom of the graph -----------*/

     for(var i = 0; i < data.value.length; i++){
     c.fillText(data.value[i].X, getXPixel(i) + 12, graph.height() - yPadding + 20);
     }

    /*------------fill the numbers on the left side of the graph------------------*/
     c.textAlign = "right";
     c.textBaseline = "middle";

     for(var x = 0; x < getMaxY(); x+= 10){

         if(x !== 0){
             c.fillText(x, xPadding - 10, getYPixel(x));
         }


     }

    /*-----------draw the lines in the graph-------------*/
     c.strokeStyle = '#D26A5B';
     c.beginPath();
     c.moveTo(getXPixel(0), getYPixel(data.value[0].Y));
     for(var k = 1; k < data.value .length; k++){
     c.lineTo(getXPixel(k), getYPixel(data.value[k].Y));
     }
     c.stroke();

    /*---------------set numbers above the turning points ---------------*/
      c.fillStyle = '#333';
      for(var m = 0; m < data.value.length; m++){
      c.fillText(data.value[m].Y ,getXPixel(m) + 7, getYPixel(data.value[m].Y) - 20 )
      }


    /*---------------set dots at turning points at  in the graph ---------------*/
    /*c.fillStyle = '#333';
    for(var m = 0; m < data.value.length; m++){
        c.beginPath();
        c.arc(getXPixel(m), getYPixel(data.value[m].Y), 4, 0, Math.PI * 2,true);
        c.fill();
    } */

    // fill rectangular with canvas https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_height_width
    // code to canvas https://web.archive.org/web/20130407101311/http://www.worldwidewhat.net/2011/06/draw-a-line-graph-using-html5-canvas/

}








