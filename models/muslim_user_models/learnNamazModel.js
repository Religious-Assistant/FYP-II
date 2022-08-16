const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const learnNamazSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  fajr: {
    hasLearned2Sunnah: {
      type: Boolean,
      default: false,
    },
    hasLearned2Farz: {
      type: Boolean,
      default: false,
    },
  },
  zuhr: {
    hasLearned4Sunnah: {
      type: Boolean,
      default: false,
    },
    hasLearned4Farz: {
      type: Boolean,
      default: false,
    },
    hasLearned2Sunnah: {
      type: Boolean,
      default: false,
    },
    hasLearned2Nafl: {
      type: Boolean,
      default: false,
    },
  },

  asr: {
    hasLearned4Sunnah: {
      type: Boolean,
      default: false,
    },
    hasLearned4Farz: {
      type: Boolean,
      default: false,
    },
  },

  maghrib: {
    hasLearned2Sunnah: {
      type: Boolean,
      default: false,
    },
    hasLearned3Farz: {
      type: Boolean,
      default: false,
    },
    hasLearned2Nafl: {
      type: Boolean,
      default: false,
    },
  },

  isha: {
    hasLearned2Nafl: {
      type: Boolean,
      default: false,
    },
    hasLearned4Sunnah: {
      type: Boolean,
      default: false,
    },
    hasLearned4Farz: {
      type: Boolean,
      default: false,
    },
    hasLearned2Sunnah: {
      type: Boolean,
      default: false,
    },

    hasLearned3Vitr: {
      type: Boolean,
      default: false,
    },
  },

  jumma: {
    hasLearned4Sunnah: {
      type: Boolean,
      default: false,
    },
    hasLearned2Farz: {
      type: Boolean,
      default: false,
    },
    hasLearned2Sunnah: {
      type: Boolean,
      default: false,
    },
    hasLearned2Nafl: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = mongoose.model("LearnNamaz", learnNamazSchema);
