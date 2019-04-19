import firebase from 'firebase';
import axios from 'axios';
export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "445322544962"
  });

  navigator.serviceWorker
    .register('/my-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });
}

export const askForPermissioToReceiveNotifications = async (userdate,title,description) => {
  try {
    console.log("userdateuserdateuserdate==>",userdate);
    
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token:============>', token);
    var date = new Date()
    console.log("date-->0", date);
    var date1 = new Date(userdate)
    console.log("date1111-->0", date1);
   
    var diff = Math.abs(date1 - date);
    console.log("diff----->", diff);
    
    setTimeout(() => {

      var data = {
        "notification": {
          "title": title,

          "body": description,
          // "click_action": "http://localhost:3000/",
          // "icon": "http://url-to-an-icon/icon.png"
        },
        "to": token
        // "cJCMyRmVwkc:APA91bEtLJYGyezRhjwsKXDCiPEBbg5Mj6aJljc1N-dXZeQP64ripxpIAcVljc4KcT4jog_3P7w0BoVeipgNplLoyXem6FYKuAaOvDRnfyCFSCZdlTaXtaW8tYXT71nZzbEuBF_LKJAf"
      }
      passmessage(data)
     
    },diff);
    return diff;

  } catch (error) {
    console.error("errorrrrrrrrrrrrrrrrrr", error);
  }
}

function passmessage(data) {
  try {
    axios.post('https://fcm.googleapis.com/fcm/send', data, { headers: { 'Authorization': "key=AAAAZ69Kx0I:APA91bHpb-owbxF7KCqv9zdjNssxyTqCfpxDAokDDj-5FR5JiDh8Sc29MWMDlKCrmaIA-lFAXsNBqAAh0860rlaIb3aigyIumygVqrBTpHIBgTgtFFo8gRaIpWxAl6WnVFO5yo3OX3I0" } })
      .then((res) => {
        //return res;
        console.log("res----->", res);
      })
      .catch((err) => {
        console.log("errors==>", err);

      })
  } catch (error) {
    console.log("Error in resetpassword in userservices..");

  }
}

