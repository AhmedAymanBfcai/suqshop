import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next() //We call next at the end of the function when we done as if we do not calling it, the program will hang forever thinking we still doing some operatoins before or after an event.
  }

  const salt = await bcrypt.genSalt(10) //genSalt returns a promise so you have to use await
  this.password = await bcrypt.hash(this.password, salt) // The  plain text password.
})

const User = mongoose.model('User', userSchema)

export default User
