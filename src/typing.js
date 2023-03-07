$(document).ready(function () {
  let typedString =  document.getElementById('textID'); 

  let typewriter = new Typewriter(typedString, {
      loop: false 
  });

  typewriter
      .pauseFor(500)
      .typeString('<span>Budi izvrstan u onom što vidiš!</span>')
      .pauseFor(300)
      .deleteChars(6)
      .typeString('<span>voliš.</span>')
      .pauseFor(300)
      .typeString('</br><span class="text-danger">ZAISKRI</span>.')
      .start();
});

