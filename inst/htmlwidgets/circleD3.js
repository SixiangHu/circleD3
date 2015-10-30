HTMLWidgets.widget({

  name: 'circleD3',

  type: 'output',

  initialize: function(el, width, height) {
    var r = 500;
    
    var vis = d3.select(el).insert("svg:svg", "h2")
        .attr("width", width)
        .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + (width - r) / 2 + "," + (height - r) / 2 + ")");
      
    return {
      pack: d3.layout.pack(),
      vis: vis
    };
  },
  
  renderValue: function(el, xx, instance) {

    var r = xx.radius,
        x = d3.scale.linear().range([0, r]),
        y = d3.scale.linear().range([0, r]),
        root= xx.data
        ;
    
    var node = root;
    
    var pack = instance.pack.size([r,r])
        .value(function(d) { return d.size; });
      
    var nodes = pack.nodes(root);
    
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Name:</strong> <span style='color:red'>" + d.name + "</span>";
      });
    
    instance.vis.call(tip);
    
    instance.vis.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", function(d) { return d.children ? "parent" : "child"; })
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.r; })
        .on("click", function(d) { return zoom(node == d ? root : d); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    
    instance.vis.selectAll("text")
        .data(nodes)
        .enter().append("svg:text")
        .attr("class", function(d) { return d.children ? "parent" : "child"; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })
        .text(function(d) {
            return d.name;
        });
        
    d3.select(el).on("click", function() { zoom(root); });

    function zoom(d, i) {
        var k = r / d.r / 2;
        x.domain([d.x - d.r, d.x + d.r]);
        y.domain([d.y - d.r, d.y + d.r]);

        var t = instance.vis.transition()
            .duration(d3.event.altKey ? 7500 : 750);

        t.selectAll("circle")
            .attr("cx", function(d) { return x(d.x);  })
            .attr("cy", function(d) { return y(d.y);  })
            .attr("r", function(d)  { return k * d.r; });

        // updateCounter is a hacky way to determine when transition is finished
        var updateCounter = 0;

        t.selectAll("text")
            .style("opacity", 0)
            .attr("x", function(d) { return x(d.x); })
            .attr("y", function(d) { return y(d.y); })
            .each(function(d, i) {
                updateCounter++;
            })
            .each("end", function(d, i) {
                updateCounter--;
                if (updateCounter === 0) {
                    adjustLabels(k);
                }
            });

        node = d;
        d3.event.stopPropagation();
    }


    function adjustLabels(k) {
        instance.vis.selectAll("text")
            .style("opacity", function(d) {
                return k * d.r > 20 ? 1 : 0;
            })
            .text(function(d) {
                return d.name;
            })
            .filter(function(d) {
                d.tw = this.getComputedTextLength();
                return (Math.PI*(k*d.r)/2) < d.tw;
            })
            .each(function(d) {
                var proposedLabel = d.name;
                var proposedLabelArray = proposedLabel.split('');
                while ((d.tw > (Math.PI*(k*d.r)/2) && proposedLabelArray.length)) {
                    // pull out 3 chars at a time to speed things up (one at a time is too slow)
                    proposedLabelArray.pop();proposedLabelArray.pop(); proposedLabelArray.pop();
                    if (proposedLabelArray.length===0) {
                        proposedLabel = "";
                    } else {
                        proposedLabel = proposedLabelArray.join('') + "..."; // manually truncate with ellipsis
                    }
                    d3.select(this).text(proposedLabel);
                    d.tw = this.getComputedTextLength();
                }
            });
    }
  }
});
