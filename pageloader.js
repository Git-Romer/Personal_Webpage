const historydict = [];

function loadPage(el, url, back = false) {
    if (back == false) {
        historydict.push({
            key: el,
            value: url
        });
    }
    console.log(el, url)
    var localTest = /^(?:file):/,
        xmlhttp = new XMLHttpRequest(),
        status = 0;

    xmlhttp.onreadystatechange = function () {
        /* if we are on a local protocol, and we have response text, we'll assume
         *  				things were sucessful */
        if (xmlhttp.readyState == 4) {
            status = xmlhttp.status;
        }
        if (localTest.test(location.href) && xmlhttp.responseText) {
            status = 200;
        }
        if (xmlhttp.readyState == 4 && status == 200) {
            document.getElementById(el).innerHTML = xmlhttp.responseText;
        }
    }

    try {
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    } catch (err) {
        /* todo catch error */
    }
    if (historydict.length > 60) {
        historydict.splice(0, 30)
    }
}

function gobackbutton() {
    if (historydict.length <= 2) {
        scroll(0, 0);
    } else {
        loadPage(historydict[historydict.length - 2].key, historydict[historydict.length - 2].value, true);
        historydict.pop();
    }
}