const UserModel = require('../../models/User');
const RoleModel = require('../../models/Role');
const bcrypt = require('bcryptjs');

const Query = {
    user: async (parent, args) => {
        const user = await UserModel.findById(args.id);
        return { 
            ...user._doc, 
            id: user._doc._id, 
            password: null 
        }
    }
}

const Mutation = {
    createUser: async (parent, args) => {
        const { email, password, roleId } = args.input;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = new UserModel({
           email: email,
           password: passwordHash,
           roleId: roleId
        });
       const newUser = await user.save();
       return { ...newUser._doc, id: newUser._doc._id, password: null } 
    },
    createRole: async (parent, args) => {
        const role = new RoleModel({
            role: args.input.role
        });
        const newRole = await role.save();
        return { ...newRole._doc, id: newRole._doc._id }
    }
}

const User = {
    role: async (parent) => {
        return await RoleModel.findById(parent.roleId);
    }
}

module.exports = { Query, Mutation, User };