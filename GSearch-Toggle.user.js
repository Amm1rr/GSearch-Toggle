// ==UserScript==
// @name         GSearch Toggle lang
// @name:fa      سوییچ فارسی/انگلیسی گوگل
// @version      0.4
// @author       Amir
// @updateURL    https://github.com/Amm1rr/GSearch-Toggle/raw/main/GSearch-Toggle.user.js
// @downloadURL  https://github.com/Amm1rr/GSearch-Toggle/raw/main/GSearch-Toggle.user.js
// @description  GSearch Toggle can change Google search results to different languages, specifically English and Persian, without affecting the RTL (Right-to-Left) direction. (Based on the fork from tgxhx)
// @homepage     https://github.com/Amm1rr/GSearch-Toggle/
// @namespace    amm1rr
// @description:fa با این اسکریپت به راحتی می‌توان بین جستجو در زبان انگلیسی یا فارسی در جستجوی گوگل سوییچ کرد، یک گزینه زیر جستجوی گوگل اضافه می شود. البته بدون تغییر در چینش صفحه از چپ به راست.
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @match        https://www.google.com/search*
// @match        https://www.google.uk/search*
// @match        https://www.google.us/search*
// @exclude      https://www.google.us/maps*
// @grant        GM_addStyle
// ==/UserScript==

/*

** Changes:

10/09/2023
-----
v0.4:
- Added support for mobile, tablet, and desktop devices

7/09/2023
-----
v0.3:
- Excluded Google Map
- Added support for UK/US Google domains

*/

(function() {
    'use strict';

    // I just added this variable to check if the class is found for the first time, so there's no need to execute multiple times.
    var iFoundCounter = 0;

    //-- Wait for the "Tools" button
    waitForKeyElements (".PuHHbb", onPageLoaded);

    function CreateSeprator(){
        var seperator = document.createElement("div");
            seperator.classList.add("IDFSOe");
            //-- Class=> TZqsAd
        
            return seperator;
    }
    
    function CreateLink(){
        var aTag = document.createElement('a');
        var query = new URLSearchParams(decodeURIComponent(location.search));
        const isFarsi = (query.get('lr') || '').toLowerCase() === 'lang_fa';
        if (isFarsi) {
            query.delete('lr');
            query.delete('tbs');
            aTag.textContent = 'English';
        } else {
            query.set('lr', 'lang_fa');
            query.set('tbs', 'lr:lang_fa');
            aTag.textContent = 'Persian';
        }

        const href = `${location.origin}${location.pathname}?${query.toString()}`;
        aTag.setAttribute('href', href);
        aTag.classList.add('hdtb-tl');
        aTag.style.cssText = 'color: #5f6368;text-decoration: none;';

        return aTag;
    }

    // Function to be executed after the page has completely loaded
    function onPageLoaded() {

        //-- Desktop
        var ToolsButton = document.querySelector(".PuHHbb");
        // alert("0." + ToolsButton);
        
        //-- Tablet & Mobile
            if (!ToolsButton) {
                ToolsButton = document.querySelector('.hdtb-tl-sel');
                // alert("1." + ToolsButton);
            }

            if (!ToolsButton) {
                ToolsButton = document.querySelector('#hdtb-tls');
                // alert("2." + ToolsButton);
            }

            if (!ToolsButton) {
                ToolsButton = document.querySelector('.TZqsAd');
                // alert("3." + ToolsButton);
            }
        
        if (ToolsButton) {
            if (iFoundCounter > 0){return}
        }
        iFoundCounter++;
        //-- Mobile
        
        var seperator = CreateSeprator();
        var alink = CreateLink();

        ToolsButton.insertAdjacentElement('afterend', seperator);
        seperator.insertAdjacentElement('afterend', alink);
    }

    window.onload = onPageLoaded;
})();
