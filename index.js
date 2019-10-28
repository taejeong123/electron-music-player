const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

//일렉트론 앱의 환경설정 변수 [JSON]
const props = {
    width:1280,
    height:600,
    resizeable:false,
    webPreferences: {
        nodeIntegration:true,
        nativeWindowOpen: true,
        nodeIntegrationInWorker: true   //js 의 쓰레드 : worker
    },
    icon: path.join(__dirname, "img/icon.ico")
}

let win = null;
app.on("ready", ()=>{
    win = new BrowserWindow(props);
    win.setMenu(null);
    win.loadFile("index.html");

    //win.webContents.openDevTools();
});

ipcMain.on("openDev", (e, arg) => {
    win.webContents.openDevTools();
});