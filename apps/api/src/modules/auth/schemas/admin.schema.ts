import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ collection: 'admins', timestamps: true })
export class Admin {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['admin', 'superadmin'], default: 'admin' })
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
