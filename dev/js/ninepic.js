(function(){
    var NineModule = {
        init:function(){
            var self = this;
            self.J_nineWrap = document.querySelector('#nineWrap');
            self.J_pic_wrap = document.querySelectorAll('.pic-wrap');
            self.J_countMove = document.querySelector('#countMove');
            self.J_sumbitBt = document.querySelector('#sumbitBt');
            self.J_ciewImg = document.querySelector('#ciewImg');
            self.J_refreshBt = document.querySelector('#refreshBt');
            self.J_count = 0;
            self.initNinePic();
            self.initRandomBackgroundFontColor();
            self.eventHanding();
        },
        initNinePic:function(){
            var self = this,
                shufflearr,
                imgrodom = Math.floor((Math.random())*5+1),
                _html = '';
            self.oriArr=[1,2,3,4,5,6,7,8];
            for(var n = 0,m = self.oriArr.length;n<m;n++){
                _html += '<div class="pic-wrap pic-wrap'+(self.oriArr[n]-1)+'" data-id="'+(self.oriArr[n]-1)+'"></div>'
            }
            self.J_nineWrap.innerHTML = _html;
            self.J_pic_wrap = document.querySelectorAll('.pic-wrap');
            Array.prototype.shuffle = function(n){
                var len = this.length,num = n ? Math.min(n,len) : len,index,
                    arr = this.slice(0),temp,
                    lib = {};
                lib.range = function(min,max){
                    return min + Math.floor(Math.random()*(max-min+1))
                }
                for(var i =0;i<len;i++){
                    index = lib.range(i,len-1);
                    temp = arr[i];
                    arr[i] = arr[index];
                    arr[index] = temp;
                }
                return arr.slice(0,num);
            }
            shufflearr = self.oriArr.shuffle();
            self.successShuffle = shufflearr;
            for(var i = 0,j=self.J_pic_wrap.length;i<j;i++){
                self.J_pic_wrap[i].style.background = 'url("./dev/image/pic'+imgrodom+'.jpg") no-repeat -'+Math.floor((shufflearr[i]%3+2)%3)*2+'rem -'+Math.floor((shufflearr[i]-1)/3)*2+'rem/6rem 6rem'
                self.J_pic_wrap[i].setAttribute('shuffle-id',shufflearr[i]);
            }
            self.J_ciewImg.setAttribute('src','./dev/image/pic'+imgrodom+'.jpg');
            self.J_count = -1;
            self.countAdd();
        },
        eventHanding:function(){
            var self = this;
            self.ninePicMove();
            self.J_sumbitBt.addEventListener('click',function(){
                self.sumbitNinePic();
            },false)
            self.J_refreshBt.addEventListener('click',function(){
                self.initNinePic();
            },false)

        },
        initRandomBackgroundFontColor:function(){
            var self = this;

        },
        randomColor:function(){
            return '#' + ('00000' + ((Math.random()+1) * 0xAAAAAA << 0).toString(16)).slice(-6);
        },
        ninePicMove:function(){
            var self = this;
            var x_start,x_end,y_start,y_end,current;
            for(var i = 0,j=self.J_pic_wrap.length;i<j;i++){
                self.J_pic_wrap[i].addEventListener('touchstart',function(e){
                    e.preventDefault();
                    x_start = e.changedTouches[0].clientX;
                    y_start = e.changedTouches[0].clientY;
                    current = this.getAttribute('data-id');
                },false)
                self.J_pic_wrap[i].addEventListener('touchend',function(e){
                    e.preventDefault();
                    x_end = e.changedTouches[0].clientX;
                    y_end = e.changedTouches[0].clientY;
                    self.currentMove(x_end-x_start,y_end-y_start,current);
                },false)
            }
        },
        countAdd:function(){
            var self = this;
            self.J_countMove.innerText = ++self.J_count;
        },
        currentMove:function(x,y,index){
            var self = this,_move,_edge = 20;
            var moveobj = self.checkMove(index);
            if(Math.abs(x) >= Math.abs(y)){
                if(x>0 && Math.abs(x) > _edge){
                    _move = 'right';
                }else if(x<0 && Math.abs(x) > _edge){
                    _move = 'left';
                }
            }
            else{
                if(y>0 && Math.abs(y) > _edge){
                    _move = 'bottom';
                }else if(y<0 && Math.abs(y) > _edge){
                    _move = 'top';
                }
            }
            if(moveobj[_move]){
                self.moveActive(_move,index);
            }
        },
        checkMove:function(index){
            var self = this,obj={
                    left:true,
                    right:true,
                    top:true,
                    bottom:true
                },
                setTop = self.J_pic_wrap[index].offsetTop,
                setLeft = self.J_pic_wrap[index].offsetLeft,
                setWidth = self.J_pic_wrap[index].offsetWidth,
                setHeight = self.J_pic_wrap[index].offsetHeight,
                _left,
                _top,
                _width,
                _height,
                edge_left = 0,
                edge_right = self.J_nineWrap.offsetWidth,
                edge_top = 0,
                edge_bottom = self.J_nineWrap.offsetHeight;
            for(var i= 0,j=self.J_pic_wrap.length;i<j;i++){
                _left = self.J_pic_wrap[i].offsetLeft;
                _top = self.J_pic_wrap[i].offsetTop;
                _width = self.J_pic_wrap[i].offsetWidth;
                _height = self.J_pic_wrap[i].offsetHeight;
                if(setLeft == edge_left ||( _top == setTop && _left+_width == setLeft )){
                    obj.left = false;
                }
                if(setLeft+setWidth == edge_right ||  (_top == setTop && _left == setLeft+setWidth)){
                    obj.right = false;
                }
                if(setTop == edge_top || (_left == setLeft && _top+_height == setTop)){
                    obj.top = false;
                }
                if(setTop+setHeight == edge_bottom ||( _left == setLeft && _top == setTop+setHeight)){
                    obj.bottom = false;
                }
            }
            return obj;
        },
        moveActive:function(active,index){
            var self = this,
                setTop = self.J_pic_wrap[index].offsetTop,
                setLeft = self.J_pic_wrap[index].offsetLeft,
                setWidth = self.J_pic_wrap[index].offsetWidth,
                setHeight = self.J_pic_wrap[index].offsetHeight;
            if(active == 'right'){
                self.J_pic_wrap[index].style.left = setLeft+setWidth+'px';
            }
            if(active == 'left'){
                self.J_pic_wrap[index].style.left = setLeft-setWidth+'px';
            }
            if(active == 'top'){
                self.J_pic_wrap[index].style.top = setTop-setHeight+'px';
            }
            if(active == 'bottom'){
                self.J_pic_wrap[index].style.top = setTop+setHeight+'px';
            }
            self.countAdd();
        },
        sumbitNinePic:function(){
            var self = this,currentObj={},sign,currentkeyarr = [],key;
            for(var i= 0,j=self.J_pic_wrap.length;i<j;i++){
                currentObj[self.J_pic_wrap[i].offsetLeft + self.J_pic_wrap[i].offsetTop*10] = self.J_pic_wrap[i].getAttribute('shuffle-id')
            }
            for(key in currentObj){
                if(currentObj.hasOwnProperty(key)){
                    currentkeyarr.push(parseInt(currentObj[key]));
                }
            }
            if(currentkeyarr.toString() == self.oriArr.toString()){
                self.initNinePic();
            }else{
                alert('瞎搞');
            }


        }
    }
    NineModule.init();
})()