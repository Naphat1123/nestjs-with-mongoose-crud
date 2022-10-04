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
import { User, UserDocument } from './schemas/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUsername = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();

    if (existUsername)
      throw new BadRequestException('username is already exist.');

    return await this.userModel.create(createUserDto);
  }

  async findAll(filter: FilterUser) {
    let { skip, limit , ...result } = filter;
    let option = {};
    for (let key in result) {
      filter[key] !== '' ? (option[key] = filter[key]) : null;
    }

    console.log(option);

    const response = await this.userModel
      .find(option)
      .skip((skip - 1) * limit)
      .limit(limit)
      .exec();
    const count = await this.userModel.count();
    return { result, count, page: skip, lastPage: count / limit };
  }

  async findOne(id: string) {
    return this.userModel.findOne({ _id: `${id}` }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existUser = await this.userModel.findOne({ _id: id });
    if (!existUser) throw new NotFoundException(`Not found user id ${id}`);

    const result = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    console.log(result);

    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
