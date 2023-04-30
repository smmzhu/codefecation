import firebase from '../database/firebase';
import {Alert} from 'react-native';

const getBathroomFromDB = async (db, bathroomID) => { //type signature: {db: DB object, bathroomID: string} => bathroomObject
    return await db.collection("bathrooms").doc(bathroomID).get()
        .then(async (doc) => {return doc.data(); })
        .catch((error) => {console.log("Error getting document:", error);});
}
const getBathroomFeature = (bathroomObj, feature) => { //type signature: {bathroomObj: object, feature: string} => object
    return bathroomObj[feature];
}

const setBathroomToDB = async (db, bathroomObj) => { //type signature: {db: DB object, bathroomObj: object} => bathroomObject
    console.log("bathroomObj.bathroomID:", bathroomObj.bathroomID);
    db.collection("bathrooms").doc(bathroomObj.bathroomID).set(bathroomObj,{merge: false})
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
      
    // *** this is the review part of the bathroom, but its a tad complicated rn so i'll leave it out for now  
    //   db.collection("bathrooms").doc("bathroomID").collection("reviews").doc("reviewID").set({
    //     reviewID: "reviewID",
    //     userID: "andrew69420",
    //     overallRating: 3,
    //     cleanRating: 2,
    //     boujeeRating: 4,
    //     reviewText: "lorem ipsum dolor sit amet fuck all i hate react"
    //   }).then(() => {
    //     console.log("Document successfully written!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });
    return bathroomObj;
}

const updateBathroomFeature = (bathroomObj, feature, val) => { //type signature: {bathroomObj: object, feature: string, val: any} => object
    if (typeof(bathroomObj[feature]) != typeof(val)){
        throw TypeError("(sam was too lazy to write rigorous type checks, but clearly the types dont match so theres a prob");
    }
    else{
        bathroomObj[feature] = val;
    }
    return bathroomObj;
}

const addReview = async (db, userID, bathroomID, review) => { //type signature: {db: DB object, bathroomObj: object} => bathroomObject
  console.log("bathroomID:", bathroomID);
  console.log("userID:", userID);

  const oldReview = review;
  //get rid of whitespaces at the beginning, the end, and reduce any duplicate spaces or \n characters in the middle to one
  review.reviewText = review.reviewText.replace(/(^\s+|\s+$)/g,'').replace(/(\s+|\n+)/g,' ');
  console.log(review);

  const bathroomRef = db.collection("bathrooms").doc(bathroomID);

  bathroomRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      const bathroomData = docSnapshot.data();
      console.log("bathroomData:", bathroomData);
      const existingReview = bathroomData.reviews.find(review => review.userID === userID);
      console.log("existingReview:", existingReview);
      if (existingReview) {
        // replace the review
        const index = bathroomData.reviews.findIndex(review => review.userID === userID);
        bathroomData.reviews[index] = review;
        db.collection("bathrooms").doc(bathroomID).set(bathroomData,{merge: false}).then(() => {
          console.log("Review successfully overwritten!");
        })
        .catch((error) => {
          console.error("Error overwriting review: ", error);
        });
      } else {
        bathroomData.reviews.push(review);
        db.collection("bathrooms").doc(bathroomID).set(bathroomData,{merge: false})
        .then(() => {
          console.log("Review successfully written!");
        })
        .catch((error) => {
          console.error("Error writing review: ", error);
        });
    }}
  })
}

export {getBathroomFromDB, getBathroomFeature, setBathroomToDB, updateBathroomFeature, addReview};