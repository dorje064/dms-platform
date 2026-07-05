import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Donor, DonorDocument } from './schemas/donor.schema';
import { CreateDonorDto } from './dto/create-donor.dto';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { QueryDonorDto } from './dto/query-donor.dto';

@Injectable()
export class DonorsService {
  constructor(
    @InjectModel(Donor.name) private donorModel: Model<DonorDocument>,
  ) { }

  async findAll(query: QueryDonorDto) {
    const page = parseInt(query.page ?? '1', 10);
    const limit = parseInt(query.limit ?? '10', 10);
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = { isDeleted: false };

    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { email: { $regex: query.search, $options: 'i' } },
        { location: { $regex: query.search, $options: 'i' } },
      ];
    }

    if (query.type) {
      filter.type = query.type;
    }

    const [data, total] = await Promise.all([
      this.donorModel
        .find(filter)
        .sort({ amount: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.donorModel.countDocuments(filter),
    ]);

    return {
      success: true,
      message: 'Donors fetched successfully',
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const donor = await this.donorModel
      .findOne({ _id: id, isDeleted: false })
      .lean();

    if (!donor) {
      throw new NotFoundException(`Donor with id ${id} not found`);
    }

    return {
      success: true,
      message: 'Donor fetched successfully',
      data: donor,
    };
  }

  async create(dto: CreateDonorDto) {
    const donor = await this.donorModel.create(dto);
    return {
      success: true,
      message: 'Donor created successfully',
      data: donor,
    };
  }

  async update(id: string, dto: UpdateDonorDto) {
    const donor = await this.donorModel
      .findOneAndUpdate({ _id: id, isDeleted: false }, dto, { new: true })
      .lean();

    if (!donor) {
      throw new NotFoundException(`Donor with id ${id} not found`);
    }

    return {
      success: true,
      message: 'Donor updated successfully',
      data: donor,
    };
  }

  async remove(id: string) {
    const donor = await this.donorModel
      .findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true },
      )
      .lean();

    if (!donor) {
      throw new NotFoundException(`Donor with id ${id} not found`);
    }

    return {
      success: true,
      message: 'Donor deleted successfully',
      data: null,
    };
  }
}
