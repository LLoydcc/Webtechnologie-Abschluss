document.addEventListener("DOMContentLoaded", function(event) {
    let application = new Application();
    application.init();
});


class SeriesItem {
    /**
    * Creates a new series item
    *
    * @param {string} year
    * @param {string} value
    */
    constructor(year, value) {

    }
}

class Chart {    

    base = {
        //stats 
        minX: 1880,
        minY: -1.0,
        maxX: 2010,
        maxY: 1.0, 

        //visualization
        padding: 10,
        tickSize: 10,
        axisColor: "#000000",
        pointRadius: 5, 
        xTicks: 1,
        yTicks: 1
    }

    calculated = {
        rangeX: this.base.maxX - this.base.minY,
        rangeY: this.base.maxY - this.base.minY,
        numXTicks: Math.round(this.base.maxX - this.base.minY / this.base.xTicks),
        numYTicks: Math.round(this.base.maxY - this.base.minY / this.base.yTicks),
        x: Math.round(this.base.maxX - this.base.minY / this.base.xTicks) * this.base.xTicks,
        y: Math.round(this.base.maxY - this.base.minY / this.base.yTicks) * this.base.yTicks, 
        width: '',
        height: '', 
        scaleX: '',
        scaleY: ''
    }


    /**
    * Creates a new Chart object
    * @param {object} canvas
    */
    constructor(canvas) {        
        canvas.width = 1200;
        canvas.height = 600;

        let ctx = canvas.getContext("2d");
        

        this.calculated.width = canvas.width / this.calculated.rangeX;
        this.calculated.height = canvas.height / this.calculated.rangeY;
        this.calculated.scaleX = this.calculated.width / this.calculated.rangeX;
        this.calculated.scaleY = this.calculated.height / this.calculated.rangeY;
        
        //this.drawAxis(ctx);

        // Stroked triangle
        ctx.beginPath();
        ctx.moveTo(40, 560);
        ctx.lineTo(1160, 560);    
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(40, 560);
        ctx.lineTo(40, 40);
        ctx.closePath();
        ctx.stroke();
    }

    drawAxis(ctx){
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.calculated.x, this.calculated.y + this.calculated.height);
        ctx.strokeStyle = this.base.axisColor;
        ctx.lineWidth = 2;
        ctx.stroke();
    }


    /**
    * Draws series on the canvas
    * @param {SeriesItem[]} series
    */
    draw(series) {
    }
}

class Application {

    canvas = document.getElementById("canvas");
    items = [];    

    init(){  
        fetch("../data/daten.json")
             .then(res => res.json())
             .then(data => data.map(item => {
                this.items.push(item);
                })
            );  
            
            console.log(this.items);
    }

    chart = new Chart(canvas);
    
}


