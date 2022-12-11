import { ApiProperty } from '@nestjs/swagger';
import { DocumentData } from '@firebase/firestore';
import { UserCredential } from '@firebase/auth';

export class Login {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}

export class LoginResponse {
    @ApiProperty()
    userCredentials: DocumentData;
    @ApiProperty()
    userData: UserCredential;
}
