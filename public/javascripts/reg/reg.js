$(function(){
  $("#username").focus(function(){
     $("#username").val("");
  });
  $("#username").blur(function() {
     if($("#username").val() == ""){
        $("#username").val("Enter your name here");
     } else{
     // add ajax event to check the username is already registered or not.
	$.ajax({
	  type: "POST",
	  url: "/checkusername",
	  data: {username:$("#username").val()},
          dataType:"json"
	}).done(function(msg){
           console.log(msg);
           console.log(msg.success);
	   $("#userPro").removeClass("alert alert-success");
	   $("#userPro").removeClass("alert alert-warning");
	   $("#userPro").text("");
           if(!msg.success){
		$("#userPro").addClass("alert alert-warning");
		$("#userPro").text("The username already be used");
           }else{
		$("#userPro").addClass("alert alert-success");
		$("#userPro").text("OK,the username can be used");
	   }
        });
    }
  });
  
  $("#password").focus(function(){
    
  });
  $( "#password").blur(function(){
    var pass = $("#password").val();
    var strength = 1;
    var arr = [/.{6,}/, /[a-z]+/, /[0-9]+/, /[A-Z]+/];
    jQuery.map(arr, function(regexp) {
      if(pass.match(regexp)){
       strength++;  
       //console.log("match:"+regexp);      
      }
    });
    console.log(strength);
    //check the password whether or strong or not.
    if(strength<5){
	$("#password").popover({
		trigger:'manual',
		title:'password rule:',
		content:"Please check your password format,you should must have at least one digital number,one capital charator,one small charator and the password length must bigger than 6."
	});
        $("#password").popover("show");
    }else{
        $("#password").popover("hide");
	$("#passPro").addClass("alert alert-success");
	$("#passPro").text("OK,enough strong.");
    }
     
  });

  $("#passwordrepeat").blur(function(){
     //check if the repeat password match the the password or not
     var pass = $("#password").val();
     var repass = $("#passwordrepeat").val();
     $("#rePassPro").removeClass("alert alert-warnning");
     $("#rePassPro").removeClass("alert alert-success");  
     if(pass!=repass){
   	$("#rePassPro").addClass("alert alert-warnning");
	$("#rePassPro").text("The password are not same.");
     }else{
	$("#rePassPro").addClass("alert alert-success");
	$("#rePassPro").text("OK,the passwords are same.");
	$('#register').prop('disabled', false);
     }
  });
  $("#passwordrepeat").focus(function(){
     
  });
});
