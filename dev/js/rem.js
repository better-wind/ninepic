(function(){
    function RemInit(){
        var dpr, rem, scale;
        var docEl = window.document.documentElement;
        var metaEl = window.document.querySelector('meta[name="viewport"]');
        var psdWidth = 640/100;
        dpr = window.devicePixelRatio || 1;
        dpr = 1;
        rem = docEl.clientWidth * dpr / psdWidth;
        docEl.style.fontSize = Math.round(rem) +'px'
        docEl.setAttribute('data-dpr', dpr);
        scale = 1 / dpr;
        metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
        window.dpr = dpr;
        window.rem = rem;
        window.addEventListener('resize',function(){
            rem = docEl.clientWidth * dpr / psdWidth;
            docEl.style.fontSize = Math.round(rem) +'px'
        })
    }
    RemInit();
})()