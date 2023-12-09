const user = require('../model/user.model')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Country = mongoose.model('countries', new mongoose.Schema({ data: mongoose.Schema.Types.Mixed }));
const State = mongoose.model('states', new mongoose.Schema({ data: mongoose.Schema.Types.Mixed }));
const City = mongoose.model('cities', new mongoose.Schema({ data: mongoose.Schema.Types.Mixed }));
require('dotenv').config({ path: 'conf/.env' });

exports.createUser = async (req, res) => {
    let { useFirstName, userLastName, mobile, email, password } = req.body

    if (!useFirstName || !userLastName || !mobile || !email || !password) {
        return res.json({
            status: 0,
            message: " useFirstName, userLastName, mobile, email, password are required fields"
        })
    }

    if (req.body.isAdmin) delete req.body.isAdmin

    const isUserExist = await user.find({
        $or:
            [
                { mobile: mobile },
                { email: email }
            ]
    })
    console.log(isUserExist)
    if (isUserExist.length != 0) {
        return res.json({
            status: false,
            message: `user already exist please login`,
        })
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    await new user({
        useFirstName,
        userLastName,
        mobile,
        email,
        password: hashedPassword
    })
        .save()
        .then((users) => {
            return res.json({
                status: 1,
                message: "user created",
                data: users
            })

        })
        .catch((error) => {
            return res.json({
                status: false,
                message: "something went wrong"
            })
        })

}

exports.login = async (req, res) => {
    let { username, password } = req.body

    if (!username || !password) {
        return res.json({
            status: 0,
            message: " username, password are required fields"
        })
    }

    const isUserFound = await user.findOne({
        $or:
            [
                { mobile: username },
                { email: username }
            ]
    })

    if (!isUserFound) {
        return res.json({
            success: false,
            message: "user not registered please register"
        })
    }

    if(isUserFound.isBanned){
        return res.json({
            success: false,
            message: "your account is Banned by admin"
        })
    }

    if (bcrypt.compareSync(password, isUserFound.password)) {
        const token = await jwt.sign({ _id: isUserFound._id, isAdmin: isUserFound.isAdmin }, process.env.JWT_TOKEN, { expiresIn: '365d' });
        console.log(token)
        return res.json({
            success: true,
            message: `logged in`,
            data: isUserFound,
            token:token
        })
    }
    else {
        return res.json({
            success: false,
            message: `incorrect password`
        })
    }
}

exports.sendOtp = async (req, res) => {
    const mobile = req.params.mobile

    if (!mobile) {
        return res.json({
            status: false,
            message: "please enter mobile"
        })
    }

    return res.json({
        status: true,
        message: `otp sent on ${mobile} your otp is 000000`
    })
}

exports.verifyOtp = async (req, res) => {
    const { mobile, otp } = req.body

    if (!mobile || !otp) {
        return res.json({
            status: false,
            message: "mobile and otp required"
        })
    }

    if (otp !== '000000') {
        return res.json({
            status: 0,
            message: "please enter valid otp"
        })
    }
    if (otp == '000000') {
        return res.json({
            status: 1,
            message: "valid otp"
        })
    }


}

exports.isUserExist = async (req, res) => {
    let { username } = req.params

    if (!username) {
        return res.json({
            status: 0,
            message: "username is required fields"
        })
    }

    const isUserExist = await user.findOne({
        $or:
            [
                { mobile: username },
                { email: username }
            ]
    })

    if (!isUserExist) {
        return res.json({
            status: 0,
            message: "user not present with this username"
        })
    }
    else {
        return res.json({
            status: 1,
            message: "user exists"
        })
    }
}

exports.getAllCountries = async (req, res) => {
    await Country.find({})
        .then((countries) => {
            return res.json({
                status: 1,
                message: "countries",
                data: countries
            })

        })
        .catch((error) => {
            return res.json({
                status: false,
                message: "something went wrong"
            })
        })
}

exports.getStatesByCountry = async (req, res) => {
    await State.find({ country_name: req.params.country_name })
        .then((states) => {
            return res.json({
                status: 1,
                message: "States",
                data: states
            })

        })
        .catch((error) => {
            return res.json({
                status: false,
                message: "something went wrong"
            })
        })
}

exports.getCitiesByStates = async (req, res) => {
    await City.find({ state_name: req.params.state_name })
        .then((cities) => {
            return res.json({
                status: 1,
                message: "States",
                data: cities
            })

        })
        .catch((error) => {
            return res.json({
                status: false,
                message: "something went wrong"
            })
        })
}

