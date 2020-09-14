import {GroupModel} from "../models/GroupModel";

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
          id: id
        }
      }
    );
  }

  creatGroup(group) {
    return this.groupModel.create({...group});
  }

  updateGroup(group, id) {
    return this.groupModel.update(
      {
        ...group
      },
      {
        where: {
          id: id
        }
      }
    );
  }

  deleteGroup(id) {
    return this.groupModel.destroy(
      {
        where: {
          id: id
        }
      });
  }

  async addUser(id, userId) {
    await this.groupModel.findByPk(id, {
      include: [
        ...userId
      ]
    });
  }

}
