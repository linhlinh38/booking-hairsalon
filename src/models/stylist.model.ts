import { number } from 'zod';
import { CourtStatusEnum, ServiceStatusEnum } from '../utils/enums';
import userModel from './user.model';

const mongoose = require('mongoose');
const stylistSchema = mongoose.Schema(
  {
    image: {
      type: String
    },
    description: {
      type: String
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true
    },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
  },
  {
    timestamps: true
  }
);
stylistSchema.add(userModel.schema);
const stylistModel = userModel.discriminator('Stylist', stylistSchema);
export default stylistModel;
