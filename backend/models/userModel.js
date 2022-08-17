const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );

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
        isadmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        pic: {
            type: String,
            required: true,
            default: "https://imgs.search.brave.com/RH0J7DaIaLw8qSMniKLNHdrxIB1z2s5MoiV6LFJkSQ8/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5H/Nk00eERMUEhpS2lU/ckxVR19qMkJnSGFI/YSZwaWQ9QXBp",
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre( "save", async function ( next ) {
    if ( !this.isModified( "password" ) ) {
        next();
    }
    const salt = await bcrypt.genSalt( 10 );
    this.password = await bcrypt.hash( this.password, salt );
} );


//decrypt the password
userSchema.methods.matchPassword = async function ( enteredPassword ) {
    return await bcrypt.compare( enteredPassword, this.password );

}

const User = mongoose.model( "User", userSchema );

module.exports = User;