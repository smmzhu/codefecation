import * as geofire from 'geofire-common';
import { getBathroomFromDB } from './databaseFuncs';
function geoquery(db){
    // Find cities within 50km of London
    const center = [34.404834, -119.844177];
    const radiusInM = 50 * 1000;

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];

    for (const b of bounds) {
    const q = db.collection('bathrooms')
        .orderBy('coords.geohash')
        .startAt(b[0])
        .endAt(b[1]);

    promises.push(q.get());
    }

    // Collect all the query results together into a single list
    Promise.all(promises).then((snapshots) => {
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

    return matchingDocs;
    }).then((matchingDocs) => { 
        for (let i = 0; i < matchingDocs.length; i++){
            const bathroom = matchingDocs[i].data();
            console.log(bathroom);
        }
        console.log(matchingDocs.length);
    });
    }

export default geoquery;