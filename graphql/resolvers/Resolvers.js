const UserModel = require('../../models/User');
const RoleModel = require('../../models/Role');
const EventModel = require('../../models/Event');
const BookingModel = require('../../models/Booking');
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
                id: user._doc._id,
                password: null
            }
        });
    },
    event: async (parent, args) => {
        const event = await EventModel.findById(args.id);
        return { 
            ...event._doc,
            id: event._doc._id
         }
    },
    events: async () => {
        const events = await EventModel.find({});
        return events.map(event => {
            return {
                ...event._doc,
                id: event._doc._id
            }
        });
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
        const creatorUser = await UserModel.findById("5e0f712753a8d2203028ed23");
        const createdEvents = creatorUser.events ? creatorUser.events : [];
        const { title, description, date } = args.input;
        const event = new EventModel({
            title: title,
            description: description,
            date: date,
            creatorId: "5e0f712753a8d2203028ed23"
        });

        const newEvent = await event.save();
        createdEvents.push(newEvent._doc._id);

        const updatedUser = await UserModel.updateOne({_id: '5e0f712753a8d2203028ed23'}, {events: createdEvents});
        console.log(updatedUser);
        return {
            ...newEvent._doc,
            id: newEvent._doc._id
        }
    },
    bookEvent: async (parent, args) => {
        const { userId, eventId } = args.input;
        const booking = new BookingModel({
            userId,
            eventId
        });

        const newBooking = await booking.save();

        return {
            ...newBooking._doc,
            id: newBooking._doc._id
        }
    }
}

const User = {
    role: async (parent) => {
        return await RoleModel.findById(parent.roleId);
    },
    events: async (parent) => {
        const createdEvents = await EventModel.find({_id: {$in: parent.events}}); 
        return createdEvents.map(event => {
            return {
                ...event._doc,
                id: event._doc._id
            }
        }) 
    }
}

const Event = {
    creator: async (parent) => {
        return await UserModel.findById(parent.creatorId);
    }
}

module.exports = { Query, Mutation, User, Event };