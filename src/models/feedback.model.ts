import { CourtStatusEnum } from '../utils/enums';

const mongoose = require('mongoose');
const feedbackSchema = mongoose.Schema(
  {
    star: {
      type: Number,
      required: true
    },
    images: [
      {
        type: String
      }
    ],
    feedback: {
      type: String
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    }
  },
  {
    timestamps: true
  }
);

const feedbackModel = mongoose.model('Feedback', feedbackSchema);
export default feedbackModel;
