
import { UserModel } from '../../data';
import { RegisterUserDto, UserEntity } from '../';
import { bcryptAdapter } from '../../config';

export class AuthRepository {

    async findByEmail(email : string) : Promise<UserEntity | null> {
        return await UserModel.findOne({email:email});   
    }
    
    async create(registerUser : RegisterUserDto) : Promise<any>{
        
        const user = new UserModel(registerUser);

        user.password = bcryptAdapter.hash(registerUser.password);

        await user.save();
        return user;
    }

}
