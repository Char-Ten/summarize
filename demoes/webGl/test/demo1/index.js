(function() {
    var cvs = document.getElementById('cvs');
    gl = cvs.getContext("webgl") || cvs.getContext("experimental-webgl");
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

})();