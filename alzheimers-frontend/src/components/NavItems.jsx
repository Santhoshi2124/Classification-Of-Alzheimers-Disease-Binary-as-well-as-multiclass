// import { Link as RouterLink } from 'react-router-dom';
// import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import BookIcon from '@mui/icons-material/Book';

// export const mainListItems = (
//   <>
//     <ListItemButton component={RouterLink} to="/">
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItemButton>
//     <ListItemButton component={RouterLink} to="/patients">
//       <ListItemIcon>
//         <PeopleIcon />
//       </ListItemIcon>
//       <ListItemText primary="Patients" />
//     </ListItemButton>
//     <ListItemButton component={RouterLink} to="/reports">
//       <ListItemIcon>
//         <BarChartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Reports" />
//     </ListItemButton>
//     <ListItemButton component={RouterLink} to="/resources">
//       <ListItemIcon>
//         <BookIcon />
//       </ListItemIcon>
//       <ListItemText primary="Resources" />
//     </ListItemButton>
//   </>
// );
import { Link as RouterLink } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import BookIcon from '@mui/icons-material/Book';
import ChatIcon from '@mui/icons-material/Chat'; // <--- 1. Import the Chat Icon

export const mainListItems = (
  <>
    <ListItemButton component={RouterLink} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to="/patients">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Patients" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to="/reports">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to="/resources">
      <ListItemIcon>
        <BookIcon />
      </ListItemIcon>
      <ListItemText primary="Resources" />
    </ListItemButton>

    {/* --- 2. ADD THIS BLOCK HERE --- */}
    <ListItemButton component={RouterLink} to="/chatbot">
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primary="AI Assistant" />
    </ListItemButton>
    {/* ----------------------------- */}
  </>
);