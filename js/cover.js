window.tym={};
tym.view={};
tym.view.Currency=(function(){
	var tut=this;
	tut.val=arguments.length?arguments[0]:"RUB";
	tut.arr={
		"RUB":"<i class=\"fa fa-ruble\"></i>"
		,"USD":"<i class=\"fa fa-dollar\"></i>"
		,"EUR":"<i class=\"fa fa-euro\"></i>"
	};
	tut.toString=function(){
		return tut.arr[tut.val];
	}
});
tym.view.Amount=(function(){
	var tut=this;
	var args=arguments.length?arguments[0]:"0";
	tut.data={
		"+":"<i class=\"fa fa-caret-up green\"></i>"
		,"-":"<i class=\"fa fa-caret-down red\"></i>"
	};
	tut.integer=null;
	tut.fractional=null;
	tut.currency=null;
	tut.direct=null;
	tut.toString=function(){
		return tut.currency.toString()
			+"&nbsp;"+tut.integer.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&thinsp;')
			+"."+tut.fractional
			+ '&nbsp;'+tut.data[tut.direct.symbol]+'&nbsp;<span class="small">'+(100*tut.direct.amount/tut.direct.balance).toFixed(2)+'%</span>';
	}
	var ams=args.replace(/,/im,".").split(/[\+\-]/);
	var arr=ams[0].split(/\./);
	tut.currency=new tym.view.Currency(arr[0].substr(0,3));
	tut.integer=arr[0].substr(3);
	tut.fractional=(arr.length>1)?arr[1]:0;
	tut.direct={
		symbol:args.substr(ams[0].length,1)
		,amount:parseFloat(ams[1])
		,balance:parseFloat(tut.integer+'.'+tut.fractional)
	};
});
$(function(){
	$(".merchant-category").click(function(){
		$(this).find("a").click();
	});
	$(".amount").each(function(){
		var amnt=new tym.view.Amount($(this).text());
		$(this).html(amnt.toString());
	});
	$('.account .name .name').append('<a href="#">&nbsp;<i class="fa fa-pencil"></i></a>').click(function() {
		var text=$(this).text();
		$(this).attr('data-text',text).html('<input type="text" class="new_name" value="'+text+'"/>').find('input').focus();
	});
	$('body').on('blur', '.new_name', function(e) {
		var new_val=$(this).val() || $(this).parent().attr('data-text');
		$(this).parent().html(new_val+'&nbsp<a href="#">&nbsp;<i class="fa fa-pencil"></i></a>');
	});
	$('.body').on('blur','.template',function(){
		$('.template').removeClass('selected');
	});
	$('.template,.account').on('click',function(){
		$(this).parent('.content').find('.template,.account').removeClass('selected');
		$(this).addClass("selected");
		$(this).focus();
	});
	$('.view-style').on('click',function(){
		if($(this).hasClass("iconset")){
			$(this).removeClass("iconset")
				.addClass("listset")
				.find('i.fa-square-o').removeClass("fa-square-o").addClass("fa-list");
			$(this).closest(".cabinet-box").find(".account").removeClass("account").addClass("template");
		}
		else if($(this).hasClass("listset")){
			$(this).removeClass("listset").addClass("iconset");
			$(this).find('i.fa-list').removeClass("fa-list").addClass("fa-square-o");
			$(this).closest(".cabinet-box").find(".content .template").removeClass("template").addClass("account");
		}
	});
	$('.view-slide').on('click',function(){
		if($(this).hasClass("showed")){
			$(this).removeClass("showed");
			$(this).find('.fa-caret-up').removeClass("fa-caret-up").addClass("fa-caret-down");
			$(this).closest(".cabinet-box").find(".title,.content").slideUp();
		}
		else{
			$(this).addClass("showed").find('.fa-caret-down').removeClass("fa-caret-down").addClass("fa-caret-up");
			$(this).closest(".cabinet-box").find(".title,.content").slideDown();
		}
	});
	$('.view-fulls').on('click',function(){
		var tut=$(this);
		var box=$(this).closest(".cabinet-box");
		if(box.hasClass("fullsize")){
			box.removeClass("fullsize");
			tut.find('.fa-expand').removeClass("fa-expand").addClass("fa-compress");
		}
		else{
			box.addClass("fullsize");
			tut.find('.fa-compress').removeClass("fa-compress").addClass("fa-expand");
		}
	});
});