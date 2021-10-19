import {Container} from "typedi";

import sequelize from "@model/index";
import AuthService from "@service/auth";
import UserRepository from "@repository/user";
import PasswordEncoder, {BcryptPasswordEncoder} from "../../../src/util/passwordEncoder";
import SequelizeUserRepository from "@repository/user/sequelize";
import {UserModel} from "@model/user";

describe('Auth service integration test', () => {
    let authService: AuthService;
    let userRepository: UserRepository;
    let passwordEncoder: PasswordEncoder;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
        userRepository = Container.get(SequelizeUserRepository);
        passwordEncoder = Container.get(BcryptPasswordEncoder);
        authService = new AuthService(userRepository, passwordEncoder);
    });

    beforeEach(async () => {
        await UserModel.truncate();
    })

    describe('register method', () => {
        test('register user created', async () => {
            const user = { username: 'user1', password: 'pass1' };

            await authService.register(user);

            const storedUser = await userRepository.findByPk(user.username);
            expect(storedUser).toBeDefined();
            expect(storedUser).toHaveProperty("username");
            expect(storedUser).toHaveProperty("password");
        })
    })
});