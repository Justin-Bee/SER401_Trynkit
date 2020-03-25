
/* constant for the service UUID */
const service = 0x1825;
/* constant for the TX characteristic */
const TX_char =  '30ff6dae-fbfe-453b-8a99-9688fea23832';
let TX_characteristic;
/* constant for the RX characteristic */
const RX_char = 'fbdf3e86-c18c-4e5b-aace-e7cc03257f7c';
let RX_characteristic;
/* variable so we can tell if the device is connected */
var isConnected = 0;

/* variable for the device */
let bledevice;
/* variable for the ble server */
let bleserver;
/* variable for the object transfer service */
let objservice;

/*
 * bluetooth()
 * Function for the web bluetooth functionality
 * this opens a popup window automatically that shows devices
 * and allows the user to select and pair.
 *
 * Author: Justin Bee
 */
function bluetooth(){

     if (!navigator.bluetooth) {
        return alert('Web Bluetooth API is not available in this browser. Please use chrome.');
     }
     const z = document.getElementById('debugger');
     const y = document.getElementById('serial')

     if (z.style.display ==="none"){
         z.style.display = "block";
     }else{
     }
     
     z.innerHTML= z.innerHTML + "\n"+ ('Requesting Bluetooth Devices');
     navigator.bluetooth.requestDevice({
     filters:[{
     name: 'MicroTrynkit',
          }],
          optionalServices: [service]
    })
     .then(device=>{
     z.innerHTML = z.innerHTML + "\n"+  ("Connected to: ");
     z.innerHTML= z.innerHTML +"\n"+  (">Name:" + device.name);
     z.innerHTML= z.innerHTML + "\n"+ (">id:" + device.id);
     isConnected = 1;
     bledevice = device;
     return device.gatt.connect();
     })
         .then(server=>{
             bleserver = server;
             return server.getPrimaryService(service);
         })
         .then(service => {
             return service.getCharacteristic(RX_char)
             .then(characteristic => {
                 console.log("RX char data:");
                 console.log(characteristic);
                 RX_characteristic = characteristic;
                 return service.getCharacteristic(TX_char);
             })
         })
         .then(characteristic => {
             console.log("TX char data");
             console.log(characteristic);
             TX_characteristic = characteristic;
             /* add an event listener to the TX characteristic */
            // TX_characteristic.addEventListener('valueUpdate', handleValueUpdated);
             return characteristic;
             TX_characteristic.readValue();
         })
         .then( value =>{
             /* try to read from the device and print to console */
             TX_characteristic.readValue();
          //   y.innerText = value.getUint8(0);
             console.log(value.getUint8(0));
         })
     .catch(error=> {
     z.innerHTML= z.innerHTML + "\n"+ (error);
     });
}

/*
 * handleValueUpdated
 *
 */
function handleValueUpdated(event) {
  //console.log(event.isReadResponse) /* Returns true if stored value comes from a read operation */
  console.log("TX characteristic"); /* Characteristic value */
  var value = event.target.value;
  var data = new Uint8Array(value.buffer);
  temp = new TextDecoder("utf-8").decode(data);
  bleConsole(event.target.value.getUint8(0));
  console.log(temp);
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
    let encoder = new TextEncoder('utf-8');

    if(isConnected){
        /* send an erase command so that the file gets started fresh */
        RX_characteristic.writeValue(encoder.encode("erase"));
         for(let a = 0; a<3000; a++){
                console.log("")
            }
         /* get the contents of the editor that is in use */
        let editorContents = editor.getValue();
        /* send the contents to the device */
        //split the editor contents into newlines.
        temp = editorContents.split(/\n/);
        for(let i=0; i<temp.length; i++ )
        {
            //console.log(temp[i]);
            RX_characteristic.writeValue(encoder.encode(temp[i]));
            // delay to allow the device to handle the write
            for(let a = 0; a<2500; a++){
                console.log("")
            }
        }
        alert("File Uploaded!")
     }else{
        const x = document.getElementById('console');
        alert("MicroTrynkit device not connected. Please pair it first.");
     }
    //disconnect required for the device, device sees the disconnect then reboots which causes the code to run
    bledevice.gatt.disconnect();
}

/*
 * bleConsole()
 * This function is to access the REPL of the ESP32 device.
 * Called by the console button in the menu.
 *
 * Author: Justin Bee
 */
function bleConsole(value){
    const y = document.getElementById('serial')
    /* check if the device is connected if true send file*/
     if(isConnected){
         /* need to read the value of the TX_char
          * may need some kind of loop or trigger to watch if new data comes in????
          * not sure what I want to implement for this yet....
          */
       //  y.innerText = TX_characteristic.readValue(); TODO does not work
     }else{
         const x = document.getElementById('console');
         x.style.display ="none";
        alert("MicroTrynkit device not connected. Please pair it first.");
     }

}

