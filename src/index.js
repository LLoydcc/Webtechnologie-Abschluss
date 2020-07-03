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

    year;
    value; 
    constructor(year, value) {
        this.year = year;
        this.value = value;
    }
}

class Chart {        

    years = {
        start: '',
        end: '', 
        decades: []
    }

    xAxis = {
        startX: 50,
        startY: 280,
        endX: 1550,
        endY: 280,  
    }

    yAxis = {
        startX: 50,
        startY: 550,
        endX: 50,
        endY: 50
    }

    /**
    * Creates a new Chart object
    * @param {object} canvas
    */
    constructor(canvas, items) {        
        canvas.width = 1600;
        canvas.height = 600;
        let ctx = canvas.getContext("2d");

        this.setYears(items);
        this.drawChart(ctx);  
        this.draw(items, ctx);              
    }

    setYears(items){
        this.years.start = items[items.length - 1].year;
        this.years.end = items[0].year;

        for(let i = 0; i < items.length; i++){
            let year = items[i].year;            
            if(!this.years.decades.includes(year) && (year % 10 == 0)){
                this.years.decades.push(year);
            } 
        }
    }

    drawChart(ctx){
        //draw Axis 
        // y - Axis
        ctx.beginPath();
        ctx.moveTo(this.yAxis.startX, this.yAxis.startY);
        ctx.lineTo(this.yAxis.endX, this.yAxis.endY);
        ctx.closePath();
        ctx.stroke();
        
        //draw axis labeling & orientation lines   
        // x - Axis
        let xRange = (this.xAxis.endX - this.xAxis.startX) / this.years.decades.length;
        let yearPosition = this.xAxis.startY + 290;
        
        for(let i = this.xAxis.startX, j = 1; i < (this.xAxis.endX - this.xAxis.startX), j <= this.years.decades.length; i = i + xRange, j++){
            ctx.fillText(this.years.decades[this.years.decades.length - j], i, yearPosition);

            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.strokeStyle = "#D8D8D8";
            ctx.moveTo(i + xRange, this.yAxis.startY);
            ctx.lineTo(i + xRange, this.yAxis.endY);
            ctx.closePath();
            ctx.stroke();                       
        }

        // y - Axis
        let yRange = (this.yAxis.startY - this.yAxis.endY) / 4;
        let values = ['-1.00', '-0.50', '0.00', '0.50', '1.00'];

        for(let i = this.yAxis.startY, j = 0; i > this.yAxis.endY, j < values.length; i = i - yRange, j++){
            ctx.fillText(values[j], this.yAxis.startX - 32, i);

            // check for middle line to make it thicker
            if(j == 1){
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.strokeStyle = "#000000";
                ctx.moveTo(this.yAxis.startX, i - yRange);
                ctx.lineTo(this.xAxis.endX, i - yRange);
                ctx.closePath();
                ctx.stroke();    
            } else {
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.strokeStyle = "#D8D8D8";
                ctx.moveTo(this.yAxis.startX, i - yRange);
                ctx.lineTo(this.xAxis.endX, i - yRange);
                ctx.closePath();
                ctx.stroke();    
            }                
        }                  
    }

    /**
    * Draws series on the canvas
    * @param {SeriesItem[]} series
    */
    draw(series, ctx) {
        let yAxisRange = this.yAxis.startY - this.yAxis.endY;
        let xAxisRange = this.xAxis.endX - this.xAxis.startX;

        console.log(series);
        
        for(let i = 0; i < series.length; i++){
            ctx.fillStyle = "red";
            ctx.fillRect(this.mapXCoordinates(series[i].year, xAxisRange), this.mapYCoordinates(series[i].value, yAxisRange), 3, 3);
        }
    }

    mapXCoordinates(year, range){        
        return (year - this.years.start) * (range - 50) / (this.years.end - this.years.start) + 50;
    }
    
    mapYCoordinates(value, range){        
        return (value - (1.0)) * (range - 50) / (-1.0 - (1.0)) + 50;
    }

}

class Application {
    canvas = document.getElementById("canvas");    

    init(){             
        fetch("../data/daten.json")
             .then(res => res.json())
             .then(data => {
                let items = [data.length]; 
                for(let i = 0; i < data.length; i++){
                    items[i] = new SeriesItem(data[i].Year, data[i].Mean);
                }
                new Chart(canvas, items);
             }            
        );        
    }
}


