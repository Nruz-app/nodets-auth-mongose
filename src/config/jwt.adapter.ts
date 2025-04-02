import jwt, { SignOptions } from 'jsonwebtoken';
import { envs } from './envs';


const JWT_SEED = envs.JWT_SEED;

//Import npm i --save-dev @types/jsonwebtoken

export class JwtAdapter {

  static async generateToken( payload:any, duration: string = '2h' ) {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration } as SignOptions, (err, token) => {
        
        if ( err ) return resolve(null);

        resolve(token)

      });
    })
  }

  //static validateToken(token: string) {
  static validateToken<T>(token: string) : Promise<T | null> {
    
    return new Promise( (resolve) => {
      jwt.verify( token, JWT_SEED, (err, decoded : any) => {

        if( err ) return resolve(null);

        resolve(decoded);

      });
    });
    
  }
}