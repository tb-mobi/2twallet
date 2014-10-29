window.tym={};
tym.view={};
tym.view.Amount=(function(){
	var tut=this;
	var args=arguments.length?arguments[0]:"0";
	tut.integer=null;
	tut.fractional=null;
	tut.toString=function(){
		return tut.integer.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&thinsp;')+"."+tut.fractional;
	}
	var arr=args.replace(/,/im,".").split(/\./);
	tut.integer=arr[0];
	tut.fractional=(arr.length>1)?arr[1]:0;
});
$(function(){
	$(".merchant-category").click(function(){
		$(this).find("a").click();
	});
	$(".amount").each(function(){
		var amnt=new tym.view.Amount($(this).text());
		$(this).html(amnt.toString()+'&nbsp;<a href="#" class="eye-hide"><i class="fa fa-eye-slash"></i></a>');
	});
});