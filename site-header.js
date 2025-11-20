/* Create main site header.
*/
const body = document.getElementsByTagName('body')[0];
const header = document.createElement('header');
header.innerHTML = `
<nav class="navhorizontal">
  <ul>
    <li><a href="hw1.html" class="navbutton" target="_self"><span>Home Page<br>(Homework 1)</span></a></li>
    <li><a href="hw2.html" class="navbutton" target="_self"><span>Homework<br>2</span></a></li>
    <li><a href="hw3.html" class="navbutton" target="_self"><span>Homework<br>3</span></a></li>
    <li><a href="hw4.html" class="navbutton" target="_self"><span>Homework<br>4</span></a></li>
    <li><a href="hw5.html" class="navbutton" target="_self"><span>Homework<br>5</span></a></li>
    <li><a href="hw6.html" class="navbutton" target="_self"><span>Homework<br>6</span></a></li>
    <li><a href="hw7.html" class="navbutton" target="_self"><span>Homework<br>7</span></a></li>
    <li><a href="underconstruction.html" class="navbutton" target="_self"><span>Homework<br>8</span></a></li>
  </ul>
</nav>
`;
body.prepend(header);
