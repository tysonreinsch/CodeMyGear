const url = 'https://us-central1-omg-codemygear.cloudfunctions.net/comments/tyson';

var content = document.getElementById('container');
var text = document.getElementById('text');
var email = document.getElementById('email');
var submit = document.getElementById('submit');

getComments();

async function getComments() {
  var resp = await fetch(url);
  var comments = await resp.json();
  var html = "";
  comments.forEach(function(comment){
    html = html + "<div>";
    html = html + `<span>${comment.message}</span>`;
    html = html + "</div>";
  });
  content.innerHTML = html;
  console.log(html);
}

submit.addEventListener('click', function() {
  postComments([{
    "message": text.value,
    "email": email.value,
  }]);
});

async function postComments (message) {
  var resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
  getComments()
}
