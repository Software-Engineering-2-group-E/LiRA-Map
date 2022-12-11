import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { Signup } from '../models';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, setDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { UserCredential } from 'firebase/auth';
import firebase from 'firebase/compat';
import FirebaseError = firebase.FirebaseError;
import { ApiTags } from '@nestjs/swagger';

@Controller('/signup')
@ApiTags('Signup')
export class SignupController {
    @Post()
    async signup(@Body() signup: Signup): Promise<string> {
        let userResponse = {};
        let userCreds: UserCredential;
        await createUserWithEmailAndPassword(
            auth,
            signup.email,
            signup.password,
        ).then((userCredentials) => (userCreds = userCredentials));
        await this.createUser(signup, userCreds)
            .then((r) => {
                if (r) {
                    userResponse = {
                        userCredentials: userCreds,
                        userData: signup,
                    };
                }
            })
            .catch((error: FirebaseError) => {
                throw new HttpException(error.message, HttpStatus.CONFLICT);
            })
            .catch((error) => {
                throw new HttpException(error, HttpStatus.BAD_REQUEST);
            });
        // console.log(userResponse);
        return JSON.stringify(userResponse);
    }

    async createUser(
        signupData: Signup,
        user: UserCredential,
    ): Promise<boolean> {
        let returnValue = false;
        const userCollection = collection(firestore, 'userData');
        const userdata = {
            firstName: signupData.firstName,
            lastName: signupData.lastName,
        };
        await setDoc(doc(userCollection, user.user.uid), userdata).then((r) => {
            returnValue = true;
        });
        return returnValue;
    }
}
