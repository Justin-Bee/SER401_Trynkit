/*
 * Function for the web bluetooth functionality
 * this opens a popup window automatically that shows devices
 * and allows the user to select and pair.
 *
 * Author: Justin Bee
 */
/* constant for the service UUID */
const service = 0x1825;

function bluetooth(){
 
     var x = document.getElementById('devices');
     var y = document.getElementById('editor');
     var z = document.getElementById('debugger');
     if (z.style.display ==="none"){
         z.style.display = "block";
     }else{
     }
     z.innerHTML= z.innerHTML + "\n"+ ('Requesting Bluetooth Devices');
     navigator.bluetooth.requestDevice({
     filters:[{
     name: 'MicroTrynkit'

          }]
    })
     .then(device=>{
     z.innerHTML = z.innerHTML + "\n"+  ("Connected to: ");
     z.innerHTML= z.innerHTML +"\n"+  (">Name:" + device.name);
     z.innerHTML= z.innerHTML + "\n"+ (">id:" + device.id);
     return device.gap.connect();
     })
         .then(server=>{/*...*/})
     .catch(error=> {
     z.innerHTML= z.innerHTML + "\n"+ (error);
     });
     }