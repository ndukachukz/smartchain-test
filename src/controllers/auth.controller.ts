import { type Response, type Request, request, response } from "express";
import bCrypt from "bcrypt";
import UserModel from "../schema/userSchema";

class AuthController {
  private userModel: typeof UserModel;

  constructor() {
    this.userModel = UserModel();
  }
  async signin(req: Request, res: Response): Promise<Response> {
    try {
      const foundUser = await this.userModel.findOne({
        username: req.body.username,
      });

      if (!foundUser)
        return res.status(404).send({ message: "user does not exist" });

      // compare passwords
      const isMatch = await bCrypt.compare(
        req.body.password,
        foundUser.password
      );

      if (!isMatch) return res.status(401).send();

      return foundUser;
    } catch (error) {}
  }

  async signup(req: Request, res: Response) {
    try {
      const foundUser = await this.findUser(request.body.username);

      if (foundUser)
        return res.status(409).send({ message: "user already exists" });

      //   harsh password
      const hashedPassword = await bCrypt.hash(request.body.password, 10);

      const newUser = new this.userModel({
        username: req.body.username,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {}
  }

  //   service
  async findUser(username: string) {
    const foundUser = await this.userModel.findOne({
      username: username,
    });

    return foundUser;
  }
}

export default new AuthController();
