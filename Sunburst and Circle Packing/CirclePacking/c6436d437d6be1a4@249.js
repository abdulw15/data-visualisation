function _1(md){return(
md`# Zoomable Main Dev packing v1


Click to zoom in or out.`
)}

function _chart(pack,platform_maindev,d3,width,height,color)
{  const root = pack(platform_maindev);
  let focus = root;
  let view;

  const svg = d3.create("svg")
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .style("display", "block")
      .style("margin", "0 -14px")
      .style("background", color(0))
      .style("cursor", "pointer")
      .on("click", (event) => zoom(event, root));

  const node = svg.append("g")
    .selectAll("circle")
    .data(root.descendants().slice(1))
    .join("circle")
      .attr("fill", d => d.children ? color(d.depth) : d.data.author_color)
      .attr("pointer-events", d => !d.children ? "none" : null)
      .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
      .on("mouseout", function() { d3.select(this).attr("stroke", null); })
      .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

  const label = svg.append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(root.descendants())
    .join("text")
      .style("fill-opacity", d => d.parent === root ? 1 : 0)
      .style("display", d => d.parent === root ? "inline" : "none")
      .text(d => d.data.name);

  zoomTo([root.x, root.y, root.r * 2]);

  function zoomTo(v) {
    const k = width / v[2];

    view = v;

    label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);
  }

  function zoom(event, d) {
    const focus0 = focus;

    focus = d;

    const transition = svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

    label
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  return svg.node();
}


function _directory_structure6(FileAttachment){return(
FileAttachment("directory_structure-2_none_some_usa_states.json").json()
)}

function _platform_maindev(FileAttachment){return(
FileAttachment("directory_structure-2_none_some_usa_states.json").json()
)}

function _pack(d3,width,height){return(
data => d3.pack()
    .size([width, height])
    .padding(3)
  (d3.hierarchy(data)
    .sum(d => d.size)
    .sort((a, b) => b.size - a.size))
)}

function _width(){return(
500
)}

function _height(width){return(
width
)}

function _format(d3){return(
d3.format(",d")
)}

function _color(d3){return(
d3.scaleLinear()
    .domain([0, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl)
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["directory_structure-2_none_some_usa_states.json", {url: new URL("./files/43d7c31a5720cc92130a335aad14a45e56b5308bdfebcdae75bc3a5520d306364056afa1e76e9218f775c6dc2cc36e1f6716cca689acc3913bbd712146caec9c.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["pack","platform_maindev","d3","width","height","color"], _chart);
  main.variable(observer("directory_structure6")).define("directory_structure6", ["FileAttachment"], _directory_structure6);
  main.variable(observer("platform_maindev")).define("platform_maindev", ["FileAttachment"], _platform_maindev);
  main.variable(observer("pack")).define("pack", ["d3","width","height"], _pack);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer("format")).define("format", ["d3"], _format);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
