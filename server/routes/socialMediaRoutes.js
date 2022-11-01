// external imports
import { Router } from 'express';
import passport from 'passport';

// Router object
const router = Router();

// login success
router.get('/login/success', (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'log in success!',
      user: req.user,
      cookies: req.cookies,
    });
  }
});

// login failed
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'log in failed!',
  });
});

// logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000/');
});

// google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/login/failed',
  })
);

export default router;
