import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const createButton = document.querySelector('.form');
const radioButtons = document.querySelectorAll('input[type="radio"][name="state"]');
const delayInput = document.querySelector('input[type="number"][name="delay"]');


let radioValue = ""


radioButtons.forEach(radio => {
  radio.addEventListener('change', function() {
   radioValue = radio.value
  });
});


   createButton.addEventListener('submit', event => {
    event.preventDefault();
        /*const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
              if (radioValue = "fulfilled"){
                resolve(`✅ Fulfilled promise in ${delayInput}ms`);
              } else {
                reject(`❌ Rejected promise in ${delay}ms`);
              }
            }, delayInput.value);
          });
          
          // Registering promise callbacks
          promise
            .then(value => console.log(value)) // "Success! Value passed to resolve function"
            .catch(error => console.log(error)) // "Error! Error passed to reject function"
 */
            const makePromise = new Promise((resolve, reject) => {                
                  setTimeout(() => {
                          if(radioValue === "fulfilled") {
                              resolve(`✅ Fulfilled promise in ${delayInput.value}ms`)
                          } else  {
                              reject(`❌ Rejected promise in ${delayInput.value}ms`)
                          }
                    
                      }, delayInput.value);
                });
           

              makePromise
	          .then((message) => {
                iziToast.show({
                    message: message,
                    position: 'topRight',
   })})
               
	          .catch((error) => {
                iziToast.show({
                    message: error,
                    position: 'topRight',
   })})
      });
      