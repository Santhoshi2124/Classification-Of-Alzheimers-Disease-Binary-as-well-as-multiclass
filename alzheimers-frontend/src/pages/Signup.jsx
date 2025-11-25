import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Avatar, Button, TextField, Link, Grid, Box, Typography, Paper,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loadingToast = toast.loading('Registering...');

    try {
      await axios.post('http://127.0.0.1:8000/api/users/register', formData);
      toast.success('Registration successful! Please log in.', { id: loadingToast });
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Registration failed. Please try again.';
      toast.error(errorMessage, { id: loadingToast });
      console.error('Registration error:', error);
    }
  };

  return (
    <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5">Sign up</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
           <Grid item xs={12} sx={{ width: '100%' }}>
  <TextField
    name="fullname"
    required
    fullWidth
    label="Full Name"
    autoFocus
    value={formData.fullname}
    onChange={handleChange}
    InputLabelProps={{
      sx: { fontSize: '1.2rem' }
    }}
    InputProps={{
      sx: { fontSize: '1.1rem' }
    }}
    sx={{
      width: '100%', // ensure full horizontal fill
      '& .MuiInputBase-root': { width: '100%' }
    }}
  />
</Grid>

<Grid item xs={12} sx={{ width: '100%' }}>
  <TextField
    name="email"
    type="email"
    required
    fullWidth
    label="Email Address"
    autoComplete="email"
    value={formData.email}
    onChange={handleChange}
    InputLabelProps={{
      sx: { fontSize: '1.2rem' }
    }}
    InputProps={{
      sx: { fontSize: '1.1rem' }
    }}
    sx={{
      width: '100%',
      '& .MuiInputBase-root': { width: '100%' }
    }}
  />
</Grid>

<Grid item xs={12} sx={{ width: '100%' }}>
  <TextField
    name="password"
    required
    fullWidth
    label="Password"
    type="password"
    autoComplete="new-password"
    value={formData.password}
    onChange={handleChange}
    InputLabelProps={{
      sx: { fontSize: '1.2rem' }
    }}
    InputProps={{
      sx: { fontSize: '1.1rem' }
    }}
    sx={{
      width: '100%',
      '& .MuiInputBase-root': { width: '100%' }
    }}
  />
  </Grid>
          
</Grid>

         <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
          {/* <Grid container justifyContent="flex-center"> */}
            
              
          {/* </Grid>      */}
          
        </Box>
        <Link href="/login" variant="body2" style={{textAlign:"center"}}>Already have an account? Sign in</Link>
            
      </Box>
      
    </Paper>
  );
};

export default Signup;
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import {
//   Avatar, Button, TextField, Link, Grid, Box, Typography, Paper,
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullname: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (formData.password.length < 6) {
//       toast.error('Password must be at least 6 characters long.');
//       return;
//     }
//     if (!formData.fullname || !formData.email || !formData.password) {
//       toast.error('Please fill in all fields.');
//       return;
//     }

//     const loadingToast = toast.loading('Registering...');
//     try {
//       await axios.post('http://127.0.0.1:8000/api/users/register', formData);
//       toast.success('Registration successful! Please log in.', { id: loadingToast });
//       navigate('/login');
//     } catch (error) {
//       const errorMessage = error.response?.data?.detail || 'Registration failed. Please try again.';
//       toast.error(errorMessage, { id: loadingToast });
//       console.error('Registration error:', error);
//     }
//   };

//   return (
//     <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
//         <Typography component="h1" variant="h5">Sign up</Typography>
//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField name="fullname" required fullWidth label="Full Name" autoFocus value={formData.fullname} onChange={handleChange} />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField name="email" type="email" required fullWidth label="Email Address" autoComplete="email" value={formData.email} onChange={handleChange} />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField name="password" required fullWidth label="Password" type="password" autoComplete="new-password" value={formData.password} onChange={handleChange} />
//             </Grid>
//           </Grid>
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Link href="/login" variant="body2">Already have an account? Sign in</Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

// export default Signup;