$(document).ready(async function () {

let res = await fetch('js/stacks.json')
let obj = await res.json()
let APSStacks = obj.stacks
let stacksmenu = ''
for (const stack of APSStacks) {
  stacksmenu+=`<a data-type="${stack.type}" class="dropdown-item addwidget" href="#">${stack.displayname}</a>`
}
$('.dropdown-menu').html(stacksmenu)
$(".addwidget").click(function(){
    let info = getInfoBYType($(this).attr('data-type'));
    console.log(info)
    addNewWidget(info)
  });

  function getInfoBYType(type) {
      for (let index = 0; index < APSStacks.length; index++) {
        if(APSStacks[index].type === type) return APSStacks[index];          
      }
  }
    let options = { 
      handle: '.card-header',// put in gridstack options here
    disableOneColumnMode: true, // for jfiddle small window size
    float: false
  };

  let grid = GridStack.init(options);  

  grid.on("resizestop", function(resizestop) {
    viewer.resize();
    let width = (resizestop.target.clientWidth)*0.95;
    let height = (resizestop.target.clientWidth)*0.95;
    
    // setTimeout(() => {
    //   $($(resizestop.target).find('.dashboardPanel')[0]).parent().css({
    //     "height": height+"px"
    //   })
    // }, 100);
    // canvas.attr("width", size);
    // canvas.attr("height", size);
  });

  addNewWidget = function (info) {
    info.node.content = getContent(info);
    grid.addWidget(info.node);
    executeFunctionByName(info.function,window,info.arguments);
    return false;
  };
let uniqueid;
  function getContent(info) {
      uniqueid = UUID.generate()
      switch (info.type) {
          case 'viewer':
            info.arguments.container = uniqueid+'APSViewer';
            return '<div id="'+uniqueid+'APSViewer"></div>';
          case 'piechart':
          case 'barchart':
            info.arguments.selectchart = uniqueid+'selectchart';
            info.arguments.dashboard = uniqueid+'dashboard';
            return '<div id="'+uniqueid+'selectchart"></div><div id="'+uniqueid+'dashboard"></div>';
          case 'BoilerPlate':
            info.arguments.selectchart = uniqueid+'selectchart';
            info.arguments.dashboard = uniqueid+'dashboard';
            return '<div id="'+uniqueid+'selectchart"></div><div id="'+uniqueid+'dashboard"></div>';
          default:
            info.arguments.container = uniqueid+info.type;
            return '<div id="'+uniqueid+info.type+'></div>';
      }
  }


function executeFunctionByName(functionName, context /*, args */) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for(var i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
  }
});

let chartsarr = [];
function drawPieChart(data) {
  let newPieChart = new PieChart(data.defaultproperty);
  new Dashboard(NOP_VIEWER, newPieChart,data.dashboard,data.selectchart,data.defaultproperty)
  chartsarr.push(newPieChart);
}

function drawBarChart(data) {
  let newBarChart = new BarChart(data.defaultproperty);
    new Dashboard(NOP_VIEWER, newBarChart,data.dashboard,data.selectchart,data.defaultproperty);
    chartsarr.push(newBarChart);
}

let UUID = (function() {
    let self = {};
    let lut = []; for (let i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
    self.generate = function() {
      let d0 = Math.random()*0xffffffff|0;
      let d1 = Math.random()*0xffffffff|0;
      let d2 = Math.random()*0xffffffff|0;
      let d3 = Math.random()*0xffffffff|0;
      return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
        lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
        lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
        lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
    }
    return self;
  })();