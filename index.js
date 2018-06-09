var renderer,camera,scene;

init();
animate();
 
function init() {
 
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set( 0, 0, 100 );
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
    
    scene = new THREE.Scene();
    
    var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    var firstLineGeomtry = new THREE.Geometry();
    var firstPoint = new THREE.Vector3(0,0,0);
    var secondPoint = new THREE.Vector3(15,15,0);
    var thirdPoint = new THREE.Vector3(15,0,0);
    firstLineGeomtry.vertices.push(firstPoint);
    firstLineGeomtry.vertices.push(secondPoint);
    var line = new THREE.Line( firstLineGeomtry, material );
    

    var secondLineGeometry = new THREE.Geometry();
    secondLineGeometry.vertices.push(firstPoint);
    secondLineGeometry.vertices.push(thirdPoint);
    var secondLine = new THREE.Line(secondLineGeometry,material);

    scene.add(line);
    scene.add(secondLine);

    // Snap to 5 degree increments
    var angleInDegrees = fromRadToDegrees(calculateIncidentAngle(firstPoint.x,firstPoint.y,secondPoint.x,secondPoint.y));

    if (angleInDegrees%5!=0){
        var remainder = angleInDegrees % 5;
        var changeInTheta = fromDegreesToRad(5 - remainder);
       secondPoint.applyAxisAngle(new THREE.Vector3(0,0,1),changeInTheta);    
        
    }
}


function calculateIncidentAngle(x1,y1,x2,y2){
    var slope = (y2-y1) / (x2-x1);
    return Math.atan(slope);
}

function fromRadToDegrees(rad){
    return rad * 180 / Math.PI;
}
function fromDegreesToRad(degree){
    return degree * Math.PI / 180;
}

function calculateDistance(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(y2-y1,2)+Math.pow(x2-x1,2));
}
 
function animate() {
 
    requestAnimationFrame( animate );

    renderer.render( scene, camera );
 
};