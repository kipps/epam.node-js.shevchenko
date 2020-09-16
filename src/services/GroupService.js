export default class GroupService {
    constructor(GroupModel) {
        this.groupModel = GroupModel;
    }

    async getGroups(name, limit) {
        let result = await this.groupModel.findAll();

        if (name) {
            result = result.filter((group) => group.name.includes(name));
        }

        result.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });

        if (limit) {
            result = result.slice(0, limit);
        }

        return result;
    }

    getGroup(id) {
        return this.groupModel.findAll(
            {
                where: {
                    id
                }
            }
        );
    }

    creatGroup(group) {
        return this.groupModel.create({ ...group });
    }

    updateGroup(group, id) {
        return this.groupModel.update(
            {
                ...group
            },
            {
                where: {
                    id
                }
            }
        );
    }

    deleteGroup(id) {
        return this.groupModel.destroy(
            {
                where: {
                    id
                }
            });
    }

    async addUsers(id, userIds) {
        const group = await this.groupModel.findByPk(id);
        group.addUsers(userIds);
    }
}
