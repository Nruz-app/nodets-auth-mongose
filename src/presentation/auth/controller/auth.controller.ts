import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterUserDto } from '../../../domain';
import { LoginUserDto } from '../../../domain/dtos/auth/login-user.dto';

export class AuthController {

    private readonly authService : AuthService;
    constructor(authService : AuthService) {
        this.authService = authService;
    }


    registerUser = async (req : Request, res : Response) => {


        const [error,registerUser] = RegisterUserDto.create(req.body);

        if(error) return res.status(400).send({error}); 

        const response = await this.authService.registerUser(registerUser!);

        return  res.status(200).send(response);   

    }

     loginUser = async(req : Request, res : Response) => {

        const [error,loginUser] = LoginUserDto.create(req.body);

        if(error) return res.status(400).send({error}); 

        const response = await this.authService.loginUser(loginUser!);

        return  res.status(200).send(response);   

    }

    validateEmail = async(req : Request, res : Response) => {

        const { token } = req.params;

        if(await this.authService.validateEmail(token)){
            return  res.status(200).send('Email Validate');
        }
        return  res.status(500).send('Email NOT Validate');
    }

}