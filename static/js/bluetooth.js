
/* constant for the service UUID */
const service = 0x1825;
/* variable so we can tell if the device is connected */
var isConnected = 0;

/*
 * bluetooth()
 * Function for the web bluetooth functionality
 * this opens a popup window automatically that shows devices
 * and allows the user to select and pair.
 */

function bluetooth(){

     const z = document.getElementById('debugger');

     if (z.style.display ==="none"){
         z.style.display = "block";
     }else{
     }
     
     z.innerHTML= z.innerHTML + "\n"+ ('Requesting Bluetooth Devices');
     navigator.bluetooth.requestDevice({
      // acceptAllDevices: true
     filters:[{
     name: 'MicroTrynkit'
          }]
    })
     .then(device=>{
     z.innerHTML = z.innerHTML + "\n"+  ("Connected to: ");
     z.innerHTML= z.innerHTML +"\n"+  (">Name:" + device.name);
     z.innerHTML= z.innerHTML + "\n"+ (">id:" + device.id);
     isConnected = 1;
    // return device.gap.connect();

     })
     .catch(error=> {
     z.innerHTML= z.innerHTML + "\n"+ (error);
     });
     }

/*
 * bleSend()
 * This function is to send files to the ESP32 device.
 * Is called by the send file button in the menu.
 *
 * Author: Justin Bee
 */
function bleSend() {
     /* check if the device is connected if true send file*/
     if(isConnected){

     }else{
        alert("MicroTrynkit device not connected. Please pair it first.");
    }
}

/*
 * bleConsole()
 * This function is to access the REPL of the ESP32 device.
 * Called by the console button in the menu.
 *
 * Author: Justin Bee
 */
function bleConsole(){
    const y = document.getElementById('serial')
    /* check if the device is connected if true send file*/
     if(isConnected){

     }else{
         const x = document.getElementById('console');
         x.style.display ="none";
        alert("MicroTrynkit device not connected. Please pair it first.");
     }

}