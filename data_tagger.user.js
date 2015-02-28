// ==UserScript== 
// @name Data Selector 
// @namespace http://anchoragepublic.org/ /selector 
// @description Select Data for Scraper Training Purposes
// @include http://*/*
// @include https://*/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @require https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js
// @require https://js-hotkeys.googlecode.com/files/jquery.hotkeys-0.7.9.min.js
// @grant GM_xmlhttpRequest

// ==/UserScript==



function openDialog()
{
  var url = document.URL;
  var selection = unsafeWindow.getSelection().toString();
  
  console.log(url);
  console.log(selection);
  
  document.getElementById("zzx_url").value = url;
  document.getElementById("zzx_thedata").value = selection;
  $( "#zzx_selector_dialog" ).css("visibility", "visible");
  $( "#zzx_selector_dialog" ).dialog();
}

function closeAndSubmitData()
{
  var url = document.getElementById("zzx_url").value;
  var data = document.getElementById("zzx_thedata").value;
  var tag = document.getElementById("zzx_tag").value;
  var getUrl = "http://localhost:24080/~hackathon/tag_data.php?url=" + encodeURI(url) + "&" + "data=" + encodeURI(data) + "&tag=" + encodeURI(tag);
  console.log(getUrl);
  console.log('here goes...');

  
  GM_xmlhttpRequest
  ({
    method: "GET",
    url: getUrl,
    onload: function(response)
    {
      $( "#zzx_selector_dialog" ).dialog("close");
    }
  });
  console.log('request made...');
}

function insertDialog()
{
  var dEl = document.createElement("div");
  dEl.id = "zzx_selector_dialog";
  dEl.title = "Data Tagger";
  dEl.innerHTML = "<p>URL:<br/><input type='text' id='zzx_url'></input><br/>Data:<br/><textarea id='zzx_thedata'></textarea><br/>Tag:<br/><input type='text' id='zzx_tag'></input><br/><button id='zzx_submit_tag'>Tag Data!</button></p>";  
  dEl.style.visibility = "hidden";
  document.getElementsByTagName("body")[0].appendChild(dEl);
  document.getElementById("zzx_submit_tag").addEventListener("click", closeAndSubmitData, false)
}


function insertHotKey()
{
  var a = document.createElement('a');
  a.accessKey = "t";
  a.addEventListener("click", openDialog, false);
  var linkText = document.createTextNode("my title text foo");
  a.appendChild(linkText)
  a.style.visibility = "hidden";
  document.getElementsByTagName("body")[0].appendChild(a); 
}



document.body.style.background = "#ff7fff"; 



// load CSS for jQuery-UI
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css';
document.getElementsByTagName("head")[0].appendChild(link);



insertDialog();
insertHotKey();



// load the global data
var json = GM_getValue("selector_globals");
var __ = JSON.parse(json);



// save the global data
var json = JSON.stringify(__)
GM_setValue("selector_globals", json);



