import { UserModel } from '@/models/user';
import { AuthService } from '@/services/auth.service';
import passport from 'passport';
import { Strategy } from 'passport-local';

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            done(null, null);
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport.use(
    new Strategy({ usernameField: 'email' }, async (email, password, done) => {
        console.log(email, password);
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            const isMatch = await AuthService.comparePassword(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (err) {
            console.log("Passport error", err);
            return done(err);
        }
    }),
);
