import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import {
  ALLOWED_IMAGE_MIME,
  MAX_UPLOAD_BYTES,
  UPLOAD_DIR,
  UPLOAD_URL_PREFIX,
} from './upload.constants';

const multerOptions = {
  storage: diskStorage({
    destination: (_req, _file, cb) => {
      if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });
      cb(null, UPLOAD_DIR);
    },
    filename: (_req, file, cb) => {
      cb(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`);
    },
  }),
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!ALLOWED_IMAGE_MIME.test(file.mimetype)) {
      return cb(
        new BadRequestException(
          'Only image files (jpg, jpeg, png, gif, webp) are allowed',
        ),
        false,
      );
    }
    cb(null, true);
  },
  limits: { fileSize: MAX_UPLOAD_BYTES },
};

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload an image and get its URL' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
      required: ['file'],
    },
  })
  @ApiResponse({ status: 201, description: 'Image uploaded; URL returned' })
  @ApiResponse({ status: 400, description: 'No file / invalid image type' })
  upload(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    if (!file) {
      throw new BadRequestException('No file uploaded (form field "file")');
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const url = `${baseUrl}${UPLOAD_URL_PREFIX}/${file.filename}`;

    return {
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url,
        filename: file.filename,
        size: file.size,
        mimetype: file.mimetype,
      },
    };
  }
}
