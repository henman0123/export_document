// ==UserScript==
// @name        自動複製 STM 系統資料檔特定欄位值
// @namespace   http://tampermonkey.net/
// @version     1.3
// @description 自動複製 STM 系統資料檔特定欄位值，須配合 TCKK 標籤工具使用。
// @author      noi
// @match       https://web.pams.cht.com.tw/sys/stm/sdh_QryStmSys.asp?*
// @icon        https://web-eshop.cdn.hinet.net/eshop/img/favicon.ico
// @grant       none
// @updateURL   https://github.com/henman0123/export_document/raw/gh-pages/%E9%85%8D%E5%A5%97%E4%BD%BF%E7%94%A8%E8%80%85%E8%85%B3%E6%9C%AC/%E8%87%AA%E5%8B%95%E8%A4%87%E8%A3%BD%20STM%20%E7%B3%BB%E7%B5%B1%E8%B3%87%E6%96%99%E6%AA%94%E7%89%B9%E5%AE%9A%E6%AC%84%E4%BD%8D%E5%80%BC.user.js
// @downloadURL https://github.com/henman0123/export_document/raw/gh-pages/%E9%85%8D%E5%A5%97%E4%BD%BF%E7%94%A8%E8%80%85%E8%85%B3%E6%9C%AC/%E8%87%AA%E5%8B%95%E8%A4%87%E8%A3%BD%20STM%20%E7%B3%BB%E7%B5%B1%E8%B3%87%E6%96%99%E6%AA%94%E7%89%B9%E5%AE%9A%E6%AC%84%E4%BD%8D%E5%80%BC.user.js
// ==/UserScript==

(function() {
    'use strict';

    let Value1, Value2, Value3;

    // 取得網頁中的 table 標籤總數
    const tables = document.querySelectorAll('table');
    const tableCount = tables.length;

    switch (tableCount) {
        case 6:
            // 查找第 6 個 table 標籤的第 6 個 tr 標籤的第 2 個 td 標籤的值
            const table2 = tables[5];
            if (table2) {
                const tr6 = table2.querySelectorAll('tr')[5];
                if (tr6) {
                    const td2 = tr6.querySelectorAll('td')[1];
                    Value2 = td2 ? td2.textContent.trim() : '';

                    // 檢查 Value2 是否為純英文和數字
                    if (!/^[a-zA-Z0-9]+$/.test(Value2)) {
                        Value2 = ''; // 若不符合，設置為空白
                    }
                }
            }
            break;

        case 5:
            // 查找第 5 個 table 標籤的第 6 個 tr 標籤的第 2 個 td 標籤的值
            const newTable2 = tables[4]; // 假設新的邏輯需要選擇第 5 個表格
            if (newTable2) {
                const tr5 = newTable2.querySelectorAll('tr')[5]; // 假設從第 5 個行開始
                if (tr5) {
                    const td2 = tr5.querySelectorAll('td')[1];
                    Value2 = td2 ? td2.textContent.trim() : '';

                    // 檢查 Value2 是否為純英文和數字
                    if (!/^[a-zA-Z0-9]+$/.test(Value2)) {
                        Value2 = ''; // 若不符合，設置為空白
                    }
                }
            }
            break;

        default:
            console.error('不支援的 table 標籤數量: ', tableCount);
            alert('不支援的網頁結構，請檢查網頁內容。');
            return; // 結束執行
    }

    // 查找第 2 個 table 標籤的第 2 個 tr 標籤的第 1 個 td 標籤的值
    const table1 = tables[1];
    if (table1) {
        const tr2 = table1.querySelectorAll('tr')[1];
        if (tr2) {
            const td1 = tr2.querySelectorAll('td')[0];
            Value1 = td1 ? td1.textContent.trim() : '';
        }
    }

    // 查找 class 名為 stlDdf 的元素並格式化其值
    const stlDdfElement = document.querySelector('.stlDdf');
    if (stlDdfElement) {
        const rawText = stlDdfElement.textContent.trim();
        const match = rawText.match(/\[\^[^\-]*-(\w+-\w+-\w+:\w+|\w+-\w+-\w+)\]/);
        Value3 = match ? match[1] : '';
    }

    // 檢查是否為 undefined 並替換為空白
    Value1 = Value1 === undefined ? '' : Value1;
    Value2 = Value2 === undefined ? '' : Value2;
    Value3 = Value3 === undefined ? '' : Value3;

    // 格式化並自動複製到剪貼簿
    const formattedValue = `${Value1}.${Value2}.${Value3}.`;
    navigator.clipboard.writeText(formattedValue).then(() => {
        //alert(`已自動複製: \n${formattedValue}`); //debug用
    }).catch(err => {
        console.error('複製時發生錯誤: ', err);
    });
})();
