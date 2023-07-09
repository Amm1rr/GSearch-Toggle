// ==UserScript==
// @name         GSearch Toggle lang
// @name:fa      سوییچ فارسی/انگلیسی گوگل
// @version      0.3
// @author       Amir
// @updateURL    https://github.com/Amm1rr/GSearch-Toggle/raw/main/GSearch-Toggle.user.js
// @downloadURL  https://github.com/Amm1rr/GSearch-Toggle/raw/main/GSearch-Toggle.user.js
// @description  GSearch Toggle can change Google search results to different languages, specifically English and Persian, without affecting the RTL (Right-to-Left) direction. (Based on the fork from tgxhx)
// @homepage     https://github.com/Amm1rr/GSearch-Toggle/
// @namespace    amm1rr
// @description:fa با این اسکریپت به راحتی می‌توان بین جستجو در زبان انگلیسی یا فارسی در جستجوی گوگل سوییچ کرد، یک گزینه زیر جستجوی گوگل اضافه می شود. البته بدون تغییر در چینش صفحه از چپ به راست.
// @match        https://www.google.com/search*
// @match        https://www.google.uk/search*
// @match        https://www.google.us/search*
// @exclude      https://www.google.us/maps*
// @grant        none
// ==/UserScript==

/*

Changes: 7/09/2023
----
v0.3:
- Excldue Google Map
- Added UK/US google domain
- Added support for Tablets and Fablets

*/

(function() {
    'use strict';

    var bFound=false;

    const divElement = document.querySelector('.Pg70bf.Uv67qb');  //-- Fablet
    if (divElement) {
        const anchorTags = divElement.getElementsByTagName('a');
//        if (anchorTags.length > 0) {

            bFound=true;

            const lastAnchorTag = anchorTags[anchorTags.length - 2];

            const a = document.createElement('a');
            const query = new URLSearchParams(decodeURIComponent(location.search));
            const isFarsi = (query.get('lr') || '').toLowerCase() === 'lang_fa';
            if (isFarsi) {
                query.delete('lr');
                query.delete('tbs');
                a.textContent = 'English';
            } else {
                query.set('lr', 'lang_fa');
                query.set('tbs', 'lr:lang_1fa');
                a.textContent = 'Persian';
            }

            const href = `${location.origin}${location.pathname}?${query.toString()}`;
            a.setAttribute('href', href);
            a.classList.add('hdtb-tl');
            a.style.cssText = 'color: #5f6368;text-decoration: none;'
            lastAnchorTag.insertAdjacentElement('afterend', a);
//    }
    }
    if (!bFound){ //-- It's wasn't mobile

        var settingsBtn = document.querySelector('#uddia_1');

        var a = document.createElement('a');
        var query = new URLSearchParams(decodeURIComponent(location.search));
        var isFarsi = (query.get('lr') || '').toLowerCase() === 'lang_fa';
        if (isFarsi) {
            query.delete('lr');
            query.delete('tbs');
            a.textContent = 'English';
        } else {
            query.set('lr', 'lang_fa');
            query.set('tbs', 'lr:lang_1fa');
            a.textContent = 'Persian';
        }

        var href = `${location.origin}${location.pathname}?${query.toString()}`;
        a.setAttribute('href', href);
        a.classList.add('hdtb-tl');
        a.style.cssText = 'color: #5f6368;text-decoration: none;'
        settingsBtn.insertAdjacentElement('afterbegin', a);
        bFound=true;
    }

    //----- OLD Way
    if (!bFound) {
        var settingsBtn = document.querySelector('#hdtb-tls');
        var settingsBtnParent = settingsBtn.parentElement;

        var a = document.createElement('a');
        var query = new URLSearchParams(decodeURIComponent(location.search));
        var isFarsi = (query.get('lr') || '').toLowerCase() === 'lang_fa';
        if (isFarsi) {
            query.delete('lr');
            query.delete('tbs');
            a.textContent = 'English';
        } else {
            query.set('lr', 'lang_fa');
            query.set('tbs', 'lr:lang_1fa');
            a.textContent = 'Persian';
        }

        var href = `${location.origin}${location.pathname}?${query.toString()}`;
        a.setAttribute('href', href);
        a.classList.add('hdtb-tl');
        a.style.cssText = 'color: #5f6368;text-decoration: none;'
        settingsBtnParent.insertBefore(a, settingsBtn)
        Object.assign(settingsBtnParent.style, {
            height: '100%',
            display: 'flex',
            'align-items': 'baseline'
        })

        Object.assign(settingsBtnParent.parentElement.style, {
            flex: 1,
            display: 'flex',
            'justify-content': 'flex-end',
            'align-items': 'baseline'
        })
    }

})();
