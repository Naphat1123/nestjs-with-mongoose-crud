import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUser } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersDto } from './dto/users.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const existUsername = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();

    if (existUsername)
      throw new BadRequestException('username is already exist.');

    return await this.userModel.create(createUserDto);
  }

  async findAll(filter: FilterUser) {
    let { page, limit, sort, ...result } = filter;
    let option = {};
    for (let key in result) {
      filter[key] !== '' ? (option[key] = filter[key]) : null;
    }

    // like query
    if (option['username']) {
      let search = option['username'];
      option['username'] = { $regex: `${search}`, $options: "i" };
    }

    sort === -1 ? sort : 1;

    const response = await this.userModel
      .find(option)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ username: sort })
      .lean()
      .exec();
    const count = await this.userModel.count();

    const userDto: UsersDto[] = response.map((value) => {
      return {
        ...value,
        id: value._id,
      } as UsersDto
    })

    return { response: userDto, count, page: +page, lastPage: Math.ceil(count / limit) };
  }

  async findOne(id: string) {
    return this.userModel.findOne({ _id: `${id}` }).exec();
  }

  async findByUsername(username:string) {
    return this.userModel.findOne({username}).lean().exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    //validate exist user
    await this.validateExistUser(id)

    const result = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    }).lean().exec();
    const { __v, _id, ...all } = result
    return {
      ...all,
      id: _id
    } as UsersDto
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  private async validateExistUser(id: string): Promise<void> {
    const existUser = await this.userModel.findOne({ _id: id });
    if (!existUser) throw new NotFoundException(`Not found user id ${id}`);
  }
}
