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

Last Changes: (Sort by Date)

10/07/2023

- Excluded Google Map
- Added support for UK/US Google domains
- Added support for mobile, tablet, and desktop devices

*/

(function() {
    'use strict';

    // I just added this variable to check if the class is found for the first time, so there's no need to execute multiple times.
    var iFoundCounter = 0;
    
    // How to use:
    // if( isMobile.any() ) alert('Mobile');
    // To check to see if the user is on a specific mobile device:
    // if( isMobile.iOS() ) alert('iOS');
    const isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    //-- Wait for the "Tools" button
    if (isMobile.any()){        
        waitForKeyElements('div[jsname="yIZuWb"]', onPageLoadedMobile);
    }else{
        waitForKeyElements(".PuHHbb", onPageLoaded);
    }
    
    
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

    
    function onPageLoadedMobile() {
        onPageLoaded("Mobile")
    }
    
    
    // Function to be executed after the page has completely loaded
    function onPageLoaded(arg) {

        if (arg=="Mobile"){
            
            //-- Mobile
            var ToolsButton = document.querySelector('div[jsname="yIZuWb"]');
            
        }else{
            
            //-- Desktop
            var ToolsButton = document.querySelector(".PuHHbb");
            
            //-- Tablet
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
            //-- Tablet
        }
        
        if (ToolsButton) {
            if (iFoundCounter > 1){return}
        }
        iFoundCounter++;
        
        var seperator = CreateSeprator();
        var alink = CreateLink();

        ToolsButton.insertAdjacentElement('afterend', seperator);
        seperator.insertAdjacentElement('afterend', alink);
    }
    

    //document.addEventListener('DOMContentLoaded', onPageLoaded);
    window.onload = onPageLoaded;

})();
