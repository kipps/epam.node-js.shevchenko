import UserService from '../UserService';
import userMock from '../../mockups/users.mock';

const testUserModel = {
    findAll: () => {
        return userMock;
    }
};

describe('Get Users', () => {
    it('should return list of users and sotrted by abc', async () => {
        const userService = new UserService(testUserModel);
        const result = await userService.getUsers();
        expect(result).toEqual(userMock);
    });

    it('should return list of users by login \'Anna\'', async () => {
        const userService = new UserService(testUserModel);
        const filterOfuser = userMock.filter(user => user.login.includes('Anna'));
        const result = await userService.getUsers('Anna');
        expect(result).toEqual(filterOfuser);
    });

    it('should return list of users by limit \'1\'', async () => {
        const userService = new UserService(testUserModel);
        const limitOfusers = userMock.slice(0, 1);
        const result = await userService.getUsers(null, 1);
        expect(result).toEqual(limitOfusers);
    });
});
