var image;

/* Uploads the image to Canvas 1*/
function upload(){
  var c1 = document.getElementById("c1");
  var fi = document.getElementById("finput");
  image = new SimpleImage(fi);
  image.drawTo(c1);
}
/* Clears Canvas1 */
function clearCanvas(){
  var c1 = document.getElementById("c1");
  var ctx = c1.getContext("2d");
  var w = c1.width;
  var h = c1.height;
  ctx.clearRect(0,0,w,h);
}

/* Makes the image grey scale */
function makeGrey(){
  for (var pixel of image.values()){
    var px = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) /3;
    pixel.setRed(px);
    pixel.setGreen(px);
    pixel.setBlue(px);
    
  }
  var c2 = document.getElementById("c2");
  var image2 = image;
  image2.drawTo(c2);
}
/* Blurs the image */
function Blur(){
  function ensureInImage(coordinate, size){
    if (coordinate < 0 ) {
      return 0;
    }
    if (coordinate >= size){
      return size - 1;
    }
    return coordinate;
  }
  function getPixelNearby (image, x, y, diameter){
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, image.getWidth());
    var ny = ensureInImage(y + dy, image.getHeight());
    return image.getPixel(nx, ny);
  }
  
  var output = new SimpleImage(image.getWidth(), image.getHeight());
  
  for (var pixel of image.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random() > 0.5) {
      var other = getPixelNearby(image, x, y, 10);
      output.setPixel(x, y, other);
    }
    else {
      output.setPixel(x, y, pixel);
    }
  }
  var c2 = document.getElementById("c2");
  var image2 = output;
  image2.drawTo(c2);
}

/* create a Red Hue */
function redHue() {
  for (var pixel of image.values()) {
    var avg =
        (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) /3;
    if (avg < 128){
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
  }
  var c2 = document.getElementById("c2");
  var image2 = image;
  image2.drawTo(c2);
    
  
}
