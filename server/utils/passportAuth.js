// external imports
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// google
passport.use(
  new GoogleStrategy(
    {
      clientID:
        '754184235830-24t0cri0nih2c6lcgvmkvota5bh67cla.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:5000/auth/google/callback/',
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
      //  if you want to save data
      const user = {
        id: profile.id,
        username: profile.displayName,
        avatar: profile.photos[0].value,
      };
      console.log(user);
    }
  )
);
export default passport;
