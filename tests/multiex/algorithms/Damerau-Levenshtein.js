// source code from:
//http://stackoverflow.com/questions/11398364/optimizing-string-matching-algorithm

function levenshtein(a, b) {
  var i,j,cost,d=[];

  if (a.length == 0) {return b.length;}
  if (b.length == 0) {return a.length;}

  for ( i = 0; i <= a.length; i++) {
    d[i] = new Array();
    d[ i ][0] = i;
  }

  for ( j = 0; j <= b.length; j++) {
    d[ 0 ][j] = j;
  }

  for ( i = 1; i <= a.length; i++) {
    for ( j = 1; j <= b.length; j++) {
      if (a.charAt(i - 1) == b.charAt(j - 1)) {
        cost = 0;
      } else {
        cost = 1;
      }

      d[ i ][j] = Math.min(d[ i - 1 ][j] + 1, d[ i ][j - 1] + 1, d[ i - 1 ][j - 1] + cost);

      if (i > 1 && j > 1 && a.charAt(i - 1) == b.charAt(j - 2) && a.charAt(i - 2) == b.charAt(j - 1)) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost)
      }
    }
  }

  return d[ a.length ][b.length];
}

function suggests(suggWord) {
  var sArray = [];
  for(var z = words.length;--z;) {
    if(levenshtein(words[z],suggWord) < 2) { 
      sArray[sArray.length] = (words[z]);
    }   
  }
}

var words = 'template words';
for(var i=0;i<words.length;i++) {
  words[i] = J$.readInput(i);
}

var suggWord = 'suggest words';
for(var i=0;i<suggWord.length;i++) {
  suggWord[i] = J$.readInput(i);
}

suggests(suggWord);



