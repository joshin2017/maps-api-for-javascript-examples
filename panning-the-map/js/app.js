
/**
 * Pan the map so that it is continually in motion
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function panTheMap(map) {
  var viewPort,
      incX = 1,
      incY = 2,
      x = 100,
      y = 100;

  // Obtain the view port object of the map to manipulate its screen coordinates
  var viewPort = map.getViewPort(),
      // function calculates new screen coordinates and calls
      // viewport's interaction method with them
      pan = function() {
        x = x + incX;
        if (Math.abs(x) > 100) {
          incX = -incX;
        }

        y = y + incY;
        if (Math.abs(y) > 100) {
          incY = -incY;
        }

        viewPort.interaction(x, y);
      };

  // set interaction modifier that provides information which map properties
  // change with each "interact" call
  viewPort.startInteraction(H.map.render.RenderEngine.InteractionModifiers.COORD);
  // set up simple animation loop
  setInterval(pan, 15);
}

/**
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform
var platform = new H.service.Platform({
  app_id: '{YOUR_APP_ID}',
  app_code: '{YOUR_APP_CODE}',
  useCIT: true,
  useHTTPS: true
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over New Delhi
var map = new H.Map(document.getElementById('map'),
  defaultLayers.normal.map,{
  center: {lat: 19.11, lng: 72.89},
  zoom: 4
});

panTheMap(map);