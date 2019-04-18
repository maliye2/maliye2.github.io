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
//随机动画效果
    function randomAni(){
        //设置动画class名数组
        let arrAniCla=["AinimAction_1","AinimAction_2","AinimAction_3","AinimAction_4","AinimAction_5"];
        //产生1-4的随机数
        let num=parseInt(Math.random()*5);
        return arrAniCla[num];
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
                document.getElementsByClassName("boxAinim")[index].className=`boxAinim ${randomAni()}`
                e.stopPropagation();
            }
            e.stopPropagation()
        }
        e.stopPropagation()
    }
}
document.querySelector(".menuBox").onclick=function(e){
    this.className="menuBox";
    let animBoxChild=document.getElementsByClassName("boxAinim");
    let showBoxAll=document.querySelectorAll(".showBox")
    for (let i=0;i<=showBoxAll.length-1;i++){
            showBoxAll[i].className="showBox"
        }
    for(let i=0;i<BoxChild.length-1;i++ ){
            BoxChild[i].onclick=null;
        }
    for(let i=0;i<animBoxChild.length-1;i++){
        animBoxChild[i].className="boxAinim"
    }
        remove()
        action()
        e.stopPropagation()
    }
    //每个小展示块的选择器
    let Show_1=document.querySelector("#Big_1");
    let Show_2=document.querySelector("#Big_2");
    let Show_3=document.querySelector("#Big_3");
    let Show_4=document.querySelector("#Big_4");
    let BigShowBox= document.querySelector(".bigShowBox");
    let allGoodsBox=document.querySelectorAll(".explainBox");
//给大小展示块设置背景尺寸,背景位置以及自己的位置
    function BigBackground(imgUrl){
        //获取此时大展示块的尺寸
        let BigShowBoxW=BigShowBox.offsetWidth;
        // BigShowBox.style.backgroundImage=`url(${imgUrl})`
        //获取此时小版块的尺寸
        let smallBoxW=Show_3.offsetWidth;
        let smallBoxH=Show_3.offsetHeight;
        //设置每个小展示块的背景尺寸
        Show_1.style.backgroundImage=`url(${imgUrl})`
        Show_1.style.backgroundSize=`${BigShowBoxW}px`;
        Show_1.style.backgroundPosition=`0px 0px`;
        //设置第二个小展示块的背景图定位
        Show_2.style.backgroundImage=`url(${imgUrl})`
        Show_2.style.backgroundSize=`${BigShowBoxW}px`
        Show_2.style.backgroundPosition=`-${smallBoxW}px 0`;
        //设置第三个
        Show_3.style.backgroundImage=`url(${imgUrl})`
        Show_3.style.backgroundSize=`${BigShowBoxW}px`;
        Show_3.style.backgroundPosition=`0px -${smallBoxH}px`;
        //设置第四个
        Show_4.style.backgroundImage=`url(${imgUrl})`
        Show_4.style.backgroundSize=`${BigShowBoxW}px`;
        Show_4.style.backgroundPosition=`-${smallBoxW}px -${smallBoxH}px`
    }
//移动小展示块的函数
    function moveSmall(){
        Show_1.style.transform=`translateY(0%) translateX(0%)`;
        Show_2.style.transform=`translateY(0%) translateX(0%)`;
        Show_3.style.transform=`translateY(0%) translateX(0%)`;
        Show_4.style.transform=`translateY(0%) translateX(0%)`;
    }

    // 动态展示效果
    //给每个展示版块绑定事件
    for (let i=0;i<=allGoodsBox.length-1;i++){
        allGoodsBox[i].onclick=function(e){
            //获取此时点击的方框的num值
            let imgUrl=this.previousElementSibling.previousElementSibling.getAttribute("src");
            console.log(imgUrl)
            //显示大板块
            BigShowBox.className="bigShowBox bigShowBoxMove";
            //更换此时的背景图
            BigBackground(imgUrl);
            //移动小展示块
            moveSmall()
            document.body.onresize=function(e){
                BigBackground(imgUrl);
                e.stopPropagation()
            }
            e.stopPropagation();
        }
    }
    document.querySelector(".close").onclick=function(e){
        BigShowBox.className="bigShowBox";
        Show_1.style="";
        Show_2.style="";
        Show_3.style="";
        Show_4.style=""
    }



}