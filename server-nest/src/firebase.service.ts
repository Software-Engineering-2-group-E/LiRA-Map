//Author(s) s184234, s184230

// Currently just a showcase of how to communicate w. Firestore

import { firestore } from './firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Logger } from '@nestjs/common';

const testCollectionRef = collection(firestore, 'test-collection');

export const RetrieveTestData = async () => {
    const querySnapshot = await getDocs(testCollectionRef);
    querySnapshot.forEach((doc) => {
        Logger.log(`Found document (${doc.id},${doc.data()})`);
    });
};
