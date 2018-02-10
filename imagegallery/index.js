var listPic = ["pic_1.png","pic_2.png","pic_3.png","pic4.png","pic_4.png"];

var bodyTag = document.querySelector('body');
var mainPic = document.querySelector('#main');

var picOptions = document.createElement('div');
picOptions.id="optionsPic";

for (var i=0; i<5; i++){
    var selectPic = document.createElement("IMG");
    selectPic.src = listPic[i];

    picOptions.appendChild(selectPic);
    bodyTag.appendChild(picOptions);

    selectPic.className = "options";

    selectPic.onclick = function(e) {
        setMainPic(e.target.src)
    };
}

function setMainPic(mainSrc){
    mainPic.setAttribute('src',mainSrc);
}
