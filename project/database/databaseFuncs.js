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

const updateRating = async (db, bathroomID, newReview) => {
  const bathroomRef = db.collection("bathrooms").doc(bathroomID);
  await bathroomRef.get().then(async (docSnapshot) => {
    if (docSnapshot.exists) {
      let bathroomData = docSnapshot.data();
      const numRatings = bathroomData.reviews.length || 0;
      const overallRating = bathroomData.ratings.overallRating || 0;
      const cleanlinessRating = bathroomData.ratings.cleanRating || 0;
      const boujeenessRating = bathroomData.ratings.boujeeRating || 0;

      const oldNumRatings = numRatings - 1;
      const newOverallRating = (overallRating*oldNumRatings + newReview.overallRating)/numRatings;
      const newCleanlinessRating = (cleanlinessRating*oldNumRatings + newReview.cleanRating)/numRatings;
      const newBoujeenessRating = (boujeenessRating*oldNumRatings + newReview.boujeeRating)/numRatings;
      console.log(newOverallRating);
      console.log(newCleanlinessRating);
      console.log(newBoujeenessRating);

      bathroomData.ratings = {
        overallRating: newOverallRating,
        cleanRating: newCleanlinessRating,
        boujeeRating: newBoujeenessRating,
      };
      console.log(overallRating);
      console.log(cleanlinessRating);
      console.log(boujeenessRating);
      await bathroomRef.set(bathroomData, {merge: false});
      console.log("Ratings updated successfully!");
    } else {
      console.error("Bathroom not found!");
    }
  }).catch((error) => {
    console.error("Error updating ratings: ", error);
  });
};

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
      const existingReview = bathroomData.reviews.find(review => review.userID === userID);
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
    }
    updateRating(db, bathroomID, review);
    }
  })
}

const incCount = async (db, bathroomID, userID, feature) => {
  console.log("userID",userID);
  console.log("feature",feature);
  const bathroomRef = db.collection("bathrooms").doc(bathroomID);
  bathroomRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      const bathroomData = docSnapshot.data();
      if (!bathroomData.status[feature]) {
        bathroomData.status[feature] = [];
      }
      if ((bathroomData.status["yesCount"].includes(userID) && feature === "yesCount") || (bathroomData.status["noCount"].includes(userID) && feature === "noCount")) {
        Alert.alert("You have already voted on this restroom!");
      } else if (bathroomData.status["yesCount"].includes(userID) && feature === "noCount") {
        bathroomData.status["yesCount"].splice(bathroomData.status["yesCount"].indexOf(userID), 1);
        bathroomData.status["noCount"].push(userID);
        if (bathroomData.status["noCount"].length > 10) {
          bathroomData.status.validBathroom = false;
        }
        db.collection("bathrooms").doc(bathroomID).set(bathroomData,{merge: false})
        .then(() => {
          console.log("User successfully added to count!");
        })
        .catch((error) => {
          console.error("Error adding user to count: ", error);
        });
      } else if (bathroomData.status["noCount"].includes(userID) && feature === "yesCount") {
        bathroomData.status["noCount"].splice(bathroomData.status["noCount"].indexOf(userID), 1);
        bathroomData.status["yesCount"].push(userID);
        if (bathroomData.status["yesCount"].length > 10) {
          bathroomData.status.validBathroom = true;
        }        
        db.collection("bathrooms").doc(bathroomID).set(bathroomData,{merge: false})
        .then(() => {
          console.log("User successfully added to count!");
        })
        .catch((error) => {
          console.error("Error adding user to count: ", error);
        });
      } else {
        bathroomData.status[feature].push(userID);
        if (bathroomData.status["yesCount"].length > 10) {
          bathroomData.status.validBathroom = true;
        } else if (bathroomData.status["noCount"].length > 10) {
          bathroomData.status.validBathroom = false;
        }
        db.collection("bathrooms").doc(bathroomID).set(bathroomData,{merge: false})
        .then(() => {
          console.log("User successfully added to count!");
        })
        .catch((error) => {
          console.error("Error adding user to count: ", error);
        });
    }}
  })
}

export {getBathroomFromDB, getBathroomFeature, setBathroomToDB, updateBathroomFeature, addReview, incCount};