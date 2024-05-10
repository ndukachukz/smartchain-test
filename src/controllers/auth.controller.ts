import { type Response, type Request } from "express";
import bCrypt from "bcrypt";
import userModel from "../schema/userSchema";

class AuthController {
  constructor() {}

  async signin(req: Request, res: Response) {
    let foundUser = {};
    try {
      const query = await userModel
        .findOne({
          username: req.body.username,
        })
        .exec();

      console.log(query);

      if (!query)
        return res.status(404).send({ message: "user does not exist" });

      // compare passwords
      let isMatch = false;
      if (query.password !== null && query.password !== undefined)
        isMatch = bCrypt.compareSync(req.body.password, query.password);

      if (!isMatch) return res.status(401).send();

      return query;
    } catch (error: any) {
      throw new Error(`ERR SIGNING IN => , ${error.message}`);
    }
  }

  async signup(req: Request, res: Response) {
    try {
      const query = await this.findUser(req.body.username);

      if (query)
        return res.status(409).send({ message: "user already exists" });

      //   harsh password
      const hashedPassword = await bCrypt.hash(req.body.password, 10);

      const newUser = userModel.create({
        username: req.body.username,
        password: hashedPassword,
      });

      return newUser;
    } catch (error: any) {
      throw new Error(`ERR SIGNING UP => , ${error.message}`);
    }
  }

  //   service
  async findUser(username: string) {
    const foundUser = await userModel.findOne({
      username: username,
    });

    return foundUser;
  }
}

export default new AuthController();
