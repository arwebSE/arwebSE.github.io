function setAnchorTargets() {
    // if on Cydia, set link targets to _blank
    if (navigator.userAgent.search(/Cydia/) != -1) {
        $("a").each(function() {
            $(this).attr("target","_blank");
        });
    }
}

var repoContents =  {
    "#repoFooterLinks" : {
        "type":"custom",
        "source":"repo>footerlinks>link",
        "render":function(element,source) {
            $.each(source, function(index,data) {
                var a = $("<a class='link-item list-group-item'>");
                a.attr("href",$(data).find('url').text());
                if ($(data).find('iconclass')) {
                    var i =  $("<span>")
                    i.attr("class",$(data).find('iconclass').text());
                    console.log(i);
                    $(a).append(i);
                }
                $(a).append($(data).find('name').text());
                $(element).append(a);
            }); //each
        } //render
    }
}

$( document ).ready(function() {
    $.ajax({
        type: "GET",
        dataType: "xml",
        url : ("../repo.xml"),
        cache: false,
        success : function(xml){
            data_loader_engine(repoContents,xml);
            setAnchorTargets();
        },
        error: function() {
            $("#contactInfo").hide();
            setAnchorTargets();
        }
    }); //ajax
}); // ready


/* //default to light mode
var mode = 'light';
if (localStorage.getItem("mode")){
    //check if there's a saved state already
    mode = localStorage.getItem("mode");
} else if (window.matchMedia('(preferes-color-scheme:dark)')){
    //check if dark mode is preferred
    mode = "dark";
}
//update the class based on the mode
document.documentElement.className = mode;

//when the button is clicked, toggle the mode and save the change in local storage
document.getElementById('toggleMode').onclick = function(){
    mode = (mode === 'dark') ? 'light' : 'dark';
    document.documentElement.className = mode;
    localStorage.setItem("mode", mode);
} */

var theme, prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
if (prefersDarkScheme.matches)
    theme = document.body.classList.contains("light-mode") ? "light" : "dark";
else
    theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
localStorage.setItem("theme", theme);

function toggle() {
    var currentTheme = localStorage.getItem("theme");
    if (currentTheme == "dark")
        document.body.classList.toggle("light-mode");
    else if (currentTheme == "light")
        document.body.classList.toggle("dark-mode");
}