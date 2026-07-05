import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DonorsService } from './donors.service';
import { CreateDonorDto } from './dto/create-donor.dto';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { QueryDonorDto } from './dto/query-donor.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('donors')
@Controller('donors')
export class DonorsController {
  constructor(private readonly donorsService: DonorsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all donors (paginated, filterable, searchable)' })
  @ApiResponse({ status: 200, description: 'Paginated list of donors' })
  findAll(@Query() query: QueryDonorDto) {
    return this.donorsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a donor by ID' })
  @ApiResponse({ status: 200, description: 'Donor data' })
  @ApiResponse({ status: 404, description: 'Donor not found' })
  findOne(@Param('id') id: string) {
    return this.donorsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new donor (admin only)' })
  @ApiResponse({ status: 201, description: 'Donor created' })
  create(@Body() dto: CreateDonorDto) {
    return this.donorsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a donor (admin only)' })
  @ApiResponse({ status: 200, description: 'Donor updated' })
  @ApiResponse({ status: 404, description: 'Donor not found' })
  update(@Param('id') id: string, @Body() dto: UpdateDonorDto) {
    return this.donorsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a donor (admin only)' })
  @ApiResponse({ status: 200, description: 'Donor deleted' })
  @ApiResponse({ status: 404, description: 'Donor not found' })
  remove(@Param('id') id: string) {
    return this.donorsService.remove(id);
  }
}
