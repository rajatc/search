var FBsearch = function (){ 
 	var dom_data = document.getElementById('search').value;
    
  /*code for interacting fb api and fetching required data JSONP */

  var headTag = document.getElementsByTagName('HEAD').item(0);
  var scriptTag= document.createElement("script");
  scriptTag.type = "text/javascript";

  /*facebook public search api**/
  scriptTag.src="https://graph.facebook.com/search?q="+dom_data+"&access_token=370222323053339|OkrU9qWSjMD2KfENSRY-UAUiOJc&type=page&callback="+"mycallback";
  headTag.appendChild( scriptTag);

  mycallback = function(fbdata) {
    document.getElementById("result").innerHTML="";
    var resultDOM=document.getElementById("result");
    for (var i = 0, len = fbdata.data.length; i < len ; i++) {
      var resultUrl = "https://facebook.com/" + fbdata.data[i].id;
      var name = fbdata.data[i].name;
      var category = fbdata.data[i].category;
      
      var newNumberListItem = document.createElement("li");
      var aTag = document.createElement("a");
      aTag.setAttribute("data", fbdata.data[i].id);
      aTag.setAttribute("onclick", "moreData(this);");
      aTag.innerHTML = name;
      var searchList = newNumberListItem.appendChild(aTag);
      resultDOM.appendChild(newNumberListItem);
      if (i == 0) {
        document.getElementById('cover').innerHTML = 'Click on the link to know more details';
      };
    }
    clickonload();
  }

  makeHttpObject = function() {
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}

    throw new Error("Could not create HTTP request object.");
  }

  clearData =function(){
    document.getElementById("cover").innerHTML = "";
    document.getElementById("abt").innerHTML = "";
    document.getElementById("more").innerHTML = "";
    document.getElementById("likes").innerHTML = "";
    document.getElementById("cat").innerHTML = "";
    document.getElementById("talk").innerHTML = "";
    document.getElementById("link").innerHTML = "";
  }
  
  moreData =function(data){
    clearData();
    var URL = "https://graph.facebook.com/" + data.getAttribute('data');
    id = data.getAttribute('data');
    
    var request = new makeHttpObject();
    request.open("GET", URL, true);
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState == 4){

        var fb_response = eval('(' + request.response + ')');
        var about = (fb_response.about == undefined) ? 'No data' : fb_response.about;
        var cover = (fb_response.cover == undefined) ? 'No data' : fb_response.cover.source ;
         link = (fb_response.link == undefined) ? 'No data' : fb_response.link ;
        var likes = fb_response.likes;
        var wereHereCount = fb_response.were_here_count;
        var talk = fb_response.talking_about_count;
        var category= (fb_response.category == undefined) ? 'No data' : fb_response.category ;
        var description = (fb_response.description == undefined) ? 'No data' : fb_response.description;
        var cover_node = document.getElementById("cover");
        if (cover != 'No data') {
          cover_node.innerHTML = "<img src='" + cover + "'/>";
        } else{
          cover_node.innerHTML="<span>Page has no cover photo.</span>"
        }

        var aboutDOM=document.getElementById("abt");
        aboutDOM.innerHTML= "<span>About : </span>";
        var node1=document.createTextNode(about); 
        aboutDOM.appendChild(node1);

        var likesDOM=document.getElementById("likes");
        likesDOM.innerHTML= "<span>Number of likes :</span>";
        var node3=document.createTextNode(likes); 
        likesDOM.appendChild(node3);
        
        var talkDOM=document.getElementById("talk");
        talkDOM.innerHTML = "<span>Talking  about count : </span>"
        var node4=document.createTextNode(talk); 
        talkDOM.appendChild(node4);

        var categoryDOM=document.getElementById("cat");
        categoryDOM.innerHTML = "<span>Category : </span>";
        var node5=document.createTextNode(category); 
        categoryDOM.appendChild(node5);

        
        var linkDOM= document.getElementById("link"); 
        linkDOM.innerHTML = "<span>Link : </span>";
        aTag = document.createElement("a");
        aTag.setAttribute("href", link);
        aTag.appendChild(document.createTextNode(link));              
        linkDOM.appendChild(aTag);

        document.getElementById('fav').innerHTML = "<a data='"+ id + "' onclick='favorite(event, this)';> Add to favorite</a>";
      }
    }
  }


  function sortUnorderedList(ul, sortDescending) {
    if(typeof ul == "string")
      ul = document.getElementById(ul);

    var lis = ul.getElementsByTagName("li");
    var vals = [];

    for(var i = 0, l = lis.length; i < l; i++)
      vals.push(lis[i].innerHTML);

    vals.sort();

    if(sortDescending)
      vals.reverse();

    for(var i = 0, l = lis.length; i < l; i++)
      lis[i].innerHTML = vals[i];
  }
  
  clickonload = function() {
    var desc = false;
    sortUnorderedList("result", desc);
    desc = !desc;
    return false;
  }

  favorite = function(e){
    e.preventDefault();console.log(id);
    var favitems=document.getElementById("fav-items");
    var newNumberListItem = document.createElement("li");
    var aTag = document.createElement("a");
    var spanTag = document.createElement("span");
    spanTag.setAttribute("onclick", "deleteFav(this);");
    spanTag.innerHTML = "Delete"
    var link = aTag.setAttribute("href", "http://facebook.com/"+id);
    aTag.setAttribute("data", id);
    aTag.setAttribute("onclick", "moreData(this);");
    aTag.innerHTML = "http://.facebook.com/"+id;
    var searchList = newNumberListItem.appendChild(aTag);
    newNumberListItem.appendChild(spanTag);
    favitems.appendChild(newNumberListItem);

  }

  deleteFav = function(node){
    todelete = node.parentNode;
    todelete.parentNode.removeChild(todelete);
  }   
        
}


