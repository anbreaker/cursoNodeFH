import { Request, Response } from 'express';

import User from '../models/user';

// TODO: Completar con middlewares protecion etc...

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json({ users });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (user) res.json({ user });
  else
    res.status(400).json({
      msg: `The user with ${id} does not exist`,
    });
};

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existEmail = await User.findOne({
      where: { email: body.email },
    });

    if (existEmail)
      return res
        .status(400)
        .json({ msg: `The user with email ${body.email}, alredy exist. ` });

    const user = await User.create(body);

    res.json({ user });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: 'Talk with Admin' });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ msg: `The user with ${id} does not exist` });

    // TODO: vigilar el email... como en el post

    await user.update(body);

    res.json({ user });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: 'Talk with Admin' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) return res.status(404).json({ msg: `The user with ${id} does not exist` });

  // Delete User physical!
  // await user.destroy();

  // Delete logical
  await user.update({ status: false });

  res.json({
    msg: 'deleteUser',
    id,
  });
};
