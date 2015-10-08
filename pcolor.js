/*********************************************************
 * Licensed under the MIT licenses.
 * Copyright 2015 (c) M.Belikov www.pcolor.offnote.net
*********************************************************/

(function( $ ){

  $.fn.pColor = function( opt ) {  
  
 	 var themeWEB = 
	  
	["ffffff" ,"e8e8e8" ,"d1d1d1" ,"bababa" ,"a3a3a3" ,"8c8c8c" ,"757575" ,"5e5e5e" ,"474747" ,"303030" ,"111111" ,"000000" ,
	"c5edfc" ,"ccdbfc" ,"cfbbfc" ,"eabcfc" ,"f2c7d9" ,"fad1cf" ,"fbdbce" ,"fde8cd" ,"fdefcd" ,"fcfdd7" ,"f6fad5" ,"d9eacb" ,
	"8fddfb" ,"9eb7fc" ,"a274f9" ,"d679fc" ,"e991b3" ,"f7a6a1" ,"f9b89d" ,"f8d19c" ,"fadf9c" ,"fdfcaf" ,"edf7ad" ,"c4e5a8" ,
	"5dcbfa" ,"6d93fa" ,"7630f9" ,"c238f9" ,"de5b8d" ,"f57871" ,"f5956e" ,"f6bb6a" ,"f8d16a" ,"fbfa89" ,"e4f383" ,"a5d77d" ,
	"37b9f7" ,"426ff9" ,"500ee2" ,"aa15ec" ,"d32767" ,"f24d45" ,"f3723f" ,"f4a63b" ,"f5c13d" ,"fbf963" ,"dcef5c" ,"8acb53" ,
	"2d91cc" ,"2946fa" ,"3f0aa0" ,"8310ad" ,"a01e4b" ,"f22f1e" ,"f3571b" ,"f39c1f" ,"f4bd22" ,"fbff42" ,"cfeb3a" ,"6aaf38" ,
	"2479a3" ,"213dc8" ,"2d0880" ,"640c8b" ,"80173e" ,"ce1713" ,"c43f14" ,"c17317" ,"c18d1a" ,"efeb26" ,"b5ca26" ,"588e2e" ,
	"1b5a7a" ,"192d97" ,"220661" ,"4b0967" ,"60122f" ,"9c110e" ,"932e0f" ,"915511" ,"906913" ,"b3b11c" ,"87981c" ,"416922" ,
	"123c50" ,"111f65" ,"16013f" ,"330645" ,"3f0c1f" ,"680c0a" ,"621f0a" ,"62390c" ,"60460d" ,"787513" ,"5b6513" ,"2d4716" ,
	"0d2939" ,"0b1443" ,"10002d" ,"22022f" ,"2b0715" ,"450706" ,"431607" ,"432708" ,"412f09" ,"51500d" ,"3e450c" ,"1e300f"]	;  


     var themeMS = [
	'ffffff','000000','eeece1','1f497d','4f81bd','c0504d','9bbb59','8064a2','4bacc6','f79646',
	'f2f2f2','7f7f7f','ddd9c3','c6d9f0','dbe5f1','f2dcdb','ebf1dd','e5e0ec','dbeef3','fdeada',
	'd8d8d8','595959','c4bd97','8db3e2','b8cce4','e5b9b7','d7e3bc','ccc1d9','b7dde8','fbd5b5',
	'bfbfbf','3f3f3f','938953','548dd4','95b3d7','d99694','c3d69b','b2a2c7','92cddc','fac08f',
	'a5a5a5','262626','494429','17365d','366092','953734','76923c','5f497a','31859b','e36c09',
	'7f7f7f','0c0c0c','1d1b10','0f243e','244061','632423','4f6128','3f3151','205867','974806',
	'c00000','ff0000','ffc000','ffff00','92d050','00b050','00b0f0','0070c0','002060','7030a0'];
 

    var set = $.extend({
		onChange: function() {},
		fill : false,
		color : '',
		skin : '',
		value : false ,
		selectorClass : 'pcolorSelector',
		selectorCss : false,
		textMS : 'Цвета темы',
		textWEB : 'Веб-цвета',
		textCom : 'Стандартные цвета'
	  
    }, opt || {});
	
	
	var pic = '';
	var pic2 = '';
	
	for(var i = 0; i < themeMS.length; i++){
	pic += '<div style="border-color:#'+themeMS[i]+';background:#'+themeMS[i]+'" data-color="'+themeMS[i]+'" class="colorPicker-pick"><span>&nbsp;</span></div>';
	
	if(i == 59) pic += '<code class="colorPicker-separator">&nbsp;</code><span class="colorPicker-title">'+set.textCom+'</span><code class="colorPicker-separator">&nbsp;</code>';
	} ;

	for(var i = 0; i < themeWEB.length; i++){
	pic2 += '<div style="border-color:#'+themeWEB[i]+';background:#'+themeWEB[i]+'" data-color="'+themeWEB[i]+'" class="colorPicker-pick"><span>&nbsp;</span></div>';
	} ;

/*******************************************************************************
	Авто - закрытие палитры
*********************************************************************************/	

	$(document).on('mousedown.colorPicker-box', function(event) {
		if( !$(event.target).parents().add(event.target).hasClass('colorPicker-box')){
		$('.colorPicker-box').fadeOut();
	}});
	
	var bg = function (o,c){
		if(!set.fill) return ;
		o.css('background-color','#'+c).attr('data-color',c);
	},
	val = function(t,o,c){
		if(!set.value || !c ) return ;
		c = '#'+c ;
		if( t == 'input') o.val(c);
		else o.text(c);
	};

	var notID = 0 ;
	
    return this.each(function(e) { 
	
	notID ++ ;
	
		var $this =  $(this) ,
			objID = $this.attr('id') ;
		
/*******************************************************************************
		without ID
		Если у селектора нет атрибута ID то атрибут ID будет присвоен ему автоматически 
*********************************************************************************/	
		if(!objID){
			
			objID = 'pcolornotID-'+notID;
			$this.attr('id', objID);
		}
			
		var tag = document.getElementById(objID).nodeName.toLowerCase(),
			startColor = $this.attr('data-color') || set.color.replace(/[#]/g, '') ;
		
/*******************************************************************************
		Применить стиль оформления для селектора 
*********************************************************************************/	
		if(set.selectorCss)	$this.addClass(set.selectorClass);	
	
		var box = '<div id="colorPicker-'+objID+'" class="colorPicker-box '+set.skin+'">'
		+'<div id="colorPaletteTabs-'+objID+'" class="colorPicker-palette-tabs">'
		+'<a class="active" href="#colorTab-MS">'+set.textMS+'</a><a href="#colorTab-WEB">'+set.textWEB+'</a></div>'
		+'<div id="colorPalette-'+objID+'" class="colorPicker-palette">'
		+'<div id="colorTab-MS-'+objID+'" class="colorPicker-tab MS"><code class="colorPicker-separator">&nbsp;</code>'
		+ pic
		+'<br clear="all" /><code class="colorPicker-separator">&nbsp;</code></div>'
		+'<div id="colorTab-WEB-'+objID+'" class="colorPicker-tab WEB">'
		+ pic2
		+'<br clear="all" /></div>'
		+'</div>'
		+'<div id="colorPreview-'+objID+'" class="colorPicker-preview"></div></div>';

		$('body').append(box);
		
/*******************************************************************************
		Установить значение . Выполнить заливку 'background-color'
*********************************************************************************/	
		
		bg($this,startColor);
		val(tag,$this,startColor);

/*******************************************************************************
		Переключатель палитры
*********************************************************************************/	

		$('#colorPaletteTabs-'+objID+' > a').click(function(e) {
			
			$('#colorPaletteTabs-'+objID+' > a').removeClass('active');
			$('#colorPalette-'+objID+' > div').hide();
			
			var a = $( this ) ,  tab = a.attr('href');
			
			a.addClass('active');
			$(tab+'-'+objID).show();
			
			return false ;
			
		});

/*******************************************************************************
		Работа с палитрой
*********************************************************************************/	
		 
		$('#colorTab-MS-'+objID+' > div , #colorTab-WEB-'+objID+' > div')
		.hover(
			function() {
				
				var  i = $(this) ,c = i.attr('data-color') , c = '#'+ c;
				 
				$("#colorPreview-"+objID).css('background', c );
				
				i.addClass('colorPicker-hover');
				} ,
			 function() { $(this).removeClass('colorPicker-hover')}
				
			)
		.click(function(e) {
			
				var p = $(this) , color  = p.attr('data-color') ;
				
				$this.attr('data-color',color);	
				
				$('#colorPicker-'+objID).hide();
				
			if (typeof set.onChange == 'function')	set.onChange.call(this,'#'+color,$this);
			
			bg($this,color);
			val(tag,$this,color);
		});

/*******************************************************************************
		Открытие , авто-позиционирование , подсветка цвета
*********************************************************************************/	
	
		$this.click(function(event) {
			
			$("div.colorPicker-box").hide();
			
			var position = $this.position();
			var Top = position.top;
			var Left = position.left;
			var objHeigh = $this.height();
			var objWidth = $this.width();
			var WinWidth =  $(window).width();
			var WinHeigh = $(window).height();
			var topScroll = $(window).scrollTop();
			var startColor = $this.attr('data-color');
			var colorboxWidth = $('#colorPicker-'+objID).width() ;
			var colorboxHeigh = $('#colorPicker-'+objID).height() ;
			var emptyRight = WinWidth - (Left + objWidth);
			var emptyBottom = (WinHeigh+ topScroll) - (Top + objHeigh);
			
			Top = Top + objHeigh ;
			
			if( colorboxWidth > emptyRight ) Left =  Left  + objWidth - colorboxWidth ;
			if( colorboxHeigh > emptyBottom ) Top =  Top  - objHeigh - colorboxHeigh ;

			$('#colorTab-MS-'+objID+' > div , #colorTab-WEB-'+objID+' > div')
			.removeClass('colorPicker-select')
			.each(function(index, element) {
				var obj = $(this) , c = obj.attr('data-color');
				if( startColor == c ) obj.addClass('colorPicker-select');
			}); 
			
			
			$('#colorPicker-'+objID)
			.css({
				top: Top,
				left: Left,
				display: 'block'
				
			})
			.hover(	function() {} , function() { $(this).hide()	});
			
		});

    });

  };
})( jQuery );

