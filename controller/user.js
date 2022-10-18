const { user } = require("../models");

const index = async (req, res, next) => {
    user.findAll()
        .then(function (result) {
            res.json(result);
        })
        .catch(function (error) {
            //   next(error);
            next({
                code: 500,
                message: "Internal Server Error.."
            });
        });
}

const show = async (req, res, next) => {
    let id = req.params.id
    user.findOne({ where: { id: id } })
        .then(function (result) {
            res.json(result);
        })
        .catch(function (error) {
            next(error);
        });

}

const create = async (req, res, next) => {
    console.log(req.body);
    let data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        level: req.body.level
    }
    await user.create(data)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            next(err);
        })
}

const update = async (req, res, next) => {

    let id = req.params.id

    await user.update(req.body, { where: { id: id } })
        .then(data => {
            res.status(200).json(id)
        })
        .catch(err => {
            res.status(500).json({
                message: 'internal server error',
                dataError: err
            })
        })
}

const destroy = async (req, res) => {

    let id = req.params.id

    await user.destroy({ where: { id: id } })
        .then(data => {
            res.status(200).json({ message: "success" });
        })
        .catch(err => {
            res.status(500).json({
                message: 'internal server error',
                dataError: err
            })
        })

}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}