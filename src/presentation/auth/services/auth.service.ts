
import  { envs } from '../../../config/';
import { CustomError, RegisterUserDto, UserEntity } from '../../../domain';
import { AuthRepository } from '../../../domain/repositories/auth.repository';
import { JwtAdapter, bcryptAdapter } from '../../../config'
import { LoginUserDto } from '../../../domain/dtos/auth/login-user.dto';
import { EmailService, SendMailOptions } from './email.service';

export class AuthService {

    private readonly authRepository : AuthRepository;


    constructor(authRepository : AuthRepository,
        private readonly emailService : EmailService) {
        this.authRepository = authRepository;
    }

    registerUser = async (registerUserDto : RegisterUserDto) => {
   
        const user = await this.authRepository.findByEmail(registerUserDto.email);

        if(user) throw CustomError.badRequest('Email Already Existe');

        try {
            const responseUser = await this.authRepository.create(registerUserDto);

            //Envio de Correo
            await this.sendEmailValidationLink(registerUserDto.email);

            const {password,...userEntity} = UserEntity.fromObject(responseUser);

            const token = await JwtAdapter.generateToken({ id: userEntity.id })

            if(!token) throw CustomError.internalServer('Error While Creating JWT');

            return {
                ...userEntity,
                token : token
            }
        }
        catch(error) {
          
            if( error instanceof CustomError) {
                throw CustomError.internalServer(error.message)
            }
            throw new Error('Inernal Server Error');
        }
    }     


    loginUser = async (loginUser : LoginUserDto) => {

        const user = await this.authRepository.findByEmail(loginUser.email);

        if(!user) throw CustomError.badRequest('Email Not Existe');

        const isMatching = bcryptAdapter.compare(loginUser.password,user.password);
        if(!isMatching) throw CustomError.badRequest('Password is Not Valid');

        const {password,...userEntity} = UserEntity.fromObject(user);

        const token = await JwtAdapter.generateToken({ id: user.id })

        if(!token) throw CustomError.internalServer('Error While Creating JWT');

        return {
            user : userEntity,
            token : token
        }

    }

    validateEmail = async(token : string) => {

        const payload = await JwtAdapter.validateToken(token);

        if(!payload) throw CustomError.unauthorized('Invalid Token');

        //Convierte el campo payload de tipo any a tipo { email : string }
        const { email } = payload as { email : string };

        if(!email) throw CustomError.internalServer('Email Not in Token');
        
        const user = await this.authRepository.findByEmail(email);

        if(!user)  throw CustomError.internalServer('Email Not Existe');
        user.emailValidated = true;

        await this.authRepository.create(user);
        return true;
    }

    sendEmailValidationLink = async(email : string) => {

        const token = await JwtAdapter.generateToken({email});

        if(!token) throw CustomError.internalServer('Error Getting Token');

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
        const html = `
            <h1> Validate Your Email </h1>
            <a href="${link}">Validate Your Email : ${ email }</a>
        `;

        const options:SendMailOptions = {
            to : email,
            subject : "validate your email",
            htmlBody : html
        }

        const isSent = await this.emailService.sendEmail(options);

        if (!isSent) throw CustomError.internalServer('Error Sending Email');

        return true;

    }
}