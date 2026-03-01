import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentDto } from './dto/query-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) { }

  async findAll(query: QueryStudentDto) {
    const page = parseInt(query.page ?? '1', 10);
    const limit = parseInt(query.limit ?? '10', 10);
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = { isDeleted: false };

    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { school: { $regex: query.search, $options: 'i' } },
        { region: { $regex: query.search, $options: 'i' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.studentModel.find(filter).skip(skip).limit(limit).lean(),
      this.studentModel.countDocuments(filter),
    ]);

    return {
      success: true,
      message: 'Students fetched successfully',
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const student = await this.studentModel
      .findOne({ _id: id, isDeleted: false })
      .lean();

    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }

    return {
      success: true,
      message: 'Student fetched successfully',
      data: student,
    };
  }

  async create(dto: CreateStudentDto) {
    const student = await this.studentModel.create(dto);
    return {
      success: true,
      message: 'Student created successfully',
      data: student,
    };
  }

  async update(id: string, dto: UpdateStudentDto) {
    const student = await this.studentModel
      .findOneAndUpdate({ _id: id, isDeleted: false }, dto, { new: true })
      .lean();

    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }

    return {
      success: true,
      message: 'Student updated successfully',
      data: student,
    };
  }

  async remove(id: string) {
    const student = await this.studentModel
      .findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true },
      )
      .lean();

    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }

    return {
      success: true,
      message: 'Student deleted successfully',
      data: null,
    };
  }
}
