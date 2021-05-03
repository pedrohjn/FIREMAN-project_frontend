var FusionCharts = require("fusioncharts");
require("fusioncharts/fusioncharts.charts")(FusionCharts);
require("fusioncharts/fusioncharts.widgets")(FusionCharts);

  var socket_data = io.connect('http://localhost:3000/');
  var socket_predictions = io.connect('http://localhost:3001/');
    	var transactionChart = new FusionCharts({
    		id: "ucispamchart",
	        type: 'realtimecolumn',
            width: '350',
	        /*width: '700',*/
	        /*height: '350',*/
	        dataFormat: 'json',
	        dataSource: {
	            "chart": {
    	         "caption": "SPAM predictions",
                    "subCaption": "UCI dataset",
                    "yaxismaxvalue": "1",
                    "numdisplaysets": "5",
                    "yAxisName":"label",
                    "labeldisplay": "rotate",
                    "showLegend":"0",
                    "showValues": "0",
                    "numbersuffix": "",
                    "showlabels": "1",
/*This parameter lets you set whether you want the latest value (received from server) to be displayed on the chart or not*/
                    "showRealTimeValue": "0",
/*For this parameter, you can specify the number of seconds after which the chart will look for new data. This process will happen continuously - i.e., if you specify 5 seconds here, the chart will look for new data every 5 seconds*/
                     "refreshInterval":".1",
/*If you want the chart to keep polling for new data every x seconds and queue it, you can specify that x seconds as updateInterval. This helps you poll at different intervals and then draw at another interval (specified as refreshInterval)*/
                    "updateInterval":".1",
                    "yAxisNamePadding":"5",
                    //Cosmetics
                    "paletteColors" : "#0075c2,#1aaf5d",
                    "baseFontColor" : "#333333",
                    "baseFont" : "Helvetica Neue,Arial",
                    "captionFontSize" : "14",
                    "subcaptionFontSize" : "14",
                    "subcaptionFontBold" : "0",
                    "showBorder" : "0",
                    "bgColor" : "#ffffff",
                    "showShadow" : "0",
                    "canvasBgColor" : "#ffffff",
                    "canvasBorderAlpha" : "0",
                    "divlineAlpha" : "100",
                    "divlineColor" : "#999999",
                    "divlineThickness" : "1",
                    "divLineIsDashed" : "1",
                    "divLineDashLen" : "1",
                    "divLineGapLen" : "1",
                    "usePlotGradientColor" : "0",
                    "showplotborder" : "0",
                    "valueFontColor" : "#ffffff",
                    "placeValuesInside" : "1",
                    "rotateValues" : "1",
                    "showXAxisLine" : "1",
                    "xAxisLineThickness" : "1",
                    "xAxisLineColor" : "#999999",
                    "showAlternateHGridColor" : "0",
                    "legendBgAlpha" : "0",
                    "legendBorderAlpha" : "0",
                    "legendShadow" : "0",
                    "legendItemFontSize" : "10",
                    "legendItemFontColor" : "#666666"
    	            },
	            "categories": [
	                {
	                    "category": [
	                        { "label": "Start" }
	                    ]
	                }
	            ],
	            "dataset": [ 
	                {
	                    "seriesname": "",
	                    "alpha": "100",
	                    "data": [
	                        { "value": "1" }
	                    ]
	                }
	            ]      
	        }
    	}).render("uci_spam_chart");
//On connection with socket, will start receiving the data
	  socket_predictions.on('update_predictions', function (data) {
	    function updateData() {
                         //Converting the fetched data in FusionCharts format
	    	var strData = "&label=" + JSON.stringify(data.timestamp) + "&value=" + JSON.stringify(data.label);
                        //feeding the data to the real time chart
	    	FusionCharts.items.ucispamchart.feedData(strData);
	    }
	    //calling the update method
	    updateData();

	 });

     var transactionChart = new FusionCharts({
        id: "ucispamchart_Cont_1",
        type: 'realtimeline',
        width: '350',
        /*width: '700',*/
        /*height: '350',*/
        dataFormat: 'json',
        dataSource: {
            "chart": {
             "caption": "SPAM Cont_1",
                "subCaption": "UCI dataset",
                "yaxismaxvalue": "1",
                "numdisplaysets": "5",
                "yAxisName":"cont_value",
                "labeldisplay": "rotate",
                "showLegend":"0",
                "showValues": "0",
                "numbersuffix": "",
                "showlabels": "1",
/*This parameter lets you set whether you want the latest value (received from server) to be displayed on the chart or not*/
                "showRealTimeValue": "0",
/*For this parameter, you can specify the number of seconds after which the chart will look for new data. This process will happen continuously - i.e., if you specify 5 seconds here, the chart will look for new data every 5 seconds*/
                 "refreshInterval":".1",
/*If you want the chart to keep polling for new data every x seconds and queue it, you can specify that x seconds as updateInterval. This helps you poll at different intervals and then draw at another interval (specified as refreshInterval)*/
                "updateInterval":".1",
                "yAxisNamePadding":"5",
                //Cosmetics
                "paletteColors" : "#0075c2,#1aaf5d",
                "baseFontColor" : "#333333",
                "baseFont" : "Helvetica Neue,Arial",
                "captionFontSize" : "14",
                "subcaptionFontSize" : "14",
                "subcaptionFontBold" : "0",
                "showBorder" : "0",
                "bgColor" : "#ffffff",
                "showShadow" : "0",
                "canvasBgColor" : "#ffffff",
                "canvasBorderAlpha" : "0",
                "divlineAlpha" : "100",
                "divlineColor" : "#999999",
                "divlineThickness" : "1",
                "divLineIsDashed" : "1",
                "divLineDashLen" : "1",
                "divLineGapLen" : "1",
                "usePlotGradientColor" : "0",
                "showplotborder" : "0",
                "valueFontColor" : "#ffffff",
                "placeValuesInside" : "1",
                "rotateValues" : "1",
                "showXAxisLine" : "1",
                "xAxisLineThickness" : "1",
                "xAxisLineColor" : "#999999",
                "showAlternateHGridColor" : "0",
                "legendBgAlpha" : "0",
                "legendBorderAlpha" : "0",
                "legendShadow" : "0",
                "legendItemFontSize" : "10",
                "legendItemFontColor" : "#666666"
                },
            "categories": [
                {
                    "category": [
                        { "label": "Start" }
                    ]
                }
            ],
            "dataset": [ 
                {
                    "seriesname": "",
                    "alpha": "100",
                    "data": [
                        { "value": "1" }
                    ]
                }
            ]      
        }
    }).render("uci_spam_chart_Cont_1");
//On connection with socket, will start receiving the data
  socket_data.on('update_data', function (data) {
    function updateData() {
                     //Converting the fetched data in FusionCharts format
        var strData = "&label=" + JSON.stringify(data.timestamp) + "&value=" + JSON.stringify(data.Cont_1);
                    //feeding the data to the real time chart
        FusionCharts.items.ucispamchart_Cont_1.feedData(strData);
    }
    //calling the update method
    updateData();

 });

 var transactionChart = new FusionCharts({
    id: "ucispamchart_Cont_2",
    type: 'realtimeline',
    width: '350',
    /*width: '700',*/
    /*height: '350',*/
    dataFormat: 'json',
    dataSource: {
        "chart": {
         "caption": "SPAM Cont_2",
            "subCaption": "UCI dataset",
            "yaxismaxvalue": "1",
            "numdisplaysets": "5",
            "yAxisName":"cont_value",
            "labeldisplay": "rotate",
            "showLegend":"0",
            "showValues": "0",
            "numbersuffix": "",
            "showlabels": "1",
/*This parameter lets you set whether you want the latest value (received from server) to be displayed on the chart or not*/
            "showRealTimeValue": "0",
/*For this parameter, you can specify the number of seconds after which the chart will look for new data. This process will happen continuously - i.e., if you specify 5 seconds here, the chart will look for new data every 5 seconds*/
             "refreshInterval":".1",
/*If you want the chart to keep polling for new data every x seconds and queue it, you can specify that x seconds as updateInterval. This helps you poll at different intervals and then draw at another interval (specified as refreshInterval)*/
            "updateInterval":".1",
            "yAxisNamePadding":"5",
            //Cosmetics
            "paletteColors" : "#0075c2,#1aaf5d",
            "baseFontColor" : "#333333",
            "baseFont" : "Helvetica Neue,Arial",
            "captionFontSize" : "14",
            "subcaptionFontSize" : "14",
            "subcaptionFontBold" : "0",
            "showBorder" : "0",
            "bgColor" : "#ffffff",
            "showShadow" : "0",
            "canvasBgColor" : "#ffffff",
            "canvasBorderAlpha" : "0",
            "divlineAlpha" : "100",
            "divlineColor" : "#999999",
            "divlineThickness" : "1",
            "divLineIsDashed" : "1",
            "divLineDashLen" : "1",
            "divLineGapLen" : "1",
            "usePlotGradientColor" : "0",
            "showplotborder" : "0",
            "valueFontColor" : "#ffffff",
            "placeValuesInside" : "1",
            "rotateValues" : "1",
            "showXAxisLine" : "1",
            "xAxisLineThickness" : "1",
            "xAxisLineColor" : "#999999",
            "showAlternateHGridColor" : "0",
            "legendBgAlpha" : "0",
            "legendBorderAlpha" : "0",
            "legendShadow" : "0",
            "legendItemFontSize" : "10",
            "legendItemFontColor" : "#666666"
            },
        "categories": [
            {
                "category": [
                    { "label": "Start" }
                ]
            }
        ],
        "dataset": [ 
            {
                "seriesname": "",
                "alpha": "100",
                "data": [
                    { "value": "1" }
                ]
            }
        ]      
    }
}).render("uci_spam_chart_Cont_2");
//On connection with socket, will start receiving the data
socket_data.on('update_data', function (data) {
function updateData() {
                 //Converting the fetched data in FusionCharts format
    var strData = "&label=" + JSON.stringify(data.timestamp) + "&value=" + JSON.stringify(data.Cont_2);
                //feeding the data to the real time chart
    FusionCharts.items.ucispamchart_Cont_2.feedData(strData);
}
//calling the update method
updateData();

});

var transactionChart = new FusionCharts({
    id: "ucispamchart_Cont_3",
    type: 'realtimeline',
    width: '350',
    /*width: '700',*/
    /*height: '350',*/
    dataFormat: 'json',
    dataSource: {
        "chart": {
         "caption": "SPAM Cont_3",
            "subCaption": "UCI dataset",
            "yaxismaxvalue": "1",
            "numdisplaysets": "5",
            "yAxisName":"cont_value",
            "labeldisplay": "rotate",
            "showLegend":"0",
            "showValues": "0",
            "numbersuffix": "",
            "showlabels": "1",
/*This parameter lets you set whether you want the latest value (received from server) to be displayed on the chart or not*/
            "showRealTimeValue": "0",
/*For this parameter, you can specify the number of seconds after which the chart will look for new data. This process will happen continuously - i.e., if you specify 5 seconds here, the chart will look for new data every 5 seconds*/
             "refreshInterval":".1",
/*If you want the chart to keep polling for new data every x seconds and queue it, you can specify that x seconds as updateInterval. This helps you poll at different intervals and then draw at another interval (specified as refreshInterval)*/
            "updateInterval":".1",
            "yAxisNamePadding":"5",
            //Cosmetics
            "paletteColors" : "#0075c2,#1aaf5d",
            "baseFontColor" : "#333333",
            "baseFont" : "Helvetica Neue,Arial",
            "captionFontSize" : "14",
            "subcaptionFontSize" : "14",
            "subcaptionFontBold" : "0",
            "showBorder" : "0",
            "bgColor" : "#ffffff",
            "showShadow" : "0",
            "canvasBgColor" : "#ffffff",
            "canvasBorderAlpha" : "0",
            "divlineAlpha" : "100",
            "divlineColor" : "#999999",
            "divlineThickness" : "1",
            "divLineIsDashed" : "1",
            "divLineDashLen" : "1",
            "divLineGapLen" : "1",
            "usePlotGradientColor" : "0",
            "showplotborder" : "0",
            "valueFontColor" : "#ffffff",
            "placeValuesInside" : "1",
            "rotateValues" : "1",
            "showXAxisLine" : "1",
            "xAxisLineThickness" : "1",
            "xAxisLineColor" : "#999999",
            "showAlternateHGridColor" : "0",
            "legendBgAlpha" : "0",
            "legendBorderAlpha" : "0",
            "legendShadow" : "0",
            "legendItemFontSize" : "10",
            "legendItemFontColor" : "#666666"
            },
        "categories": [
            {
                "category": [
                    { "label": "Start" }
                ]
            }
        ],
        "dataset": [ 
            {
                "seriesname": "",
                "alpha": "100",
                "data": [
                    { "value": "1" }
                ]
            }
        ]      
    }
}).render("uci_spam_chart_Cont_3");
//On connection with socket, will start receiving the data
socket_data.on('update_data', function (data) {
function updateData() {
                 //Converting the fetched data in FusionCharts format
    var strData = "&label=" + JSON.stringify(data.timestamp) + "&value=" + JSON.stringify(data.Cont_3);
                //feeding the data to the real time chart
    FusionCharts.items.ucispamchart_Cont_3.feedData(strData);
}
//calling the update method
updateData();

});


var transactionChart = new FusionCharts({
    id: "ucispamchart_Cont_4",
    type: 'realtimeline',
    width: '350',
    /*width: '700',*/
    /*height: '350',*/
    dataFormat: 'json',
    dataSource: {
        "chart": {
         "caption": "SPAM Cont_4",
            "subCaption": "UCI dataset",
            "yaxismaxvalue": "1",
            "numdisplaysets": "5",
            "yAxisName":"cont_value",
            "labeldisplay": "rotate",
            "showLegend":"0",
            "showValues": "0",
            "numbersuffix": "",
            "showlabels": "1",
/*This parameter lets you set whether you want the latest value (received from server) to be displayed on the chart or not*/
            "showRealTimeValue": "0",
/*For this parameter, you can specify the number of seconds after which the chart will look for new data. This process will happen continuously - i.e., if you specify 5 seconds here, the chart will look for new data every 5 seconds*/
             "refreshInterval":".1",
/*If you want the chart to keep polling for new data every x seconds and queue it, you can specify that x seconds as updateInterval. This helps you poll at different intervals and then draw at another interval (specified as refreshInterval)*/
            "updateInterval":".1",
            "yAxisNamePadding":"5",
            //Cosmetics
            "paletteColors" : "#0075c2,#1aaf5d",
            "baseFontColor" : "#333333",
            "baseFont" : "Helvetica Neue,Arial",
            "captionFontSize" : "14",
            "subcaptionFontSize" : "14",
            "subcaptionFontBold" : "0",
            "showBorder" : "0",
            "bgColor" : "#ffffff",
            "showShadow" : "0",
            "canvasBgColor" : "#ffffff",
            "canvasBorderAlpha" : "0",
            "divlineAlpha" : "100",
            "divlineColor" : "#999999",
            "divlineThickness" : "1",
            "divLineIsDashed" : "1",
            "divLineDashLen" : "1",
            "divLineGapLen" : "1",
            "usePlotGradientColor" : "0",
            "showplotborder" : "0",
            "valueFontColor" : "#ffffff",
            "placeValuesInside" : "1",
            "rotateValues" : "1",
            "showXAxisLine" : "1",
            "xAxisLineThickness" : "1",
            "xAxisLineColor" : "#999999",
            "showAlternateHGridColor" : "0",
            "legendBgAlpha" : "0",
            "legendBorderAlpha" : "0",
            "legendShadow" : "0",
            "legendItemFontSize" : "10",
            "legendItemFontColor" : "#666666"
            },
        "categories": [
            {
                "category": [
                    { "label": "Start" }
                ]
            }
        ],
        "dataset": [ 
            {
                "seriesname": "",
                "alpha": "100",
                "data": [
                    { "value": "1" }
                ]
            }
        ]      
    }
}).render("uci_spam_chart_Cont_4");
//On connection with socket, will start receiving the data
socket_data.on('update_data', function (data) {
function updateData() {
                 //Converting the fetched data in FusionCharts format
    var strData = "&label=" + JSON.stringify(data.timestamp) + "&value=" + JSON.stringify(data.Cont_4);
                //feeding the data to the real time chart
    FusionCharts.items.ucispamchart_Cont_4.feedData(strData);
}
//calling the update method
updateData();

});