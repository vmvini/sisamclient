(function(){

	angular
		.module('sisamclient')
		.service('chartservice', chartservice);

	//chartservice.$inject = [''];
	function chartservice(){

		var drawChart = function(data, var1, var2){
			d3.select("svg").remove();
			var margin = {top: 60, right: 60, bottom: 60, left: 60};
			var xTimeScale, y0Scale, y1Scale;
			var xAxis, yAxisLeft, yAxisRight;
			var valueLine, valueLine2;
			var filteredData;
			var svgContainer = new SvgContainer(margin, 600, 300);

			//verifica se os campos (var1 e var2) de cada elemento possuem valores validos
			filteredData = filterResults(data, function(d){
				return d[var1];
			}, function(d){
				return d[var2];
			});

			filteredData.forEach(function(d){
				//d.data.$value = formatDate(d.data.$value);
				d.data.$value = new Date(d.data.$value);
				console.log(d);
			});	



			
			//Configurando Escalas
			xTimeScale = new TimeScale(0, svgContainer.width );
			xTimeScale.create();
			xTimeScale.scaleByDataRange(filteredData, function(d){
				return d.data.$value;
			});

			y0Scale = new Scale(svgContainer.height, 0);
			y0Scale.create();
			y0Scale.scaleByDataRange(filteredData, function(d){
				return d[var1];
			});

			y1Scale = new Scale(svgContainer.height, 0);
			y1Scale.create();
			y1Scale.scaleByDataRange(filteredData, function(d){
				return d[var2];
			});


			//Configurando Eixos
			xAxis = new Axis(xTimeScale.scale);
			xAxis.create(5, "top");
			xAxis.draw(svgContainer.svg, "x axis", "black");

			yAxisLeft = new Axis(y0Scale.scale);
			yAxisLeft.create(5, "left");
			yAxisLeft.draw(svgContainer.svg, "y axis", "steelblue");

			yAxisRight = new Axis(y1Scale.scale);
			yAxisRight.create(5, "right");
			yAxisRight.draw(svgContainer.svg, "y axis", "red");



			//Configurando Linhas
			valueLine = new Line(xTimeScale.scale, y0Scale.scale );
			valueLine.create(function(d){
				return d.data.$value;
			}, function(d){
				return d[var1];
			});
			valueLine.draw(svgContainer.svg, "blue", filteredData);


			valueLine2 = new Line(xTimeScale.scale, y1Scale.scale );
			valueLine2.create(function(d){
				return d.data.$value;
			}, function(d){
				return d[var2];
			});

			valueLine2.draw(svgContainer.svg, "red", filteredData);

		};

		return {
			drawChart: drawChart
		};

	}


	function Scale(start, end){

		this.scale;

		this.create = function(){
			this.scale = d3.scale.linear().range([start, end]);
			console.log("criando scale", this.scale);
		};

		this.scaleByDataRange = function(data, field){
			console.log("scale: ",this.scale);
			this.scale.domain([0, d3.max(data, function(d){
				return Math.max( field(d) );
			}) ] );

		};

	}

	function TimeScale(start, end){
		this.scale;

		this.create = function(){
			this.scale = d3.time.scale().range([start, end]);
			console.log("criando scale", this.scale);
		};

		this.scaleByDataRange = function(data, field){
			console.log("scale: ",this.scale);
			this.scale.domain(d3.extent(data, function(d){
				return field(d);
			}));
		};
	}


	/*
		xscale = d3.scale
		yscale = d3.scale
	*/
	function Line(xscale, yscale){

		var line;

		/*
			xData = function(d){ return d.campoDado }
			yData = function(d){ return d.campoDado }
		*/
		this.create = function(xData, yData){
			line = d3.svg.line()
					.x(function(d){ return xscale( xData(d) );  })
					.y(function(d){ return yscale( yData(d) ); });
		};

		this.draw = function(svg, color, data){
			svg.append("path")
				.style("stroke", color)
        		.attr("d", line(data));
		};

	}


	function Axis(scale){

		var axis;

		this.create = function(tick, orient){
			axis = d3.svg.axis().scale(scale)
    			.orient(orient).ticks(tick);
		};	

		this.draw = function(svg, axisClass, numberColor){
			svg.append("g")				
		        .attr("class", axisClass)
		        //.attr("transform", "translate(" + width + " ,0)")	
		        .style("fill", numberColor)		
		        .call(axis);
		};

	}

	function SvgContainer(margin, w, h){

		this.width = w - margin.left - margin.right,
    	this.height = h - margin.top - margin.bottom;

    	this.svg = d3.select("body")
		    .append("svg")
		        .attr("width", this.width + margin.left + margin.right)
		        .attr("height", this.height + margin.top + margin.bottom)
		    .append("g")
		        .attr("transform", 
		              "translate(" + margin.left + "," + margin.top + ")");

	}


	function formatDate(date, format){
		var localTime = moment().format('YYYY-MM-DD');
		var parseDate; 
		if(format === undefined){
			parseDate = d3.time.format("%Y-%m-%dT%H:%M:%SZ").parse;
		}
		else{
			parseDate = d3.time.format(format).parse;
		}

		var formated = parseDate(date);
		console.log("data formatada: ", formated);
		

		return formated;
	}

	//filterResults(dataArray, [fields,...])
	function filterResults(array){
		var resultArray = [];
		var fields = Array.prototype.slice.call(arguments, 1);
		
		var j, k;
		var current;
		var invalid;

		for(j = 0; j < array.length; j++){

			invalid = false;

			for(k = 0; k < fields.length; k++){
				current = fields[k]( array[j] );
				if( current === "99999.0" || current === "99999.0" ){
					invalid = true;
				}
			}

			if(!invalid){
				resultArray.push( array[j] );
			}

		}

		return resultArray;

	}


})();