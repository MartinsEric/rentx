import { getRepository, Repository } from "typeorm";

import { usersRoutes } from "../../../../routes/users.routes";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(newUserDTO: ICreateUserDTO): Promise<void> {
    const newUser = this.repository.create({
      name: newUserDTO.name,
      email: newUserDTO.email,
      password: newUserDTO.password,
      driverLicense: newUserDTO.driverLicense,
    });

    await this.repository.save(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }
}

export { UserRepository };