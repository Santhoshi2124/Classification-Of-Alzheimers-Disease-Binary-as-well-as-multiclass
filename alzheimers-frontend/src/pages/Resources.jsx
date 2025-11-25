import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Resources = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Alzheimer's Disease Resources
      </Typography>
      <Typography variant="body1" paragraph>
        This section provides essential information about Alzheimer's disease, its stages, risk factors, and preventative measures.
      </Typography>

      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Frequently Asked Questions
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">What is Alzheimer's Disease?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Alzheimer's disease is a progressive brain disorder that slowly destroys memory and thinking skills and, eventually, the ability to carry out the simplest tasks. It is the most common cause of dementia among older adults.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">What are the stages of Alzheimer's?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div">
              <ul>
                <li><strong>Mild (Early Stage):</strong> A person may function independently but feels as if he or she is having memory lapses.</li>
                <li><strong>Moderate (Middle Stage):</strong> This is typically the longest stage and can last for many years. The person may confuse words, get frustrated or angry, and act in unexpected ways.</li>
                <li><strong>Severe (Late Stage):</strong> In the final stage of the disease, individuals lose the ability to respond to their environment, to carry on a conversation and, eventually, to control movement.</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">What are the common risk factors?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The greatest known risk factor is increasing age. Other factors include family history (genetics), certain cardiovascular conditions, and a history of head trauma. Lifestyle factors such as diet and exercise may also play a role.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>

      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Preventative Measures
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Regular physical exercise" />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Maintaining a heart-healthy diet" />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Lifelong learning and social engagement" />
          </ListItem>
        </List>
      </Paper>
      
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          External Links
        </Typography>
        <Box>
            <Link href="https://www.alz.org/" target="_blank" rel="noopener">
                Alzheimer's Association
            </Link>
        </Box>
         <Box>
            <Link href="https://www.nia.nih.gov/health/alzheimers" target="_blank" rel="noopener">
                National Institute on Aging
            </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Resources;
