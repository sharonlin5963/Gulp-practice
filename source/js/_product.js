$(function() {
    //bootstrap carousel
    $('.carousel').carousel({
        pause: false
    });
    //商品選單下拉
    function btnOpen(target, btnClass) {
        $(target).mouseenter(function() {
            if (!$('.nav-menu').hasClass('menuOpen')) return $(target).addClass(btnClass);
        })
        $(target).mouseleave(function() {
            $(target).removeClass(btnClass);
        })
    }

    btnOpen('.productList', 'allItemOpen');
    btnOpen('#homeDecoration', 'dropdownOpen');
    btnOpen('#light', 'dropdownOpen');

    // ≡ 商品目錄開啟
    $('.nav_bar').on('click', function() {
        $('.nav-menu').toggleClass('menuOpen');

        if ($('.nav-menu').hasClass('menuOpen')) {
            $('.nav_member a').html('會員登入');
            $('.nav_bar').html('×');
            return;
        }
        $('.nav_bar').html('≡');
    })

    //.fixBtn
    // $('.fixBtn').hide()
    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) return $('.fixBtn').css('display', 'flex');
        $('.fixBtn').hide()
    })

    $('.fixBtn').on('click', function() {
        $('body,html').stop().animate({ scrollTop: 0 });
    });
    //結帳去btn
    $('.goCheckout').on('click', function() {
        var scrollTop = $('.orderInfo').offset().top
        $('body,html').stop().animate({ scrollTop: scrollTop });
    })

    //.quantity+-數量
    var add = $('.add')
    var minus = $('.minus')
    var value = $('.value')
    var i = 1

    function operation(num_var) {
        i = i + num_var;
        if (i < 1) {
            i = 1
        }
        value.val(i);
    }
    add.on('click', function() {
        operation(1);
    })
    minus.on('click', function() {
        operation(-1);
    })

    //已加入圖示
    $('.buy').on('click', function() {
        $('.bought').fadeIn();
        value.val(1);
        setTimeout(function() {
            $('.bought').fadeOut()
        }, 1500);
    })

    //login
    $('.loginBtn').on('click', function() {
        var account = $('#account')
        var password = $('#password')
        var emailReg = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/;
        var passwordReg = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
        // 至少1個小寫英文字母，(?=.*?[a-z])
        // 至少1位數字，(?=.*?[0-9])
        // 最小8個長度.{8,}
        function fail(reason) {
            $('#fail').addClass('fail');
            $('#fail').text(reason);
        }

        if (account.val() === '' || password.val() === '') return fail('帳號及密碼不得為空白');
        if (!emailReg.test(account.val())) return fail('請輸入正確的Email格式');
        if (!passwordReg.test(password.val())) return fail('帳號或密碼輸入錯誤');

        account.val('');
        password.val('');
        alert('登入成功');
        window.location.href = '../../public/html/index.html';

    })

})