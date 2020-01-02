const UserModel = require('../../models/User');
const RoleModel = require('../../models/Role');
const EventModel = require('../../models/Event');
const bcrypt = require('bcryptjs');

const Query = {
    user: async (parent, args) => {
        const user = await UserModel.findById(args.id);
        return { 
            ...user._doc, 
            id: user._doc._id, 
            password: null 
        }
    },
    users: async () => {
        const users = await UserModel.find({});
        return users.map(user => {
            return {
                ...user._doc,
                id: user._doc._id
            }
        });
    },
    event: async (parent, args) => {
        const event = await EventModel.findById(args.id);
        return { 
            ...event._doc,
            id: event._doc._id
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
    },
    createEvent: async (parent, args) => {
        const { title, description, date } = args.input;
        const event = new EventModel({
            title: title,
            description: description,
            date: date,
            creatorId: "5e0e58d7f995260aecdf45d5"
        });

        const newEvent = await event.save();
        return {
            ...newEvent._doc,
            id: newEvent._doc._id
        }
    }
}

const User = {
    role: async (parent) => {
        return await RoleModel.findById(parent.roleId);
    }
}

const Event = {
    creator: async (parent) => {
        return await UserModel.findById(parent.creatorId);
    }
}

module.exports = { Query, Mutation, User, Event };