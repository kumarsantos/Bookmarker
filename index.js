let bott=document.getElementById('btn')
bott.addEventListener("click",save);

function save(e)
{
  let sitename=document.getElementById('sitename').value;
  let url=document.getElementById('siteurl').value;
  let desc=document.getElementById('desc').value;

/////calling form validation method if not true then stop the functionality/////////
 if(!validateform(sitename,url,desc))
 {
   return false;
 }
///////////////creating object with dynamic values///////////////////
  var bookmark={
    name:sitename,
    url:url,
    desc:desc
  }
//////////////////////////add to localstorage////////////////////////
if(localStorage.getItem("bookmarks")===null)
{
  var bookmarks=[];
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
}
else
{
  var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
}
//////////////////////Reseting the form///////////////////////////////
  document.getElementById('myform').reset();
//////displaying the list item after adding immediately by calling////
  fetchbookmark();
  e.preventDefault();

}
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


function deletebookmarks(url)
{
  var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
  for(var i=0;i<bookmarks.length;i++)
  {
    if(bookmarks[i].url==url)
    {
      bookmarks.splice(i,1);
    }
  }
  localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
 //////displaying the list item after deleting immediately by calling////
  fetchbookmark();
  ////////////////////////////////////////////////////////////////
}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

function fetchbookmark()
{
  var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
  var output=document.getElementById("output");
  output.innerHTML='';

  for(var i=0;i<bookmarks.length;i++)
  {
    var name=bookmarks[i].name;
    var url=bookmarks[i].url;
    var desc=bookmarks[i].desc;
    output.innerHTML+='<li>'+'<h4 style="width:350px;">'+name+'</h4>'+
                      '<span id="item">'+'<button id="visit">'+'<a  href="'+url+'" target="_new">Visit</a>'+
                      '</button>'+'<button id="delete" onclick="deletebookmarks(\''+url+'\')" >Delete</button>'+'</span>'+'</li>'+'<br>'+'<p>'+desc+'</p>';
                      
  }
}

/////////////////////////////////////////////
/////////////////////////////////////////////

function validateform(sitename,url,desc)
{
///if sitename and url is empty then return false/////
  if(!sitename || !url || !desc)
  {
    alert("Please Fill in the Form");
    return false;
  } 

///////matching regular expression of http/https url////////
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression)

 if(!url.match(regex))
 {
   alert("Url Doesn't Match");
   return false;
 }
 return true;
}
///////////////////////////// end //////////////////////////////////