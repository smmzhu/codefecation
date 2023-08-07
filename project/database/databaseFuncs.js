import firebase from './firebase';
import {Alert, fetch} from 'react-native';
import axios from 'axios';
// import Config from 'react-native-config';
// import { generatePrompt } from './api/openai';
// import env from '../../config/env.js';

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

function generatePrompt(reviewTexts) {
  return `Summarize these reviews into 350 characters: ${reviewTexts}`;
}

async function getReviewSummary(inputRevs) {
  console.log("inputRevs in getReviewSummary: ", inputRevs);

  // const apiKey = process.env.OPENAI_API_KEY;
  const apiKey = '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';
  // const apiURL = 'https://api.openai.com/v1/engines/davinci/completions';
  const apiURL = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

  try {
    const response = await axios.post(apiURL, {
      prompt: generatePrompt(inputRevs),
      max_tokens: 120,
      temperature: 0.7,
      }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        },
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    let data = response.data.choices[0].text;
    data = data.replace(/(^\s+|\s+$)/g,'').replace(/(\s+|\n+)/g,' ');
    console.log("OPENAI DATA: ", data);
    return data;
    
  } catch(error) {
    // Consider implementing your own error handling logic here
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
    console.error(error);
    Alert.alert(error.message);
  }
}

const addReview = async (db, userID, bathroomID, review) => { //type signature: {db: DB object, bathroomObj: object} => bathroomObject
  console.log("bathroomID:", bathroomID);
  console.log("userID:", userID);

  const oldReview = review;
  //get rid of whitespaces at the beginning, the end, and reduce any duplicate spaces or \n characters in the middle to one
  review.reviewText = review.reviewText.replace(/(^\s+|\s+$)/g,'').replace(/(\s+|\n+)/g,' ');

  const bathroomRef = db.collection("bathrooms").doc(bathroomID);
  await bathroomRef.get().then( async (docSnapshot) => {
    if (docSnapshot.exists) {
      const bathroomData = docSnapshot.data();
  
      // Add the review to the bathroom's reviews array
      const existingReview = bathroomData.reviews.find(review => review.userID === userID);
      if (existingReview) {
        // replace the review
        const index = bathroomData.reviews.findIndex(review => review.userID === userID);
        bathroomData.reviews[index] = review;
        db.collection("bathrooms").doc(bathroomID).set(bathroomData,{merge: false}).then(() => {
          console.log("Review successfully overwritten!22");
        })
        .catch((error) => {
          console.error("Error overwriting review: ", error);
        });
      } else {
        console.log("169", bathroomData.reviews);
        bathroomData.reviews.push(review);
        console.log("170", bathroomData.reviews);
        console.log("bathroomID", bathroomID);
        db.collection("bathrooms").doc(bathroomID).set(bathroomData,{merge: false})
        .then(() => {
          console.log("Review successfully written!");
        })
        .catch((error) => {
          console.error("Error writing review: ", error);
        });
      }

      // Update the bathroom's ratings
      // let bathroomData2 = docSnapshot.data();
      const numRatings = bathroomData.reviews.length || 0;
      const overallRating = bathroomData.ratings.overallRating || 0;
      const cleanlinessRating = bathroomData.ratings.cleanRating || 0;
      const boujeenessRating = bathroomData.ratings.boujeeRating || 0;

      const oldNumRatings = numRatings - 1;
      const newOverallRating = (overallRating*oldNumRatings + review.overallRating)/numRatings;
      const newCleanlinessRating = (cleanlinessRating*oldNumRatings + review.cleanRating)/numRatings;
      const newBoujeenessRating = (boujeenessRating*oldNumRatings + review.boujeeRating)/numRatings;
      console.log("newOverallRating", newOverallRating);
      console.log("newCleanlinessRating", newCleanlinessRating);
      console.log("newBoujeenessRating", newBoujeenessRating);
      bathroomData.ratings = {
        overallRating: newOverallRating,
        cleanRating: newCleanlinessRating,
        boujeeRating: newBoujeenessRating,
      };
      console.log("overallRating", overallRating);
      console.log("cleanlinessRating", cleanlinessRating);
      console.log("boujeenessRating", boujeenessRating);
      await bathroomRef.set(bathroomData, {merge: false});
      console.log("Ratings updated successfully!");
      // updateRating(db, bathroomID, review);

      // getReviewTexts
      let inputRevs = [];
      const reviews = bathroomData.reviews;
      for (const review of reviews) {
        inputRevs.push(review.reviewText);
      }
      console.log("inputRevs length: ", inputRevs.length);

      // getReviewSummary from OpenAI
      let revSummary = "";
      if (inputRevs.length > 100) {
        revSummary = await getReviewSummary(inputRevs);
      }
      console.log("revSummary:", revSummary);

      // Update the bathroom's review summary
      // const bathroomRef = db.collection("bathrooms").doc(bathroomID);
      bathroomData.reviewSummary = revSummary;
      await bathroomRef.set(bathroomData, {merge: true});
      // writeReviewSummary(db, bathroomID);
    }
  }).catch((error) => {
    console.error("Error getting bathroom: ", error);
  });
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



export {getBathroomFromDB, getBathroomFeature, setBathroomToDB, updateBathroomFeature, addReview, incCount}; //getReviewTexts