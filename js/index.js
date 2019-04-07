function Pop (obj){
     this.pop=null;
     this.color= obj.color;
     this.nowLeft=obj.nowLeft;
     this.nowTop=obj.nowTop;
     this.createUI();
     this.vent();   //BigMirror
}
Pop.prototype.createUI=function(){
    //创建div
    let Top;
    this.pop=document.createElement("div");
    this.pop.style.width="10px";
    this.pop.style.height="10px";
    this.pop.style.position="absolute";
    this.pop.style.backgroundColor=`${this.color}`;
    this.pop.style.borderRadius="50%";
    this.pop.style.left=`${this.nowLeft}px`;
    this.pop.style.opacity=".4"
    document.documentElement.appendChild(this.pop);
}
Pop.prototype.vent=function(){
    //设置定时器处理top值
    let myTime=setInterval(()=>{
        this.nowTop-=10;
        this.pop.style.top=`${this.nowTop}px`;
        this.pop.style.left=`${this.nowLeft}px`
        if(this.nowTop<=5){
            clearInterval(myTime);
            this.pop.remove();
        }
    },50)
}
window.onload=function() {
    document.documentElement.onmousedown = function (event) {
        let evt = event || window.event
        function getColor() {
            let str = "#"
            for (let i = 0; i < 6; i++) {
                str += (parseInt(Math.random() * 16)).toString(16)
            }
            return str
        }
        let obj = {
            "color": getColor(),
            "nowLeft": evt.pageX - 5,
            "nowTop": evt.pageY - 5
        }
        let pops = new Pop(obj)
        evt.stopPropagation();
    }
    let BoxChild = document.getElementsByClassName("box")[0].children
    let out_1 = document.getElementsByClassName("out")[0];
    let out_2 = document.getElementsByClassName("out")[1];
    let out_3 = document.getElementsByClassName("out")[2];
    let out_4 = document.getElementsByClassName("out")[3];
    let out_5 = document.getElementsByClassName("out")[4];
    let out_6 = document.getElementsByClassName("out")[5];
//    旋转导航栏复原
    function remove(e) {
        document.getElementsByClassName("box")[0].className = "box boxMove"
        out_1.id = ""
        out_2.id = ""
        out_3.id = ""
        out_4.id = ""
        out_5.id = ""
        out_6.id = ""
    }
function action(){
    document.querySelector(".boxMove").onclick = function (e) {
        document.getElementsByClassName("menuBox")[0].className = "menuBox"
        this.className = "box"
        out_1.id = "move_1";
        out_1.setAttribute("index", "0");
        out_2.id = "move_2"
        out_2.setAttribute("index", "1");
        out_3.id = "move_3";
        out_3.setAttribute("index", "2");
        out_4.id = "move_4";
        out_4.setAttribute("index", "3");
        out_5.id = "move_5";
        out_5.setAttribute("index", "4");
        out_6.id = "move_6";
        out_6.setAttribute("index", "5");
        // setTimeout(() => {
        //     remove()
        // }, 10000);
        //给每个导航菜单绑定指向
        for (let i = 0; i <= BoxChild.length - 1; i++) {
            BoxChild[i].onclick = function (e) {
                e.preventDefault();
                let index = parseInt(this.getAttribute("index"));
                remove();
                document.getElementsByClassName("menuBox")[0].className = "menuBox menyBoxMove";
                document.getElementsByClassName("showBox")[index].className = "showBox showNow"
                document.querySelector(".boxMove").onclick=null;
                e.stopPropagation();
            }
            e.stopPropagation()
        }
        e.stopPropagation()
    }
}
document.querySelector(".menuBox").onclick=function(e){
    this.className="menuBox"
    let showBoxAll=document.querySelectorAll(".showBox")
    for (let i=0;i<=showBoxAll.length-1;i++){
            showBoxAll[i].className="showBox"
        }
    for(let i=0;i<BoxChild.length-1;i++ ){
            BoxChild[i].onclick=null;
        }
        remove()
        action()
        e.stopPropagation()
    }
}