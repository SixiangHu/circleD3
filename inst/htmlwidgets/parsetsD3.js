HTMLWidgets.widget({

  name: 'parsetsD3',

  type: 'output',

  initialize: function(el, width, height) {
  },

  renderValue: function(el, x, instance) {

    var chart = d3.parsets()
      .dimensions(x.dim);

    console.log(x.dim);

    var vis = d3.select(el).append("svg")
        .attr("width", chart.width())
        .attr("height", chart.height());

    vis.datum(HTMLWidgets.dataframeToD3(x.data)).call(chart);

  }
});
