    var shareArr = ['','','',''];
    var clickEvent = 'touchstart';
    var web_path = 'http://mobi.31huiyi.com/140617dg0026/';
    var ptn_mobi = /^1[3,4,5,8]{1}[0-9]{9}$/i;
    var ptn_num=/^[0-9]{1,20}$/;
    var localUrl = window.location.href;
    checkMobile() ? clickEvent = 'touchstart' : clickEvent = 'click';
    localUrl.indexOf('http://mobi.31huiyi.com/140617dg0026/')!=-1 ? web_path=web_path : web_path='http://mobi.31huiyi.com/';
    var pointX = 0;
    var pointY = 0;
    var totalP = 5;
    var currP = 1;
    var prevP = 0;
    var nextP = 0;
    var winW = $(window).width();
    var winH = $(window).height();
    var canTouch = true;
    var currP_s = 1;
    var totalP_s = 3;
    var hasDir = false;

    var canvas_config = {
        fillColor:"#898989",
        cover_txt:"刮刮看",
        cover_txt_color:"#000",
        radius:25,
        oval_r:10,
        width:winW,
        height:winH
    };
    var eventName = {
        "m":{"s":"touchstart","m":"touchmove","e":"touchend"},
        "pc":{"s":"mousedown","m":"mousemove","e":"mouseup"}
    }
    var e = "ontouchstart" in document ? eventName.m : eventName.pc;
    var OS = (function(){
        var u = navigator.userAgent,platform = '';
        if(u.indexOf('iPhone') > -1) platform = 'iphone';
        if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) platform = 'Android';
        return platform;
    })();
    var ctx,c;

    init();
    function init(){
        shareArr[0] = 'Welcome HOME';
        shareArr[1] = '7.16 重新定义家庭';
        shareArr[2] = window.location.href;
        shareArr[3] = 'http://'+window.location.host+web_path+'images/share.jpg';
        $('.wrap').height(winH);
        $('.cont,.sub_cont,.share').height(winH);
        $('.section1').addClass('current');
        if (canvas_supportDetect()) {
            //图片预加载
            var img = new Image();
            img.src = "img/mask_bg.jpg";
            img.onload = function () {
                $("#img").attr("src", 'img/mask_bg.jpg');
                init_canvas();
            };

            init_canvas();
        }
        $('.btn_share').on('click',function(){
            $('.share').show();
        });
        $('.share .img').on('click',function(){
            $('.share').hide();
        });
        $('body').on(clickEvent,function(){
            $('.img_hand').hide();
        });
        // alert($(window).width())
        // alert($('body').width())
        // alert($('.wrap').width())
    }
    function touchEvents(){
        $('.div').show();
        args={
            iniAngle:15,
            speed: 300,
            sCallback:function(tPoint){
            },
            mCallback:function(tPoint){
                // console.info(tPoint);
                var _mx = tPoint.mX;
                var _my = tPoint.mY;
                /*if(tPoint.direction == 'left'){
                    if(currP != 2) return;
                    hasDir = true;
                    var scale = 1 - Math.abs(Math.abs(_mx)*0.2/$(window).width());
                    if(currP_s == totalP_s){
                        nextP = 1;
                    }else{
                        nextP = currP_s + 1;
                    }
                    console.log(currP_s,winW)
                    $('.sub_cont').removeClass('sub_curr sub_next').eq(currP_s-1).addClass('sub_curr');
                    $('.sub_cont').eq(nextP-1).css({'-webkit-transform':'translate('+winW+'px,0'}).addClass('sub_next');
                    $('.sub_cont').eq(currP_s-1).css({'-webkit-transform':'scale('+scale+') translate('+_mx/5+'px,0)'});
                    $('.sub_cont').eq(nextP-1).css({'-webkit-transform':'translate('+(winW+_mx/3)+'px,0)'});
                    return;
                }else if(tPoint.direction == 'right'){
                    if(currP != 2) return;
                    hasDir = true;
                    var scale = 1 - Math.abs(Math.abs(_mx)*0.2/$(window).width());
                    if(currP_s == 1){
                        nextP = totalP_s;
                    }else{
                        nextP = currP_s - 1;
                    }
                    $('.sub_cont').removeClass('sub_curr sub_next').eq(currP_s-1).addClass('sub_curr');
                    $('.sub_cont').eq(nextP-1).css({'-webkit-transform':'translate(-'+winW+'px,0'}).addClass('sub_next');
                    $('.sub_cont').eq(currP_s-1).css({'-webkit-transform':'scale('+scale+') translate('+_mx/5+'px,0)'});
                    $('.sub_cont').eq(nextP-1).css({'-webkit-transform':'translate(-'+(winW+_mx/3)+'px,0)'});
                    return;
                }*/
                if(hasDir) return;
                if(!canTouch) return;
                var _dir = 'up';
                var scale = 1 - Math.abs(Math.abs(_my)*0.2/$(window).height());
                if(_my > 0) _dir = 'down';
                if(_dir == 'up'){
                    if(currP == totalP){
                        nextP = 1;
                    }else{
                        nextP = currP + 1;
                    }
                    prevP = currP - 1;
                }else{
                    if(currP == 1){
                        nextP = totalP;
                    }else{
                        nextP = currP - 1;
                    }
                    prevP = currP + 1;
                }
                $('.cont').removeClass('current currentN');
                $('.section'+currP).addClass('current');

                if(_dir == 'up'){
                    if(currP == totalP) {return;}
                    $('.section'+prevP).css({'-webkit-transform':'-'+winH+'px'});
                    $('.section'+nextP).css({'-webkit-transform':winH+'px'}).addClass('currentN');
                    $('.section'+currP).css({'-webkit-transform':'scale('+scale+') translate(0,'+_my/5+'px)'});
                    $('.section'+nextP).css({'-webkit-transform':'translate(0,'+(winH+_my/2)+'px)'});
                }else{
                    if(currP == 1) {return;}
                    $('.section'+prevP).css({'-webkit-transform':winH+'px'});
                    $('.section'+nextP).css({'-webkit-transform':'-'+winH+'px'}).addClass('currentN');
                    $('.section'+currP).css({'-webkit-transform':'scale('+scale+') translate(0,'+_my/5+'px)'});
                    $('.section'+nextP).css({'-webkit-transform':'translate(0,-'+(winH-_my/2)+'px)'});
                }
            },
            eCallback:function(tPoint){
                // console.info(tPoint);
                var _mx = tPoint.mX;
                var _my = tPoint.mY;
                /*if(tPoint.direction == 'left'){
                    console.log(currP_s)
                    if(Math.abs(_mx) < 100){
                        $('.sub_cont').eq(currP_s-1).css({'-webkit-transform':'scale(1) translate(0,0)'});
                        $('.sub_cont').eq(nextP-1).css({'-webkit-transform':'translate('+winW+'px,0)'});
                    }else{
                        $('.sub_cont').eq(currP_s-1).css({'-webkit-transform':'scale(0.7) translate(-150px,0)'});
                        $('.sub_cont').eq(nextP-1).css({'-webkit-transform':'translate(0,0)'});
                        currP_s += 1;
                        if(currP_s > totalP_s) {currP_s = 1}
                        setTimeout(function(){
                            $('.sub_cont').css({'-webkit-transform':'','-webkit-transition':''});
                            hasDir = false;
                        },300);
                    }
                    $('.sub_cont').css({'-webkit-transition':'all .3s'});
                    canTouch = true;
                    return;
                }else if(tPoint.direction == 'right'){
                    if(Math.abs(_mx) < 100){
                        $('.sub_cont').eq(currP_s-1).css({'-webkit-transform':'scale(1) translate(0,0)'});
                        $('.sub_cont').eq(nextP-1).css({'-webkit-transform':'translate(-'+winW+'px,0)'});
                    }else{
                        $('.sub_cont').eq(currP_s-1).css({'-webkit-transform':'scale(0.7) translate(150px,0)'});
                        $('.sub_cont').eq(nextP-1).css({'-webkit-transform':'translate(0,0)'});
                        currP_s -= 1;
                        if(currP_s < 1) {currP_s = totalP_s}
                        setTimeout(function(){
                            $('.sub_cont').css({'-webkit-transform':'','-webkit-transition':''});
                            hasDir = false;
                        },300);
                    }
                    $('.sub_cont').css({'-webkit-transition':'all .3s'});
                    canTouch = true;
                    return;
                }*/
                if(hasDir) return;
                var _dir = 'up';
                if(_my > 0) _dir = 'down';
                if((_dir == 'down' && currP == 1) || (_dir == 'up' && currP == totalP)) {
                    canTouch = true;
                    return;
                }else{
                    if(!canTouch) return;
                    canTouch = false;
                }
                if(Math.abs(_my) < 100){
                    if(_dir == 'up'){
                        $('.section'+currP).css({'-webkit-transform':'scale(1) translate(0,0)'});
                        $('.section'+nextP).css({'-webkit-transform':'translate(0,'+winH+'px)'});
                    }else{
                        if(currP == 1) {
                            return;
                        }
                        $('.section'+currP).css({'-webkit-transform':'scale(1) translate(0,0)'});
                        $('.section'+nextP).css({'-webkit-transform':'translate(0,-'+winH+'px)'});
                    }
                    canTouch = true;
                }else{
                    if(_dir == 'up'){
                        $('.section'+currP).css({'-webkit-transform':'scale(0.7) translate(0,-300px)'});
                        $('.section'+nextP).css({'-webkit-transform':'translate(0,0)'});
                        currP += 1;
                        if(currP == totalP) {$('.u-arrow').html('');}
                        if(currP > totalP) {currP = 1;}
                    }else{
                        if(currP == 1) {
                            return;
                        }
                        $('.section'+currP).css({'-webkit-transform':'scale(0.7) translate(0,300px)'});
                        $('.section'+nextP).css({'-webkit-transform':'translate(0,0)'});
                        currP -= 1;
                        if(currP < 1) {currP = totalP}
                    }
                    setTimeout(function(){
                        $('.cont').css({'-webkit-transform':'','-webkit-transition':''});
                        canTouch = true;
                    },300);
                }
                $('.cont').css({'-webkit-transition':'all .3s'});
            }
        }
    }

    function canvas_supportDetect(){
        try{
            document.createElement('canvas').getContext('2d');
        }catch(e){
            var addDiv = document.createElement('div');
            alert('您的浏览器不支持刮刮卡效果哦~~请使用高级浏览器进行浏览^_^');
            return false;
        }
        return true;
    }
    function init_canvas(){
        c = $("canvas")[0];
        ctx = c.getContext('2d');
        c.w = canvas_config.width || $(".card").width();
        c.h = canvas_config.height || $(".card").height();
        $("canvas").attr("width",c.w)
        $("canvas").attr("height",c.h);
        canvas_fillCover();
        eventInit();
    }
    function eventInit(){
        $(".btn_again").click(
            function(){
                canvas_fillCover();
            }
        )
        canvas_initEvent();
    }
    function canvas_fillCover(){
        ctx.beginPath();
        var img = document.getElementById("img");

        if ($(window).height() > 420) {
            ctx.drawImage(img, 0, 0, $(".card").width(), $(".card").height());
        } else {
            ctx.drawImage(img, 0, -84, $(".card").width(), $(".card").height() + 84);
        }

    }
    function scratch(x, y){
        // ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle  = canvas_config.fillColor;
        ctx.beginPath();
        ctx.arc(x, y, canvas_config.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x, y);
        // ctx.restore();
    }
    function canvas_initEvent(){
        c.addEventListener(e.s,function(e){
            c.isDrawing = true;
            if(OS == 'Android'){
                var x = e.changedTouches[0].pageX - $(".card").offset().left;
                var y = e.changedTouches[0].pageY - $(".card").offset().top ;
                $("canvas").css('margin-right', $("canvas").css('margin-right') == "0px" ? "1px" : "0px");
            }else{
                var x = e.pageX - $(".card").offset().left;
                var y = e.pageY - $(".card").offset().top;
            }
            scratch(x,y);
            e.preventDefault();
        },true);
        c.addEventListener(e.e,function(e){
            c.isDrawing = false;
            e.preventDefault();
            //判断刮开区域多少
            var _w = canvas_config.width;
            var _h = canvas_config.height;
            mousedown = false;
            var data=ctx.getImageData(0,0,_w,_h).data;
            for(var i=0,j=0;i<data.length;i+=4){
                if(data[i] && data[i+1] && data[i+2] && data[i+3]){
                    j++;
                }
            }
            if(j<=_w*_h*0.6){
                //$('#card').remove();
                $("#touchcanvas").fadeOut(800,function(){
                    $(this).remove();
                });

                setTimeout(function(){
                    touchEvents();
                },200);
            }
        },true);
        var now =0;
        var old_x =0;
        c.addEventListener(e.m,function(e){
            if(!c.isDrawing) {
                return;
            }
            if(OS == 'Android'){
                var x = e.changedTouches[0].pageX - $(".card").offset().left;
                var y = e.changedTouches[0].pageY - $(".card").offset().top ;
                $("canvas").css('margin-right', $("canvas").css('margin-right') == "0px" ? "1px" : "0px");
            }else{
                var x = e.pageX - $(".card").offset().left;
                var y = e.pageY - $(".card").offset().top;
            }
            // scratch(x,y);
            ctx.lineWidth = canvas_config.radius*2;
            ctx.lineTo(x, y);
            ctx.stroke();
            e.preventDefault();
        },true);
    }

    function checkInput(){
        $(".inputFocus").focus(function(){
            if($(this).val()==this.defaultValue){
                $(this).val("");
            }
        }).blur(function(){
            if($(this).val()==''){
                $(this).val(this.defaultValue);
            }
        });
    }
    function checkMobile() {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.indexOf('ipad') != -1 || ua.indexOf('iphone os') != -1 || ua.indexOf('android') != -1) {
            return true;
        }else {
            return false;
        }
    }
    function is_weixin(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    }