import * as geofire from 'geofire-common';
import { getBathroomFromDB } from './databaseFuncs';
const kNearestToilets = async (db, k, myCenter, myRadiusInM) => {

    const center = myCenter; //[34.404834, -119.834200] should theoretically return 564738...
    const radiusInM = myRadiusInM; //in meters (it was 50km in the example)

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = await geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];

    for (const b of bounds) {
    const q = await db.collection('bathrooms')
        .orderBy('coords.geohash')
        .startAt(b[0])
        .endAt(b[1]);

    await promises.push(q.get());
    }

    // Collect all the query results together into a single list
    const result = await Promise.all(promises).then((snapshots) => {
        const matchingDocs = [];

        for (const snap of snapshots) {
            for (const doc of snap.docs) {
            const lat = doc.get('coords.lat');
            const lng = doc.get('coords.long');

            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = geofire.distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
                matchingDocs.push(doc);
            }
            }
        }
        const toilets = sortKToilets(matchingDocs, center, k).map((doc) => {return doc.data()}); 
        return toilets;
        }).then(async (toilets) => { 
            return toilets;
    });
    return result;
}

    // var tenClosest = tenClosestCoordinates(mapPts, [mapRegion.latitude, mapRegion.longitude]); //HOW TO USE

function sortKToilets(listOfPoints, center, k) {
    const sortedListOfPoints = listOfPoints.sort((a, b) => {
    const distanceA = getDistanceFromLatLonInKm(a.data().coords.lat, a.data().coords.long, center[0], center[1]);
    const distanceB = getDistanceFromLatLonInKm(b.data().coords.lat, b.data().coords.long, center[0], center[1]);
    return distanceA - distanceB;
    }); // sort the list of coordinates based on distance from the constant point
    
    return sortedListOfPoints.slice(0, k); // return the first 10 elements of the sorted list
}

// Helper function to calculate distance between two sets of coordinates using the Haversine formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

export default kNearestToilets;