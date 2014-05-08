var reg = /(\#\#[^\r\n\f]+|\#\*[\s\S]+?(?:\*\#|$))/ig;
var c = "#*aaa*#  var a= a   ##ddd";

// console.log(reg.test(c));

// c.search(reg, function(m, $1){
//     if($1){
//             console.log($1);

//     }
// });

while ((result = reg.exec(c)) != null)  {
  console.log(result);
//document.write("<br />");
  console.log(reg.lastIndex);
  // document.write("<br />");
 }

//console.log(reg.exec(c));
