export default class UserService {
    constructor(UserModel) {
        this.userModel = UserModel;
    }

    async getUsers(login, limit) {
        let result = await this.userModel.findAll();
        if (login) {
            result = result.filter((user) => user.login.includes(login));
        }

        result.sort((a, b) => {
            if (a.login > b.login) {
                return 1;
            }
            if (a.login < b.login) {
                return -1;
            }
            return 0;
        });

        if (limit) {
            result = result.slice(0, limit);
        }

        return result;
    }

    getUser(id) {
        return this.userModel.findAll(
            {
                where: {
                    id
                }
            }
        );
    }

    creatUser(user) {
        return this.userModel.create({ ...user });
    }

    updateUser(user, id) {
        return this.userModel.update(
            {
                ...user
            },
            {
                where: {
                    id
                }
            }
        );
    }

    deleteUser(id) {
        return this.userModel.update(
            {
                isdeleted: true
            },
            {
                where: {
                    id
                }
            });
    }
}
