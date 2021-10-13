import User, {UserPk} from "@entity/user";

export default interface UserRepository {
    findByPk(pk: UserPk): Promise<User | null>;
    save(user: User): Promise<void>;
    findAllIn(usernames: string[]): Promise<User[]>;
}