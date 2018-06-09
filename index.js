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
    var secondPoint = new THREE.Vector3(7,8,0);
    var thirdPoint = new THREE.Vector3(-5,-5,0);
    firstLineGeomtry.vertices.push(firstPoint);
    firstLineGeomtry.vertices.push(secondPoint);
    var line = new THREE.Line( firstLineGeomtry, material );
    

    var secondLineGeomtry = new THREE.Geometry();
    secondLineGeomtry.vertices.push(firstPoint);
    secondLineGeomtry.vertices.push(thirdPoint);
    var secondLine = new THREE.Line(secondLineGeomtry,material);

    //slope = (deltaY/deltaX);
    // slope = tan(theta);
    // y2-y1/x2-x1 = tan(45);
    // 2-y1/2-x1 = tan(45);
    //

    scene.add(line);
    scene.add(secondLine);

    // Snap to 5 degree increments
    var angleInDegrees = fromRadToDegrees(calculateIncidentAngle(firstPoint.x,firstPoint.y,secondPoint.x,secondPoint.y));

    if (angleInDegrees%5!=0){
        var remainder = angleInDegrees % 5;
        var changeInTheta = fromDegreesToRad(5 - remainder);
        console.log(fromRadToDegrees(changeInTheta));
        //cos(theta) = A/H where H = calculateDistance
        // X = calculateDistance * cos(angle);
        // Y = calculateDistance * sin(angle);
        /*
        * x′=x×cos(β)−y×sin(β)
        * y′=y×cos(β)+x×sin(β)
        */
       secondPoint.applyAxisAngle(new THREE.Vector3(0,0,1),changeInTheta);    
        
    }
    //Calculate angle between vectors
    //console.log(secondPoint.angleTo(thirdPoint));
    

}

function calculate2DAngle(vector1,vector2){
    //cos(theta) = (vector1 dot vector2) / (length vector1) * (length vector2)
    
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