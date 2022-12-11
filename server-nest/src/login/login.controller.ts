import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { Login, LoginResponse } from './login.dto';
import { UserCredential } from '@firebase/auth';
import { DocumentData } from '@firebase/firestore';
import { ApiTags } from '@nestjs/swagger';

@Controller('/login')
@ApiTags('Login')
export class LoginController {
    @Post()
    @HttpCode(HttpStatus.OK)
    async login(@Body() login: Login): Promise<any> {
        return signInWithEmailAndPassword(auth, login.email, login.password)
            .then((userCredential) => {
                const userCollection = collection(firestore, 'userData');
                return getDoc(doc(userCollection, userCredential.user.uid))
                    .then((userInfo) => {
                        return {
                            userCredentials: userCredential,
                            userData: userInfo.data(),
                        };
                    })
                    .catch((error) => {
                        throw new UnauthorizedException(error);
                    });
            })
            .catch((error) => {
                throw new UnauthorizedException(error);
            });
    }
}
