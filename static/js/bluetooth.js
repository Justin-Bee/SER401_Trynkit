/*
 * Function for the web bluetooth functionality
 * this opens a popup window automatically that shows devices
 * and allows the user to select and pair.
 */

function bluetooth(){
    // navigator.bluetooth.requestDevice({
    //     acceptAllDevices: true //this will show all devices that have bluetooth enabled
         /* for later iterations we cna specify the type of device so we only see dev boards
         * we will have to code the dev boards with an identifier we can filter
         *
         * filters:[{
         *   name: 'pyBoard'}]
         */
  //   })
 //    .then(device => { device.name })
//     .catch(error => { console.log(error);});

 
     var x = document.getElementById('devices');
     var y = document.getElementById('editor');
     var z = document.getElementById('console');
  //   x.innerHTML='<object type="text/html" data="/static/devices.html"></object>';
     if (z.style.display ==="none"){
         z.style.display = "block";
     }else{
     }
     
     z.innerHTML= z.innerHTML + "\n"+ ('Requesting Bluetooth Devices');
     navigator.bluetooth.requestDevice({
     filters:[{
     name: 'pyBoard'}]
     })
     .then(device=>{
     z.innerHTML= z.innerHTML +"\n"+  (">Name:" + device.name);
     z.innerHTML= z.innerHTML + "\n"+ (">id:" + device.id);
     })
     .catch(error=> {
     z.innerHTML= z.innerHTML + "\n"+ (error);
     });
     }