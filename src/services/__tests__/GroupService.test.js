import GroupService from '../GroupService';
import groupMock from '../../mockups/groups.mock';

const testGroupModel = {
    findAll: () => {
        return groupMock;
    }
};


describe('Get Groups', () => {
    it('should return list of groups and sotrted by abc', async () => {
        const groupService = new GroupService(testGroupModel);
        const result = await groupService.getGroups();
        expect(result).toEqual(groupMock);
    });

    it('should return list of groups by login \'Medium\'', async () => {
        const groupService = new GroupService(testGroupModel);
        const filterOfGroups = groupMock.filter(group => group.name.includes('Medium'));
        const result = await groupService.getGroups('Medium');
        expect(result).toEqual(filterOfGroups);
    });

    it('should return list of groups by limit \'1\'', async () => {
        const groupService = new GroupService(testGroupModel);
        const limitOfGroups = groupMock.slice(0, 1);
        const result = await groupService.getGroups(null, 1);
        expect(result).toEqual(limitOfGroups);
    });
});
