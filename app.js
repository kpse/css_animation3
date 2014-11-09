; (function ($) {
    var app = {
        init: function (data) {
            var that=this;
            
            //禁止body拖动
            $("#touchcanvas").on("touchmove",function(e){
                e.stopPropagation();
                e.preventDefault();
            });

            //预加载声音
            var audioObj = document.getElementById("moonAudio");
            audioObj.onloadeddata = function(){
                $(".audio-con").show();
                audioObj.play();
            };

            touch.on('.audio-con', 'tap', function(ev){
                if($(".audio-con").hasClass("audio-con-on")){
                    //关闭声音
                    $(".audio-con").removeClass("audio-con-on").addClass("audio-con-off");
                    audioObj.pause();
                } else {
                    //播放声音
                    $(".audio-con").removeClass("audio-con-off").addClass("audio-con-on");
                    audioObj.play();
                }
            });
            if(that.browser().isIphone){
                $(".audio-con").removeClass("audio-con-on").addClass("audio-con-off");
            }

            that.initSwiper();


            //预加载后面面板图片
            // that.imgAfterCount=0;
            // var startTimeAfter = new Date().getTime();
            // for(var j=0; j<that.imgArr.length; j++){
            //     var imgAfter = new Image();
            //     imgAfter.src = 'img/'+that.imgArr[j];

            //     $(imgAfter).load(function(){
            //         that.imgAfterCount ++;
            //         if(that.imgAfterCount == that.imgArr.length){
            //             var endTimeAfter = new Date().getTime();
            //             var diffTimeAfter=endTimeAfter - startTimeAfter;
            //             console.log("后续图片预加载时间："+diffTimeAfter);
            //         }
            //     });
            // }

        },
        msg: function (txt) {
            $(".tips-box").html(txt);
            $(".tips-box").fadeIn(function () {
                setTimeout(function () {
                    $(".tips-box").fadeOut();
                },3000);
            });
        },
        orientAtion: function () {
            var windowW = $(window).width();
            var windowH = $(window).height();

            if (windowW > windowH) {
                //横屏
                $("#screenOrient").show();
            } else {
                //竖屏
                $("#screenOrient").hide();
            }
        },
        /*图片资源*/
        // imgArr:[
        //     "panel_1_bg.jpg","panel_1_fang_1.png","panel_1_txt_1.png","panel_1_txt_2.png",
        //     "panel_2_bg.jpg","panel_2_txt_1.png",
        //     "panel_3_bg.jpg","panel_3_bg2.jpg","panel_3_txt_1.png","panel_3_txt_2.png",
        //     "panel_4_bg.jpg","panel_4_bg2.jpg","panel_4_txt_1.png","panel_4_txt_2.png",
        //     "panel_5_bg.jpg","panel_5_bg2.jpg","panel_5_txt_1.png","panel_5_txt_2.png",
        //     "panel_6_bg.jpg","panel_6_bg2.jpg","panel_6_txt_1.png","panel_6_txt_2.png",
        //     "panel_7_bg.jpg","panel_7_txt_1.png","panel_7_txt_2.png","panel_7_txt_3.png","panel_7_txt_4.png",
        //     "panel_8_bg.jpg","panel_8_bg2.jpg","panel_8_txt_1.png","panel_8_txt_2.png","panel_8_dg_1.png","panel_8_dg_2.png","panel_8_dg_3.png","panel_8_dg_4.png","panel_8_dg_5.png","panel_8_dg_5.png",
        //     "panel_9_bg.jpg","panel_9_txt_1.png","panel_9_txt_2.png",
        //     "panel_11_fang_2.png","panel_11_txt_1.png","panel_11_txt_2.png","panel_11_yun_1.png","panel_11_yun_2.png",
        //     "panel_12_bg.jpg","panel_12_txt_0.jpg","panel_12_txt_1.png","panel_12_txt_2.png","panel_12_txt_3.png","panel_12_txt_4.png","panel_12_txt_5.png","panel_12_txt_6.png","panel_12_txt_7.png","panel_12_txt_8.png","panel_12_txt_9.png",
        //     "panel_13_bg.jpg","panel_13_txt_1.png",
        //     "panel_14_bg.jpg","ticket-cpk.png","ticket-ewm.png","ticket-tiket2.png","ticket-xyhd.png",
        //     "Orientatio.jpg","arrow_bottom.png","panel_0_txt_1.png","panel_0_txt_2.png","audio_on.png","audio_off.png","panel_0_bg.jpg","panel_15_bg.jpg"
        // ],
        bindEvent: function () {
            var that = this;

            that.orientAtion();
            window.onorientationchange = function () {
                that.orientAtion();
            };

            //拉链
            var windowW=$(window).width();
            var windowH=$(window).height();


              
            //下一页
            touch.on('.next', 'tap', function(ev){
                that.mySwiper.swipeNext();
            });

            //微信分享
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                        WeixinJSBridge.invoke('sendAppMessage', {
                            "title": "陕派摇滚大集结,群星呐喊长安夜!",
                            "link": "http://www.gyhdcn.com/ad/rock/index.html",
                            "desc": "2014年11月28日19：30 西安阳光丽都大剧院，我们恭候您的光临。",
                            "img_url": "http://www.gyhdcn.com/ad/rock/rock.jpg",
                            "img_width": "640",
                            "img_height": "640"
                        }, function (res) {
                            _report('send_msg', res.err_msg);
                        });
                    });
                    WeixinJSBridge.on('menu:share:timeline', function (argv) {
                        WeixinJSBridge.invoke('shareTimeline', {
                           "title": "陕派摇滚大集结,群星呐喊长安夜!",
                            "link": "http://www.gyhdcn.com/ad/rock/index.html",
                            "desc": "2014年11月28日19：30 西安阳光丽都大剧院，我们恭候您的光临。",
                            "img_url": "http://mmbiz.qpic.cn/mmbiz/gdZfuQ5zW8icZc48ibJDhr1SoWARnYfpYCibqOTTS2BbYDmwThtSvrR8fVxySL9waOUr2wAfdMaGgzJeFQLU0R6CQ/0",
                            "img_width": "640",
                            "img_height": "640"
                        }, function (res) {
                            _report('send_msg', res.err_msg);
                        });
                    });
                }, false);
            }

            //领取入场二维码
            touch.on('#getQRcode', 'tap', function(ev){
                if (window.localStorage) {
                    if (localStorage.getItem("_code_") && localStorage.getItem("_code_")!="1") {
                        $(".sign-box-one").show();
                        $(".wall-bg").animate({"left":"-72%"})
                        $(".wall").show();
                        $(".wall-arrow").show();

                        $(".wall-qr-img img").attr("src", "http://mobi.31huiyi.com/Ajax/Event/GetSignInCodeImgHandler.ashx?code=" + localStorage.getItem("_code_"));

                        //$.ajax({
                        //    url: "http://mobi.31huiyi.com/Ajax/Event/GetSignInCodeImgHandler.ashx?code=" + localStorage.getItem("_code_") + "&format=base64",
                        //    success: function (data) {
                        //        //$("#qrcode").attr("src", data);
                        //        localStorage["_img_code_"] = data;
                        //    }
                        //});
                        return false;
                    }
                }
                $(".form-box").show();
            });

            //确认提交
            touch.on('#submit', 'tap', function(ev){
                var username = $.trim($("#username").val());
                var mobile = $.trim($("#mobile").val());
                var idcard = $.trim($("#idcard").val());

                if(!username){
                    that.msg('用户不能为空');
                  $("#username").focus();
                  return;
                }
                if(!mobile){
                    that.msg('手机号不能为空');
                  $("#mobile").focus();
                  return;
                }
                if (!/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/.test(mobile)) {
                    that.msg('手机号格式不正确');
                  $("#mobile").focus();
                  return;
                }
                if(!idcard){
                    that.msg('身份证(后6位)不能为空');
                  $("#idcard").focus();
                  return;
                }
                if (idcard.length != 6) {
                    that.msg('请输入六位字符');
                  $("#idcard").focus();
                  return;
                }

                if ($("#submit").data("issubmit")) {
                    return false;
                }
                $("#submit").data("issubmit", 1);
                $("#submit").html("提交中...");

                //测试数据
                //var dataObj = {
                //    "eid": "28575",
                //    "Field_604": username,
                //    "Field_605": mobile,
                //    "Field_609": idcard
                //};

                //真实数据
                var dataObj = {
                    "eid": "393038",
                    "Field_868481": username,
                    "Field_868482": mobile,
                    "Field_868510": idcard
                };

                $.ajax({
                    url: "ajax/JoinEventNewHandler.ashx",
                    data: dataObj,
                    dataType: "json",
                    type: "post",
                    beforeSend: function () {
                    },
                    success: function (json) {
                        $("#submit").data("issubmit", 0);
                        $("#submit").attr("disabled", "disabled").html("确认提交");

                        if (json && json.successful) {
                            if (json.code == 1) {
                                if (window.localStorage) {
                                    localStorage["_code_"] = json.data;
                                }
                                $(".sign-box").show();

                                $(".sign-box-one").show();
                                $(".wall-bg").animate({"left":"-72%"})
                                $(".wall").show();
                                $(".wall-arrow").show();

                                //报名成功，生成二维码
                                $(".wall-qr-img img").attr("src", "http://mobi.31huiyi.com/Ajax/Event/GetSignInCodeImgHandler.ashx?code=" + json.data);


                                //$.ajax({
                                //    url: "http://mobi.31huiyi.com/Ajax/Event/GetSignInCodeImgHandler.ashx?code=" + json.data + "&format=base64",
                                //    success: function (data) {
                                //        //$("#qrcode").attr("src", data);
                                //        localStorage["_img_code_"] = data;
                                //    }
                                //});

                            } else if (json.code == 2) {
                                if (window.localStorage) {
                                    localStorage["_code_"] = json.data;
                                }
                                $(".sign-box").show();

                                $(".sign-box-one").show();
                                $(".wall-bg").animate({"left":"-72%"})
                                $(".wall").show();
                                $(".wall-arrow").show();
                                
                                //之前报过名，生成二维码
                                $(".wall-qr-img img").attr("src", "http://mobi.31huiyi.com/Ajax/Event/GetSignInCodeImgHandler.ashx?code=" + json.data);

                                //$.ajax({
                                //    url: "http://mobi.31huiyi.com/Ajax/Event/GetSignInCodeImgHandler.ashx?code=" + json.data + "&format=base64",
                                //    success: function (data) {
                                //        //$("#qrcode").attr("src", data);
                                //        localStorage["_img_code_"] = data;
                                //    }
                                //});

                            } else if (json.code == 4) {
                                //该会议已经过了报名截止日期
                                that.msg(json.data);
                            } else if (json.code == 5) {
                                that.msg(json.data);
                            } else if (json.code == 6) {
                                //没有找到该用户
                                $(".form-box .form").hide();
                                $(".form-box .errorBox").show();
                            }
                        }
                    },
                    error: function () {
                        alert("网络超时，请重试！");
                    }
                });
            });

            //返回
            touch.on('#back', 'tap', function(ev){
                $(".form-box .errorBox").hide();
                $(".form-box .form").show();
            });

            //保存图片
            touch.on('.sign-box .save', 'swiperight', function(ev){
                //$(".swiper-panel-12 .success-box").show();
                $(".sign-box-two").show();
                $("#imgScreen").show();
                //$(".QRCode-box img").attr("src", localStorage["_img_code_"]);

                html2canvas(document.getElementById("signBox"), {
                    //allowTaint: true,
                    //taintTest: false,
                    onrendered: function (canvas) {
                        canvas.id = "mycanvas";
                        //document.body.appendChild(canvas);
                        //生成base64图片数据
                        var dataUrl = canvas.toDataURL("image/png");
                        var newImg = document.createElement("img");
                        newImg.src = dataUrl;
                        newImg.className = "img-screen";
                        //document.getElementById("imgScreen").appendChild(newImg);
                        $("#imgScreen").html($(newImg));
                    }
                });
            });

            //滑动滚动
            touch.on('#ticket', 'swiperight', function(ev){
                that.ticketAnimate();
            });
        },
        ticketAnimate:function(){
            $(".wall").fadeOut(800);
            $(".wall-arrow").fadeOut(800);
            $(".wall-bg").animate({"left":"2.5%"},function(){
                $(".wall-bg").animate({"top":"3%"},function(){
                    $(".wall-qr-txt").animate({
                        "opacity" : "1",
                        "top" : "44%"
                    });
                    $(".wall-qr-img").fadeIn(800);
                });
            });
        },
        initSwiper: function () {
            var that = this;
            that.mySwiper = $('.swiper-pages').swiper({
                speed: 500,
                mode: 'vertical',
                keyboardControl: true,
                mousewheelControl: true,
                hashNav: true,
                onFirstInit: function (swiper) {
                    var activeIndex = swiper.activeIndex;
                    //面板第一次初始化
                    // $(".swiper-panel-1 .title2").animate({ "top": "28.91%" }, 1000);
                    // setTimeout(function () {
                    //     $(".swiper-panel-1 .title1").animate({ "top": "10.45%" }, 1000);
                    // }, 400);
                },
                onSlideChangeStart: function (swiper) {
                    var activeIndex = swiper.activeIndex;
                    that.switchAnimate(activeIndex);


                    //隐藏刮奖区
                    if (activeIndex > 0) {
                        $("#touchcanvas").hide();
                    }
                },

                /*切换层级动画*/
                progress: true,
                onProgressChange: function (swiper) {
                    for (var i = 0; i < swiper.slides.length; i++) {
                        var slide = swiper.slides[i];
                        var progress = slide.progress;
                        swiper.setTransform(slide, 'translate3d(0px,0,' + (-Math.abs(progress * 1500)) + 'px)');
                    }
                },
                onTouchStart: function (swiper) {
                    for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.setTransition(swiper.slides[i], 0);
                    }
                },
                onSetWrapperTransition: function (swiper, speed) {
                    for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.setTransition(swiper.slides[i], speed);
                    }
                }
            });


            this.bindEvent();
        },
        switchAnimate: function (index) {
            /*隐藏动画*/
            //面板0
            // $(".swiper-panel-0 .title1").css({ "top": "-47.168%" });
            // $(".swiper-panel-0 .title2").hide();

            //面板1
            $(".swiper-panel-1 .title1").css({ "top": "-28.91%" });
            $(".swiper-panel-1 .title2").css({ "top": "-42.68%" });
            $(".swiper-panel-1 .title3").css({ "bottom": "-100%" });

            //面板2
            $(".swiper-panel-2 .title1").css({ "top": "-23.3%" });
            $(".swiper-panel-2 .title2").css({ "top": "-33.7%" });
            $(".swiper-panel-2 .img2_bg").fadeIn(100);

            //面板3
            $(".swiper-panel-3 .title1").css({ "top": "-23.3%" });
            $(".swiper-panel-3 .title2").css({ "top": "-33.7%" });
            $(".swiper-panel-3 .img2_bg").fadeIn(100);

            //面板4
            $(".swiper-panel-4 .title1").css({ "bottom": "-16.6%" });
            $(".swiper-panel-4 .title2").css({ "bottom": "-16.6%" });
            $(".swiper-panel-4 .img2_bg").css({ "margin-left": "10px","opacity":"0"});

            //面板5
            $(".swiper-panel-5 .title1").css({ "bottom": "-16.6%" });
            $(".swiper-panel-5 .img2_bg0").css({"left":"-100%"});
            $(".swiper-panel-5 .title2").css({ "bottom": "-16.6%" });
            $(".swiper-panel-5 .img2_bg").hide();

            //面板6
            $(".swiper-panel-6 .title1").css({ "bottom": "-16.6%" });
            $(".swiper-panel-6 .title2").css({ "bottom": "-16.6%" });
            $(".swiper-panel-6 .img2_bg").removeClass("img2_bg_add");

            //面板7
            $(".swiper-panel-7 .title1").css({ "bottom": "-17.6%" });
            $(".swiper-panel-7 .title2").css({ "bottom": "-37.3%" });
            $(".swiper-panel-7 .img_per").css({"right":"-100%"});

            //面板8
            $(".swiper-panel-8 .title1").css({ "top": "-23.3%" });
            $(".swiper-panel-8 .title2").css({ "top": "-33.7%" });
            $(".swiper-panel-8 .img_dg_4 div").hide();
            $(".swiper-panel-8 .img_bg2").show();

            //面板9
            $(".swiper-panel-9 .title1").css({ "bottom": "-17.6%" });
            $(".swiper-panel-9 .title2").css({ "bottom": "-37.3%" });
            $(".swiper-panel-9 .img_per").css({"right":"-100%"});

            //面板10
            $(".swiper-panel-10 .title1").css({ "top": "-28.91%" });
            $(".swiper-panel-10 .title2").css({ "top": "-42.68%" });
            $(".swiper-panel-10 .title3").css({ "bottom": "-100%" })

            //面板11
            $(".swiper-panel-11 .title1").css({ "bottom": "-17.6%" });
            $(".swiper-panel-11 .title2").css({ "bottom": "-37.3%" });
            $(".swiper-panel-11 .img_per").css({"right":"-100%"});

            //面板12
            $(".swiper-panel-12 .title0").hide();
            $(".swiper-panel-12 .title1,.swiper-panel-12 .title3,.swiper-panel-12 .title5,.swiper-panel-12 .title7").css({"left":"-100%"});
            $(".swiper-panel-12 .title2,.swiper-panel-12 .title4,.swiper-panel-12 .title6").css({"right":"-100%"});

            $(".swiper-panel-12 .form-box").hide();
            $(".swiper-panel-12 .sign-box").hide();
            $(".swiper-panel-12 .success-box").hide();
            $(".swiper-panel-12 .title8").hide();
            $(".swiper-panel-12 .title9").hide();

            $("#username").val("");
            $("#mobile").val("");
            $("#idcard").val("");

            $("#imgScreen").hide();


            if ($(".success-tips-box").length && index != 12) {
                //$(".success-tips-box").remove();
                this.mySwiper.removeLastSlide();

                $(".swiper-panel-12 .arrow-bottom").hide();
            }


            //面板13
             $(".swiper-panel-13 .title1").hide();
             $(".swiper-panel-13 .title2").hide();
            
            /*电子票*/
            $(".wall").hide();
            $(".wall-bg").css({"left":"-85%","top":"30.831%"});
            $(".wall-arrow").hide();
            $(".wall-qr-txt").css({"opacity":"0","top":"38%"});
            $(".wall-qr-img").hide();


            /*显示动画*/
             switch (index) {
                 case 0:
                     //面板0
                    // $(".swiper-panel-0 .title2").fadeIn(800);
                    // setTimeout(function () {
                    //     $(".swiper-panel-0 .title1").animate({ "top": "10.5468%" }, 1000);
                    // }, 300);

                     break;
                case 1:
                    //面板1
                    $(".swiper-panel-1 .title2").animate({ "top": "20%" },1800);
                    $(".swiper-panel-1 .title3").animate({"bottom":"-1.2%"},800);
                    setTimeout(function () {
                        $(".swiper-panel-1 .title1").animate({ "top": "6%" }, 200);
                    }, 300);

                    break;
                case 2:
                    //面板2
                    $(".swiper-panel-2 .img2_bg").fadeOut(2000);
                    $(".swiper-panel-2 .title2").animate({ "top": "28.3%" }, 1000);
                    setTimeout(function () {
                        $(".swiper-panel-2 .title1").animate({ "top": "1%" }, 1000);
                    }, 100);

                    break;
                    
                    
                case 3:
                    //面板3
                    $(".swiper-panel-3 .img2_bg").fadeOut(2000);
                    $(".swiper-panel-3 .title2").animate({ "top": "28.3%" }, 1000);
                    setTimeout(function () {
                        $(".swiper-panel-3 .title1").animate({ "top": "14.8%" }, 1000);
                    }, 100);

                    break;
                case 4:
                    //面板4
                    $(".swiper-panel-4 .img2_bg").animate({ "margin-left": "0px","opacity":"1"}, 1000);
                    $(".swiper-panel-4 .title1").animate({ "bottom": "23.6%" }, 1000);
                    setTimeout(function () {
                        $(".swiper-panel-4 .title2").animate({ "bottom": "10.2%" }, 800);
                    }, 300);

                    break;
                case 5:
                    //面板5
                    $(".swiper-panel-5 .img2_bg0").animate({"left":"0%"},1000,function(){
                         $(".swiper-panel-5 .img2_bg").fadeIn(1000,function(){$(this).addClass("img2_bg_add")});  
                        });
                    $(".swiper-panel-5 .title1").animate({ "top": "8%" }, 1000);
                    setTimeout(function () {
                        $(".swiper-panel-5 .title2").animate({ "top": "16%" }, 800);
                    }, 300);

                    break;
                case 6:
                    //面板6
                    $(".swiper-panel-6 .img2_bg").addClass("img2_bg_add");
                    $(".swiper-panel-6 .title1").animate({ "bottom": "16%" }, 1000);
                    setTimeout(function () {
                        $(".swiper-panel-6 .title2").animate({ "bottom": "2%" }, 800);
                    }, 300);

                    break;
                case 7:
                    //面板7
                    $(".swiper-panel-7 .img_per").animate({ "right": "0%" }, 500);
                    $(".swiper-panel-7 .title2").animate({ "bottom": "21%" }, 1000);
                    setTimeout(function () {
                        $(".swiper-panel-7 .title1").animate({ "bottom": "5%" }, 1000);
                    }, 100);
                    break;
                case 8:
                    //面板8
                    $(".swiper-panel-8 .img_dg_4 .dg_1").fadeIn(100,function(){
                          $(this).next().fadeIn(200,function(){
                                $(this).next().fadeIn(300,function(){
                                      $(this).next().fadeIn(100,function(){
                                            $(this).next().fadeIn(400,function(){
                                                //$(".swiper-panel-8 .img_dg_4 div,.swiper-panel-8 .img_bg2").fadeOut(2000);  
                                                });
                                          });
                                    }); 
                              });
                        });
                    $(".swiper-panel-8 .title2").animate({ "top": "15.3%" }, 2000);
                    setTimeout(function () {
                        $(".swiper-panel-8 .title1").animate({ "top": "5.8%" }, 1000);
                    }, 200);
                    break;
                case 9:
                    //面板9
                    $(".swiper-panel-9 .img_per").animate({ "right": "0%" }, 500);
                    $(".swiper-panel-9 .title2").animate({ "bottom": "30%" }, 1000);
                    setTimeout(function () {
                        $(".swiper-panel-9 .title1").animate({ "bottom": "13%" }, 1000);
                    }, 100);
                    break;
                //case 10:
                //    //面板10

                //    $(".swiper-panel-10 .title1").fadeIn(1000);
                //    setTimeout(function () {
                //        $(".swiper-panel-10 .title2").fadeIn(1000);
                //    }, 600);
                //    setTimeout(function () {
                //        $(".swiper-panel-10 .title3").fadeIn(1000);
                //    }, 1000);

                //    break;
                case 10:
                    //面板11
                    $(".swiper-panel-10 .title2").animate({ "top": "0%" },1400);
                    $(".swiper-panel-10 .title3").animate({"bottom":"8%"},1000);
                    setTimeout(function () {
                        $(".swiper-panel-10 .title1").animate({ "top": "20%" }, 800);
                    }, 300);

                    break;
                case 11:
                    //面板12
                   $(".swiper-panel-11 .img_per").animate({ "right": "0%" }, 500);
                    $(".swiper-panel-11 .title2").animate({ "top": "25%" }, 1000);
                    setTimeout(function () {
                        $(".swiper-panel-11 .title1").animate({ "top": "13%" }, 1000);
                    }, 100);
                    break;
                case 12:
                    //面板13
                    $(".swiper-panel-13 .title1").fadeIn(1000, function () {
                    });
                    setTimeout(function () {
                        $(".swiper-panel-13 .title2").fadeIn(1000, function () {
                        });
                    }, 400);

                    break;
            }
        },
        browser: function () {
            var Browser = {};
            try {
                (function () {
                    var ua = navigator.userAgent.toLowerCase();
                    //alert(ua);

                    check = function (r) {
                        return r.test(ua);
                    }
                    var DOC = document;
                    Browser.isStrict = DOC.compatMode == "CSS1Compat";
                    Browser.isOpera = check(/opera/);
                    Browser.isWebKit = !Browser.isIE && check(/webkit/);
                    Browser.isIE = !Browser.isOpera && check(/msie/);
                    Browser.isIE10 = Browser.isIE && check(/msie 10/);
                    Browser.isGecko = !Browser.isSafari && check(/gecko/);
                    Browser.isGecko2 = Browser.isGecko && check(/rv:1\.8/);
                    Browser.isGecko3 = Browser.isGecko && check(/rv:1\.9/);
                    Browser.isBorderBox = Browser.isIE && !Browser.isStrict;
                    Browser.isWindows = check(/windows|win32/);
                    Browser.isMac = check(/macintosh|mac os x/);
                    Browser.isAir = check(/adobeair/);
                    Browser.isLinux = check(/linux/);
                    Browser.isIpad = check(/ipad/);
                    Browser.isIpadFull = false;
                    Browser.isIphone = check(/iphone/);
                    Browser.isAndroid = check(/android/);
                    Browser.isSecure = /^https/i.test(window.location.protocol);

                    if (Browser.isAndroid || Browser.isIphone) {
                        Browser.isMobile = true;
                    }
                    if (Browser.isAndroid || Browser.isIphone || Browser.isIpad) {
                        Browser.isTouchFlat = true;
                    }
                })();
            } catch (e) { }
            return Browser;
        }
    };


    app.init();

})(jQuery);