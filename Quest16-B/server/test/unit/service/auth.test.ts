import {Container} from "typedi";

import AuthService from '@service/auth';
import SequelizeUserRepository from "@repository/user/sequelize";
import UserRepository from "@repository/user";
import InvalidLoginInfoError from "@error/invalidLoginInfo";
import PasswordEncoder, {BcryptPasswordEncoder} from "@src/passwordEncoder";
import UsernameDuplicationError from "@error/usernameDuplication";

const createUser = () => ({ username: 'user1', password: 'pass1' });

describe('Auth service unit test', () => {
    let authService: AuthService;
    let userRepository: UserRepository;
    let passwordEncoder: PasswordEncoder;

    beforeAll(() => {
        userRepository = Container.get(SequelizeUserRepository);
        passwordEncoder = Container.get(BcryptPasswordEncoder);
        authService = new AuthService(userRepository, passwordEncoder);
    });

    describe('login method', () => {
        test('login success', async () => {
            const user = createUser();
            (passwordEncoder.compare as jest.Mock) = jest.fn().mockResolvedValue(true);
            (userRepository.findByPk as jest.Mock) = jest.fn().mockResolvedValue(user);

            await authService.login(user);
        });

        describe('login fail', () => {
            test('user is not found', async () => {
                const user = createUser();
                (passwordEncoder.compare as jest.Mock) = jest.fn().mockResolvedValue(true);
                (userRepository.findByPk as jest.Mock) = jest.fn().mockResolvedValue(null);

                await expect(authService.login(user)).rejects.toThrow(new InvalidLoginInfoError());
            });

            test('password is not matched', async () => {
                const user = createUser();
                (passwordEncoder.compare as jest.Mock) = jest.fn().mockResolvedValue(false);
                (userRepository.findByPk as jest.Mock) = jest.fn().mockResolvedValue(user);

                await expect(authService.login(user)).rejects.toThrow(new InvalidLoginInfoError());
            });
        });
    });

    describe('register method', () => {
        test('register success', async () => {
            const user = createUser();
            (userRepository.findByPk as jest.Mock) = jest.fn().mockResolvedValue(null);
            (userRepository.save as jest.Mock) = jest.fn();
            (passwordEncoder.encode as jest.Mock) = jest.fn().mockResolvedValue(user.password);

            await authService.register(user);
        });

        describe('register fail', () => {
            test('username is duplicated', async () => {
                const user = createUser();
                (userRepository.findByPk as jest.Mock) = jest.fn().mockResolvedValue(user);
                (userRepository.save as jest.Mock) = jest.fn();
                (passwordEncoder.encode as jest.Mock) = jest.fn().mockResolvedValue(user.password);

                await expect(authService.register(user)).rejects.toThrow(new UsernameDuplicationError());
            });
        });
    });
});