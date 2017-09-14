/* Flot plugin that adds some extra symbols for plotting points.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

The symbols are accessed as strings through the standard symbol options:

	series: {
		points: {
			symbol: "square" // or "diamond", "triangle", "cross"
		}
	}

*/

(function ($) {
    function processRawData(plot, series, datapoints) {
        // we normalize the area of each symbol so it is approximately the
        // same as a circle of the given radius

        var handlers = {
            square: function (ctx, x, y, radius, shadow) {
                // pi * r^2 = (2s)^2  =>  s = r * sqrt(pi)/2
                var size = radius * Math.sqrt(Math.PI) / 2;
                ctx.rect(x - size, y - size, size + size, size + size);
            },
            diamond: function (ctx, x, y, radius, shadow) {
                // pi * r^2 = 2s^2  =>  s = r * sqrt(pi/2)
                var size = radius * Math.sqrt(Math.PI / 2);
                ctx.moveTo(x - size, y);
                ctx.lineTo(x, y - size);
                ctx.lineTo(x + size, y);
                ctx.lineTo(x, y + size);
                ctx.lineTo(x - size, y);
            },
            triangle: function (ctx, x, y, radius, shadow) {
                // pi * r^2 = 1/2 * s^2 * sin (pi / 3)  =>  s = r * sqrt(2 * pi / sin(pi / 3))
                var size = radius * Math.sqrt(2 * Math.PI / Math.sin(Math.PI / 3));
                var height = size * Math.sin(Math.PI / 3);
                ctx.moveTo(x - size/2, y + height/2);
                ctx.lineTo(x + size/2, y + height/2);
                if (!shadow) {
                    ctx.lineTo(x, y - height/2);
                    ctx.lineTo(x - size/2, y + height/2);
                }
            },
            cross: function (ctx, x, y, radius, shadow) {
                // pi * r^2 = (2s)^2  =>  s = r * sqrt(pi)/2
                var size = radius * Math.sqrt(Math.PI) / 2;
                ctx.moveTo(x - size, y - size);
                ctx.lineTo(x + size, y + size);
                ctx.moveTo(x - size, y + size);
                ctx.lineTo(x + size, y - size);
            },
            arrow: function (ctx, x, y, radius, shadow) {
              // livello1/Tracciato
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(x+1.5, y+1.5);
              ctx.lineTo(x+6.8, y+6.6);
              ctx.lineTo(x+1.5, y+11.8);
              ctx.lineWidth = 3.0;
              ctx.lineCap = "round";
              ctx.lineJoin = "round";
              ctx.stroke();
        
              // livello1/GH Dose Start
              ctx.font = "11.0px 'Fjalla One'";
              ctx.save();
              ctx.transform(1.000, 0.000, 0.000, 1.000, 14.6, 10.6);
              ctx.fillText(Drupal.t("GH Dose Start"), x+0, y+0);
              ctx.restore();
              ctx.restore();
                    },
            father: function(ctx, x, y, radius, shadow){
              // livello1/Gruppo
              ctx.save();
        
              // livello1/Gruppo/Tracciato
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(x+14.1/2, y+16.4/2);
              ctx.bezierCurveTo(x+14.1/2, y+17.9/2, x+12.8/2, y+19.2/2, x+11.3/2, y+19.2/2);
              ctx.bezierCurveTo(x+9.8/2, y+19.2/2, x+8.6/2, y+17.9/2, x+8.6/2, y+16.4/2);
              ctx.bezierCurveTo(x+8.6/2, y+14.9/2, x+9.8/2, y+13.7/2, x+11.3/2, y+13.7/2);
              ctx.bezierCurveTo(x+12.8/2, y+13.7/2, x+14.1/2, y+14.9/2, x+14.1/2, y+16.4/2);
              ctx.closePath();
              ctx.fillStyle = "#007dc2";
              ctx.fill();
        
              // livello1/Gruppo/Tracciato
              ctx.beginPath();
              ctx.moveTo(x+21.1/2, y+16.4/2);
              ctx.bezierCurveTo(x+21.1/2, y+21.8/2, x+16.7/2, y+26.2/2, x+11.3/2, y+26.2/2);
              ctx.bezierCurveTo(x+5.9/2, y+26.2/2, x+1.5/2, y+21.8/2, x+1.5/2, y+16.4/2);
              ctx.bezierCurveTo(x+1.5/2, y+11.0/2, x+5.9/2, y+6.6/2, x+11.3/2, y+6.6/2);
              ctx.bezierCurveTo(x+16.7/2, y+6.6/2, x+21.1/2, y+11.0/2, x+21.1/2, y+16.4/2);
              ctx.closePath();
              ctx.lineWidth = 3.0/2;
              ctx.strokeStyle = "#007dc2";
              ctx.stroke();
        
              // livello1/Gruppo/Tracciato
              ctx.beginPath();
              ctx.moveTo(x+20.4/2, y+1.5/2);
              ctx.lineTo(x+27.6/2, y+1.8/2);
              ctx.lineTo(x+19.4/2, y+10.1/2);
              ctx.lineCap = "square";
              ctx.stroke();
        
              // livello1/Gruppo/Tracciato
              ctx.beginPath();
              ctx.moveTo(x+27.2/2, y+10.0/2);
              ctx.lineTo(x+28.6/2, y+2.1/2);
              ctx.stroke();
              ctx.restore();
              ctx.restore();
            },
            mother: function(ctx, x, y, radius, shadow) {
              // livello1/Gruppo
              ctx.save();
        
              // livello1/Gruppo/Gruppo
              ctx.save();
        
              // livello1/Gruppo/Gruppo/Tracciato
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(x+9.4/2, y+13.3/2);
              ctx.bezierCurveTo(x+8.3/2, y+12.2/2, x+8.3/2, y+10.4/2, x+9.4/2, y+9.4/2);
              ctx.bezierCurveTo(x+10.4/2, y+8.3/2, x+12.2/2, y+8.3/2, x+13.3/2, y+9.4/2);
              ctx.bezierCurveTo(x+14.3/2, y+10.4/2, x+14.3/2, y+12.2/2, x+13.3/2, y+13.3/2);
              ctx.bezierCurveTo(x+12.2/2, y+14.3/2, x+10.4/2, y+14.3/2, x+9.4/2, y+13.3/2);
              ctx.closePath();
              ctx.fillStyle = "#e30081";
              ctx.fill();
        
              // livello1/Gruppo/Gruppo/Tracciato
              ctx.beginPath();
              ctx.moveTo(x+4.4/2, y+18.3/2);
              ctx.bezierCurveTo(x+0.5/2, y+14.4/2, x+0.5/2, y+8.2/2, x+4.4/2, y+4.4/2);
              ctx.bezierCurveTo(x+8.2/2, y+0.5/2, x+14.4/2, y+0.5/2, x+18.3/2, y+4.4/2);
              ctx.bezierCurveTo(x+22.1/2, y+8.2/2, x+22.1/2, y+14.4/2, x+18.3/2, y+18.3/2);
              ctx.bezierCurveTo(x+14.4/2, y+22.1/2, x+8.2/2, y+22.1/2, x+4.4/2, y+18.3/2);
              ctx.closePath();
              ctx.lineWidth = 3.0/2;
              ctx.strokeStyle = "#e30081";
              ctx.stroke();
        
              // livello1/Gruppo/Gruppo/Tracciato
              ctx.beginPath();
              ctx.moveTo(x+11.1/2, y+33.2/2);
              ctx.lineTo(x+11.1/2, y+21.5/2);
              ctx.lineCap = "square";
              ctx.stroke();
        
              // livello1/Gruppo/Gruppo/Tracciato
              ctx.beginPath();
              ctx.moveTo(x+9.2/2, y+33.6/2);
              ctx.stroke();
        
              // livello1/Gruppo/Tracciato
              ctx.restore();
              ctx.beginPath();
              ctx.moveTo(x+6.2/2, y+29.4/2);
              ctx.lineTo(x+16.0/2, y+29.3/2);
              ctx.lineWidth = 3.0/2;
              ctx.strokeStyle = "#e30081";
              ctx.lineCap = "square";
              ctx.stroke();
              ctx.restore();
              ctx.restore();
            },
            media: function(ctx, x, y, radius, shadow){
              // livello1/Gruppo
                ctx.save();
          
                // livello1/Gruppo/Gruppo
                ctx.save();
          
                // livello1/Gruppo/Gruppo/Tracciato
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x+4.4/2, y+18.3/2);
                ctx.bezierCurveTo(x+0.5/2, y+14.4/2, x+0.5/2, y+8.2/2, x+4.4/2, y+4.4/2);
                ctx.bezierCurveTo(x+8.2/2, y+0.5/2, x+14.4/2, y+0.5/2, x+18.3/2, y+4.4/2);
                ctx.bezierCurveTo(x+22.1/2, y+8.2/2, x+22.1/2, y+14.4/2, x+18.3/2, y+18.3/2);
                ctx.bezierCurveTo(x+14.4/2, y+22.1/2, x+8.2/2, y+22.1/2, x+4.4/2, y+18.3/2);
                ctx.closePath();
                ctx.lineWidth = 3.0/2;
                ctx.strokeStyle = "#f07e01";
                ctx.stroke();
          
                // livello1/Gruppo/Gruppo/Tracciato
                ctx.beginPath();
                ctx.moveTo(x+11.1/2, y+20.2/2);
                ctx.lineTo(x+11.1/2, y+2.4/2);
                ctx.lineCap = "square";
                ctx.stroke();
          
                // livello1/Gruppo/Gruppo/Tracciato
                ctx.beginPath();
                ctx.moveTo(x+9.2/2, y+33.6/2);
                ctx.stroke();
          
                // livello1/Gruppo/Tracciato
                ctx.restore();
                ctx.beginPath();
                ctx.moveTo(x+2.4/2, y+11.4/2);
                ctx.lineTo(x+20.4/2, y+11.3/2);
                ctx.lineWidth = 3.0/2;
                ctx.strokeStyle = "#f07e01";
                ctx.lineCap = "square";
                ctx.stroke();
                ctx.restore();
                ctx.restore();
            }
        };

        var s = series.points.symbol;
        if (handlers[s])
            series.points.symbol = handlers[s];
    }
    
    function init(plot) {
        plot.hooks.processDatapoints.push(processRawData);
    }
    
    $.plot.plugins.push({
        init: init,
        name: 'symbols',
        version: '1.0'
    });
})(jQuery);
