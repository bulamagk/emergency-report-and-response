const mongoose = require("mongoose");

// Define the schema for the EmergencyReport model
const emergencyReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "Medical",
        "Fire",
        "Natural Disaster",
        "Accident",
        "Robbery",
        "Other",
      ],
      required: true,
    },
    description: {
      type: String,
      maxlength: 500, // Maximum length for description
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: function (v) {
            return v.length === 2;
          },
          message: (props) => `${props.value} is not a valid coordinate pair!`,
        },
      },
    },
    status: {
      type: String,
      enum: ["Pending", "Dispatched", "Resolved"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Add indexes
emergencyReportSchema.index({ location: "2dsphere" });
emergencyReportSchema.index({ status: 1 });

// Pre-save hook to check if the user exists
emergencyReportSchema.pre("save", async function (next) {
  const userExists = await mongoose.model("User").exists({ _id: this.user });
  if (!userExists) {
    throw new Error("User does not exist");
  }
  next();
});

// Create the EmergencyReport model using the schema
const EmergencyReport = mongoose.model(
  "EmergencyReport",
  emergencyReportSchema
);

// Export the model for use in other files
module.exports = EmergencyReport;
