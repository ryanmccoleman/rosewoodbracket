$(document).ready(function() {
	var jsroutes = new JSRoutesClass({
		routeObjs: [
			{hash: 'essence-festival', divid: "bracket-essence"},
			{hash: 'soul-resurgence', divid: "bracket-resurgence"},
			{hash: 'yeezy-season', divid: "bracket-season"},
			{hash: 'stadium-status', divid: "bracket-stadium"},
			{hash: '', divid: "bracket-full"},
			{hash: 'final-four', divid: "bracket-finalfour"}
		]
	});
	var annclass = new AnnotationClass({
		dataCollection: AnnotationData
	});

	$(".matcharea").click(function(e) {
		annclass.showAnnotation($(this).attr("matchid"));
		e.preventDefault();
	});
    $(".close-btn").on("click", function () {
        annclass.closeLightBox();   
    });
    $("#lightbox-overlay").on("click", function () {
        annclass.closeLightBox();   
    });
    annclass.showIntroImage();

}); 

AnnotationClass.prototype = {
	dataCollection: null,

	init: function init() {
		this.createMatchImgMaps();
	},
	showIntroImage: function() {
		this.openLightBox();
		$(".basic-lightbox").removeClass("light-border");
		var bearimage = "<img src=\"img/Rosewood-Site-Instructions.png\" />";
		$(".pop-content").append(bearimage);
	},
	createMatchImgMaps: function() {
		for(var i=0; i< this.dataCollection.length;i++) {
			for(var v=0; v< this.dataCollection[i].maps.length;v++) {
				this.makeImageMapArea(this.dataCollection[i].maps[v].imagemap, this.dataCollection[i].maps[v].coords, this.dataCollection[i].matchid);
			}
		}
	},
	makeImageMapArea: function(map, coords, matchid) {
		var maparea = "<area href=\"\"class=\"matcharea\" shape=\"rect\" coords=\""+coords+"\" matchid=\""+matchid+"\">";
		$("map[name=\""+map+"-map\"]").append(maparea);
	},
	showAnnotation: function(matchid) {
		this.openLightBox();
		var annotElem = "<h2>"+this.getMatchObj(matchid).title+"</h2>"+this.getMatchObj(matchid).text;
		$(".pop-content").empty().append(annotElem);

	},
	getMatchObj: function(matchid) {
		for(var i=0; i<this.dataCollection.length;i++) {
			if(matchid == this.dataCollection[i].matchid) {
				return this.dataCollection[i];
			}
		}
	},
	openLightBox: function() {
	    $("#lightbox-overlay").show();
	    $("#basic-lightbox").show();
	 },

	closeLightBox: function() {
	    $("#basic-lightbox").hide().addClass("light-border");
	    $("#lightbox-overlay").hide();
	    $(".pop-content").empty()
	 }
};
	
function AnnotationClass(obj) {
  for (key in obj) {
    this[key] = obj[key];
  }
  this.init();
  return this;
}

/* JSRoutesClass Class */
JSRoutesClass.prototype = {
	routeObjs: [
		{hash: null, divid: null}
	],
	init: function() {
		var that = this;
		for(var i=0; i<this.routeObjs.length; i++) {
			crossroads.addRoute(this.routeObjs[i].hash);
		}
		crossroads.routed.add(function(request, data){
			that.loadView(request);
		});
		this.initHasher();
	},
	initHasher: function() {
		hasher.initialized.add(this.parseHash);
		hasher.changed.add(this.parseHash); 
		hasher.init(); 
		hasher.setHash('');
	},
	parseHash: function(newHash, oldHash) {
		crossroads.parse(newHash);
	},
	loadView: function(request) {
		$(".visible").addClass("hidden").removeClass("visible");
		$("#"+this.getViewId(request)).addClass("visible").removeClass("hidden");
	},
	getViewId: function(routehash) {
		var routeid;
		for(var i=0; i<this.routeObjs.length; i++) {
			if(this.routeObjs[i].hash == routehash) {
				routeid = this.routeObjs[i].divid;
				break;
			}
		}
		return routeid;
	}
};

function JSRoutesClass(obj) {
	if(obj) {
		for (key in obj) {
			this[key] = obj[key];
		}

	}
	this.init();
	return this;
} 

