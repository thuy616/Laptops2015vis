var colors = [
		[101, 194, 165],
		[252, 141, 98],
		[142, 159, 203],
		[229, 138, 197],
		[168, 215, 83],
		[254, 216, 47],
		[228, 196, 149],
		[178, 179, 183],
		[93, 188, 210],
		[205, 213, 213]
	];

function draw() {


	// load data
	$.getJSON( "data.json", function(data) {
		// load checkboxes
		for (var i = 0; i<data.length; i++) {
			
			// create label element
			// create input element
			var $div = $("<div>", {class: "checkbox"});
			var $label = $("<label>");

			var $checkbox = $("<input>", {type: "checkbox"});
			
			$checkbox.attr("id", i);
			
			$label.append($checkbox);
			$label.append(data[i].name);
			$label.attr("style", "background:" + getRgbaColor(colors[i], 0.5))
			
			$div.append($label)
			$("#checkboxes").append($div);
		}

		// redraw everytime selected data is changed
		$("input:checkbox").click(function() {
			console.log("must go here");
			var selectedIds = $('input:checkbox:checked').map(function(){ return $(this).attr("id");}).get();
			console.log(selectedIds);
			redraw(selectedIds, data);
		});
	});
}

function visualizeData(radarChartData) {
	console.log("drawing");
	window.myRadar = new Chart(document.getElementById("canvas").getContext("2d")).Radar(radarChartData, {
            responsive: true,
            scaleOverride: true,
		    scaleSteps: 5,
		    scaleStepWidth: 1,
		    scaleStartValue: 0
    });
    //TODO: custom tooltips
    //Display details of selected laptop in a table
}

function redraw(selectedIds, laptops) {

	var labels = ["Processor Speed", "RAM", "Storage", "Price", "Graphics", "Battery", "Weight"];
	
	var radarChartData = new Object();
	radarChartData.labels = labels;
	radarChartData.datasets = [];

	for (var i in selectedIds) {
		var index = parseInt(selectedIds[i]);
		console.log("index: " + index);

		selectedLaptop = laptops[index];
		// calculate Score of selected Laptop

		//create selectedData object
		selectedData = new Object();
		selectedData.label = selectedLaptop.name;
		selectedData.fillColor = getRgbaColor(colors[index], 0.2);
		selectedData.strokeColor = getRgbaColor(colors[index], 1);
		selectedData.pointColor = getRgbaColor(colors[index], 1);
		selectedData.pointStrokeColor = "#fff";
		selectedData.pointHighlightFill = "fff";
		selectedData.pointHighlightStroke = getRgbaColor(colors[index], 1);
		selectedData.data = [
			getProcessorScore(selectedLaptop.processorSpeed), 
			getRamScore(selectedLaptop.ram),
			getStorageScore(selectedLaptop.storage.capacity),
			getPriceScore(selectedLaptop.price), 
			getGraphicsScore(selectedLaptop.graphic),
			getBatteryScore(selectedLaptop.battery),
			getWeightScore(selectedLaptop.weight)
		];
		radarChartData.datasets.push(selectedData);

	}

	if (radarChartData.datasets.length > 0) {
		visualizeData(radarChartData);
	}
}

function getProcessorScore(speed) {
	if (speed > 2.5) {
		return 5;
	} else if (speed >= 2.4) {
		return 4;
	} else if (speed >= 2.2) {
		return 3;
	} else if (speed >= 2) {
		return 2;
	} else {
		return 1;
	}
}

function getRamScore(ram) {
	if (ram>=16) {
		return 5;
	} else if (ram>=8) {
		return 3;
	} else if (ram>=4) {
		return 1;
	}
}

function getStorageScore(storage) {
 	if (storage.type = "HDD") {
 		if (storage.capacity >= "1024") {
 			return 3;
 		} else {
 			return 2;
 		}
 	} else if (storage.type = "SSD") {
 		if (storage.capacity >= 512) {
 			return 5;
 		} else if (storage.capacity >= 256) {
 			return 4;
 		} else if (storage.capacity >= 128) {
 			return 3;
 		} else {
 			return 2;
 		}
 	}
}

function getPriceScore(price) {
	if (price.value >= 2000) {
		return 1;
	} else if (price.value >= 1500) {
		return 2;
	} else if (price.value >= 1000) {
		return 3;
	} else if (price.value >= 600) {
		return 4;
	} else {
		return 5;
	}
}

function getGraphicsScore(graphicsType) {
	if (graphicsType.indexOf("Intel Iris") >= 0) {
		return 5;
	} else if (graphicsType.indexOf("Intel HD") >= 0) {
		return 4;
	} else if (graphicsType.indexOf("Nvidia GeForce GTX") >= 0) {
		return 4;
	} else if (graphicsType.indexOf("Nvidia GeForce") >= 0) {
		return 3;
	} else {
		return 2;
	}
}

function getBatteryScore(batt) {
	if (batt.hrs >= 10) {
		return 5;
	} else if (batt.hrs >= 7) {
		return 4;
	} else if (batt.hrs >= 5) {
		return 3;
	} else {
		return 2;
	}
}

function getWeightScore(weight) {
	return 7 - weight.value;
}

function getRgbaColor(rgbArray, transparency) {
	var rgba = "rgba(" + rgbArray[0] +"," + rgbArray[1] + "," + rgbArray[2] + "," + transparency + ")";
	return rgba;
}