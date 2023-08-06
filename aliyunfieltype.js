// ==UserScript==
// @name         阿里云文件筛选
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.aliyundrive.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    const  typeList = ['mp3','html','pdf'];
    window.onload = function () {
        var typeSelect = document.createElement('div');
        typeSelect.innerHTML = createCheckBox()
        typeSelect.style.position = 'fixed';
        typeSelect.style.width = '300px'
        typeSelect.style.top = '10px';
        typeSelect.style.right = '10px';
        typeSelect.style.backgroundColor = '#FFF';
        console.log('我是分割线---------------')
        document.body.appendChild(typeSelect);
        for (let index = 0; index < typeList.length; index++) {
            document.getElementById("saliyunp_"+typeList[index]+"_id").addEventListener("change", function () {
                if (this.checked) {
                    console.log("Checkbox is checked.");
                    selectDataType(typeList[index]);
                } else {
                    console.log("Checkbox is not checked.");
                    selectDataType(typeList[index]);
                }
            });
        }    
        function selectDataType(val){
            var root = document.getElementsByClassName('grid-card-container')
            if(!root){
                return;
            }
            for (let index = 0; index < root.length; index++) {
                const element = root[index];
                let card =  element.getElementsByClassName('info--YLxTD')
                if(card && card[0]){
                    let title =  card[0].getElementsByTagName('p');
                    if(title){
                       const t =  title[0].textContent;
                       if(t.endsWith(val)){
                        let ck =  element.getElementsByClassName('action-btn--bOVm6 action-btn-select--mSEs4');
                        let ckl = ck[0].getElementsByTagName('input');
                        ckl[0].click();
                       }
                    }
                }
            }
        }

        function createCheckBox() {
            let  typeBoxStr = '';
            for (let index = 0; index < typeList.length; index++) {
                typeBoxStr+="<label style='margin-right: 30px;' >"+
                "<input type ='checkbox' value ='"+typeList[index]+"' name ='type' id ='saliyunp_"+typeList[index]+"_id' />"+ typeList[index] + "</label>"
            }
            return typeBoxStr;
        }
    };
})();
