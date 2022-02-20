main();

function main() {
  const canvas = document.querySelector("#glcanvas");

  const gl = canvas.getContext("webgl");

  if (!gl) {
    alert("Unable to setup webgl");
    return;
  }

  var vertices = [0.0, 0.0, 0.0, 0.5, -0.5, 0.0, 1.0, 1.0, 0.0];

  var vertex_buffer = gl.createBuffer();

  //   Bind array buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  //   Pass vertex data to buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // Unbind buffer once its done
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  //   Setup shaders
  var vertCode =
    "attribute vec3 coordinates;" +
    "void main(void)" +
    "{" +
    " gl_Position = vec4(coordinates, 1.0);" +
    "gl_PointSize = 10.0;" +
    "}";

  // Create vertShader object
  var vertShader = gl.createShader(gl.VERTEX_SHADER);

  gl.shaderSource(vertShader, vertCode);

  // Compile the shader
  gl.compileShader(vertShader);

  // Do the same with fragment shader
  var fragCode =
    "void main(void)" + "{" + " gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);" + "}";

  var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(fragShader, fragCode);

  gl.compileShader(fragShader);

  // Create shader program
  var shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertShader);

  gl.attachShader(shaderProgram, fragShader);

  gl.linkProgram(shaderProgram);

  gl.useProgram(shaderProgram);

  // bind vertex buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  // get buffer location
  var coord = gl.getAttribLocation(shaderProgram, "coordinates");

  // point the attribute to the vertex buffer object that is currently loaded
  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(coord);

  gl.clearColor(1.0, 0.0, 0.0, 1.0);

  gl.enable(gl.DEPTH_TEST);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.viewport(0, 0, canvas.width, canvas.height);

  gl.drawArrays(gl.POINTS, 0, 3);
}
