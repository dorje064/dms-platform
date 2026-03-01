import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) { }

  async register(dto: RegisterDto) {
    const existing = await this.adminModel.findOne({ email: dto.email });
    if (existing) {
      throw new ConflictException('Admin with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const admin = await this.adminModel.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    const { password: _pw, ...result } = admin.toObject();
    return {
      success: true,
      message: 'Admin registered successfully',
      data: result,
    };
  }

  async login(dto: LoginDto) {
    const admin = await this.adminModel.findOne({ email: dto.email });
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: (admin._id as unknown as string).toString(),
      email: admin.email,
      role: admin.role,
    };

    const token = this.jwtService.sign(payload);
    const { password: _pw, ...adminData } = admin.toObject();

    return {
      success: true,
      message: 'Login successful',
      data: {
        accessToken: token,
        admin: adminData,
      },
    };
  }

  async getProfile(userId: string) {
    const admin = await this.adminModel
      .findById(userId)
      .select('-password')
      .lean();

    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }

    return {
      success: true,
      message: 'Profile fetched successfully',
      data: admin,
    };
  }
}
