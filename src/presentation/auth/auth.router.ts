import { Router } from 'express';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthRepository } from '../../domain';
import { EmailService } from './services/email.service';
import { envs } from '../../config';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();

    //repositorio
    const authRepository = new AuthRepository();  
    
    //Servidor de Correo
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.MAILER_ACTIVE
    );

    //Service
    const authService = new AuthService(authRepository,emailService);
    
    //Controller 
    const authController = new AuthController(authService);
    
    // Definir las rutas
    router.post('/login', authController.loginUser );
    router.post('/register', authController.registerUser );
    router.get('/validate-email/:token', authController.validateEmail );

    return router;
  }


}

