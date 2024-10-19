import { number } from 'zod';
import { CourtStatusEnum, ServiceStatusEnum } from '../utils/enums';

const mongoose = require('mongoose');
const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    images: [
      {
        type: String
      }
    ],
    type: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(ServiceStatusEnum)
    }
  },
  {
    timestamps: true
  }
);

const serviceModel = mongoose.model('Service', serviceSchema);
export default serviceModel;
