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
    let options = { // put in gridstack options here
    disableOneColumnMode: true, // for jfiddle small window size
    float: false
  };
  let grid = GridStack.init(options);  
  
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
function drawPieChart(data) {
    new Dashboard(NOP_VIEWER, new PieChart(data.defaultproperty),data.dashboard,data.selectchart,data.defaultproperty)
}
function drawBarChart(data) {
    new Dashboard(NOP_VIEWER, new BarChart(data.defaultproperty),data.dashboard,data.selectchart,data.defaultproperty)
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