export default class PlayList {
    constructor(el, app){
        this.app = app;
        this.listDom = document.querySelector(el);
        this.itemList = this.listDom.querySelector(".item-list");
        this.addBtn = this.listDom.querySelector("#openDialog");
        this.fileInput = this.listDom.querySelector("#audioFile");

        this.itemList.innerHTML = "";
        this.fileList = []; //플레이리스트 상에 있는 음악파일들을 저장
        this.playIdx = null; //현재 재생중인 음악의 인덱스를 저장

        this.currentMusic = null;

        //우클릭 메뉴
        this.contextMenu = document.querySelector("#context");
        this.contextTargetItem = null;

        this.addListener();
    }

    addListener(){
        this.addBtn.addEventListener("click", e => this.fileInput.click());
        this.fileInput.addEventListener("change", this.inputChange.bind(this));

        this.listDom.addEventListener("dragover", this.fileDragOver.bind(this));
        this.listDom.addEventListener("drop", this.fileDrop.bind(this));

        this.contextMenu.querySelector("#del").addEventListener("click", (e)=>{
            console.log(this.contextTargetItem);
            e.stopPropagation();
        });

        document.querySelector("body").addEventListener("click", (e)=> {
            this.contextMenu.style.visibility = "hidden";
            this.contextTargetItem = null;
        });
        this.itemList.addEventListener("dragover", this.fileDrop.bind(this));
        this.itemList.addEventListener("drop", this.itemDrop.bind(this));
    }

    itemDrop(e){
        let data = e.dataTransfer.getData("idx");
        if(data != ""){
            e.stopPropagation();
            e.preventDefault();
            console.log("아이템 드랍");
            let y = e.clientY; //마우스가 드랍된 y의 좌표를 구한다.
            
            let target = -1;
        
            for(let i = 0; i < this.fileList.length; i++){
                console.log(y, this.fileList[i].dom.getBoundingClientRect().top);
                if(this.fileList[i].dom.getBoundingClientRect().top > y){
                    target = i;
                    break;
                }
            }
            console.log(target);
            //find는 해당 조건을 만족하는 것이 나오면 true를 반환하는 거
            let moveItem = this.fileList.find(x => x.idx == data * 1);
            if(target >= 0){
                this.itemList.insertBefore(moveItem.dom, this.fileList[target].dom);
            }else {
                this.itemList.appendChild(moveItem.dom);
            }

            this.fileList.sort( (a, b) => {
                return a.dom.getBoundingClientRect().top
                     - b.dom.getBoundingClientRect().top
            });

        }else {
            console.log("파일 드랍 밑으로 이벤트 전파");
        }
    }

    fileDragOver(e){
        e.preventDefault();
        e.stopPropagation();
    }
    fileDrop(e){
        e.preventDefault();
        e.stopPropagation();
        let files = Array.from(e.dataTransfer.files);
        this.addList(files);
    }

    inputChange(e){
        let files = Array.from(e.target.files);
        this.addList(files);
    }

    addList(files) {
        files.forEach(file => {
            console.log(file);
            if(file.type.substring(0, 5) !== "audio") {
                return;
            }
            let obj = {idx: this.fileList.length, file: file, dom: null};
            this.fileList.push(obj);
            let item = document.createElement("li");
            item.classList.add("item");
            obj.dom = item;
            item.addEventListener("dblclick", (e) => {
                let data = this.fileList.find(x => x.idx == obj.idx);
                this.playItem(data);
            });
            
            item.setAttribute("draggable", true);
            //item.removeAttribute("draggable");
            item.addEventListener("dragstart", (e)=>{
                e.dataTransfer.setData("idx", obj.idx);
                e.dataTransfer.setDragImage(e.target, 0, 0);
            });

            //음악에 우클릭시 행동
            item.addEventListener("contextmenu", (e)=>{
                e.preventDefault();
                e.stopPropagation();
                this.contextTargetItem = obj; // 우클릭된 아이템이 들어간다.
                this.contextMenu.style.top = e.pageY + "px";
                this.contextMenu.style.left = e.pageX + "px";
                this.contextMenu.style.visibility = "visible";
            });

            item.innerHTML = file.name;
            this.itemList.appendChild(item);
        });
    }

    playItem(data){
        this.fileList.forEach(file => {
            file.dom.classList.remove("active");
        });

        this.currentMusic = data.idx;  //현재 재생중인 음악의 idx를 저장

        data.dom.classList.add("active");
        this.app.player.loadMusic(data.file);
    }

    getNextMusic(loop){
        let now = this.fileList.findIndex(x => x.idx == this.currentMusic);
        if(now < this.fileList.length - 1){
            this.playItem(this.fileList[now + 1]);
        }else if(loop){
            this.playItem(this.fileList[0]);
        }
    }
}