!function(n){"module"in this?module.exports=n():dexy=n()}(function(){return function(){var n=!1,t=0,u=[];return function(i){n?u.splice(t++,0,i):(u.push(i),function i(){var o=u.shift();t=0,(n=!!o)&&o(function(){setTimeout(function(){i(n=!1)})})}())}}});