
import WebFont from "webfontloader";

export function loadLectureResources() {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = 'assets/lecture_admin/img/kaiadmin/favicon.ico';
    document.head.appendChild(favicon);

    const script = document.createElement('script');
    script.src = 'assets/lecture_admin/js/plugin/webfont/webfont.min.js';
    script.onload = () => {
        WebFont.load({
            google: { families: ['Public Sans:300,400,500,600,700'] },
            custom: {
                families: [
                    'Font Awesome 5 Solid',
                    'Font Awesome 5 Regular',
                    'Font Awesome 5 Brands',
                    'simple-line-icons',
                ],
                urls: ['assets/lecture_admin/css/fonts.min.css'],
            },
            active: function () {
                sessionStorage['fonts'] = true; 
            },
        });
    };
    document.body.appendChild(script);

    const cssFiles = [
        'assets/lecture_admin/css/bootstrap.min.css',
        'assets/lecture_admin/css/plugins.min.css',
        'assets/lecture_admin/css/kaiadmin.min.css',
        'assets/lecture_admin/css/demo.css'
    ];

    cssFiles.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    });

    // Core JS Files
    const coreScripts = [
        'assets/lecture_admin/js/core/jquery-3.7.1.min.js',
        'assets/lecture_admin/js/core/popper.min.js',
        'assets/lecture_admin/js/core/bootstrap.min.js',
        'assets/lecture_admin/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js',
        'assets/lecture_admin/js/plugin/chart.js/chart.min.js',
        'assets/lecture_admin/js/plugin/jquery.sparkline/jquery.sparkline.min.js',
        'assets/lecture_admin/js/plugin/chart-circle/circles.min.js',
        'assets/lecture_admin/js/plugin/datatables/datatables.min.js',
        'assets/lecture_admin/js/plugin/bootstrap-notify/bootstrap-notify.min.js',
        'assets/lecture_admin/js/plugin/jsvectormap/jsvectormap.min.js',
        'assets/lecture_admin/js/plugin/jsvectormap/world.js',
        'assets/lecture_admin/js/plugin/sweetalert/sweetalert.min.js',
        'assets/lecture_admin/js/kaiadmin.min.js',
        'assets/lecture_admin/js/setting-demo.js',
        'assets/lecture_admin/js/demo.js'
    ];

    coreScripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        document.body.appendChild(script);
    });

    // Đợi cho các script tải xong trước khi thực hiện biểu đồ
    // Promise.all(coreScripts.map(src => new Promise((resolve) => {
    //     const script = document.createElement('script');
    //     script.src = src;
    //     script.onload = resolve;
    //     document.body.appendChild(script);
    // }))).then(() => {
    //     // Khởi tạo các biểu đồ Sparkline
    //     $("#lineChart").sparkline([102, 109, 120, 99, 110, 105, 115], {
    //         type: "line",
    //         height: "70",
    //         width: "100%",
    //         lineWidth: "2",
    //         lineColor: "#177dff",
    //         fillColor: "rgba(23, 125, 255, 0.14)",
    //     });

    //     $("#lineChart2").sparkline([99, 125, 122, 105, 110, 124, 115], {
    //         type: "line",
    //         height: "70",
    //         width: "100%",
    //         lineWidth: "2",
    //         lineColor: "#f3545d",
    //         fillColor: "rgba(243, 84, 93, .14)",
    //     });

    //     $("#lineChart3").sparkline([105, 103, 123, 100, 95, 105, 115], {
    //         type: "line",
    //         height: "70",
    //         width: "100%",
    //         lineWidth: "2",
    //         lineColor: "#ffa534",
    //         fillColor: "rgba(255, 165, 52, .14)",
    //     });
    // });
}
