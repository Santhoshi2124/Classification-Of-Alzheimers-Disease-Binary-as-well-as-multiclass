// import { useState, useRef, useEffect } from 'react';
// import { Box, TextField, Button, Paper, Typography, Avatar, CircularProgress } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import SmartToyIcon from '@mui/icons-material/SmartToy';
// import PersonIcon from '@mui/icons-material/Person';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// const Chatbot = () => {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([
//     { id: 1, text: "Hello! I am your Alzheimer's Care Assistant. How can I help you today?", sender: 'bot' }
//   ]);
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => { scrollToBottom(); }, [messages]);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { id: Date.now(), text: input, sender: 'user' };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       // CONNECTING TO YOUR CHATBOT BACKEND (PORT 5001)
//       // Extract name from email (e.g., "john@gmail.com" -> "john")
//       const userName = user?.email ? user.email.split('@')[0] : "Friend";

//       const response = await axios.post('http://127.0.0.1:5001/message', {
//         text: input,
//         sender_name: userName  // <--- Sending the real name here
//       });

//       const botText = response.data.response || "I received your message.";
//       const botMessage = { id: Date.now() + 1, text: botText, sender: 'bot' };
//       setMessages((prev) => [...prev, botMessage]);

//     } catch (error) {
//       console.error("Bot Error:", error);
//       const errorMessage = { id: Date.now() + 1, text: "Sorry, I can't connect to the AI right now.", sender: 'bot' };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ height: '85vh', display: 'flex', flexDirection: 'column', maxWidth: '900px', mx: 'auto', p: 2 }}>
//       <Typography variant="h4" gutterBottom>AI Care Assistant</Typography>
      
//       <Paper elevation={3} sx={{ flexGrow: 1, mb: 2, p: 2, overflowY: 'auto', bgcolor: '#f5f5f5', borderRadius: 2 }}>
//         {messages.map((msg) => (
//           <Box key={msg.id} sx={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', mb: 2 }}>
//             {msg.sender === 'bot' && <Avatar sx={{ bgcolor: 'secondary.main', mr: 1 }}><SmartToyIcon /></Avatar>}
//             <Paper sx={{ p: 2, maxWidth: '70%', bgcolor: msg.sender === 'user' ? 'primary.main' : 'white', color: msg.sender === 'user' ? 'white' : 'text.primary', borderRadius: 2 }}>
//               <Typography variant="body1">{msg.text}</Typography>
//             </Paper>
//             {msg.sender === 'user' && <Avatar sx={{ bgcolor: 'primary.dark', ml: 1 }}><PersonIcon /></Avatar>}
//           </Box>
//         ))}
//         {loading && <CircularProgress size={20} sx={{ ml: 2 }} />}
//         <div ref={messagesEndRef} />
//       </Paper>

//       <Paper component="form" onSubmit={handleSend} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
//         <TextField fullWidth placeholder="Ask a question..." variant="standard" value={input} onChange={(e) => setInput(e.target.value)} InputProps={{ disableUnderline: true, sx: { ml: 2 } }} />
//         <Button type="submit" disabled={loading} sx={{ p: '10px' }}><SendIcon color="primary" /></Button>
//       </Paper>
//     </Box>
//   );
// };

// export default Chatbot;
import { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography, Avatar, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Correctly imported

const Chatbot = () => {
  // --- THIS WAS MISSING ---
  const { user } = useAuth(); 
  // ------------------------

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am your Alzheimer's Care Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Extract name from email (e.g., "john@gmail.com" -> "john")
      const userName = user?.email ? user.email.split('@')[0] : "Friend";

      const response = await axios.post('http://127.0.0.1:5001/message', {
        text: input,
        sender_name: userName 
      });

      const botText = response.data.response || "I received your message.";
      const botMessage = { id: Date.now() + 1, text: botText, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Bot Error:", error);
      const errorMessage = { id: Date.now() + 1, text: "Sorry, I can't connect to the AI right now.", sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '85vh', display: 'flex', flexDirection: 'column', maxWidth: '900px', mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>AI Care Assistant</Typography>
      
      <Paper elevation={3} sx={{ flexGrow: 1, mb: 2, p: 2, overflowY: 'auto', bgcolor: '#f5f5f5', borderRadius: 2 }}>
        {messages.map((msg) => (
          <Box key={msg.id} sx={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', mb: 2 }}>
            {msg.sender === 'bot' && <Avatar sx={{ bgcolor: 'secondary.main', mr: 1 }}><SmartToyIcon /></Avatar>}
            <Paper sx={{ p: 2, maxWidth: '70%', bgcolor: msg.sender === 'user' ? 'primary.main' : 'white', color: msg.sender === 'user' ? 'white' : 'text.primary', borderRadius: 2 }}>
              <Typography variant="body1">{msg.text}</Typography>
            </Paper>
            {msg.sender === 'user' && <Avatar sx={{ bgcolor: 'primary.dark', ml: 1 }}><PersonIcon /></Avatar>}
          </Box>
        ))}
        {loading && <CircularProgress size={20} sx={{ ml: 2 }} />}
        <div ref={messagesEndRef} />
      </Paper>

      <Paper component="form" onSubmit={handleSend} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
        <TextField fullWidth placeholder="Ask a question..." variant="standard" value={input} onChange={(e) => setInput(e.target.value)} InputProps={{ disableUnderline: true, sx: { ml: 2 } }} />
        <Button type="submit" disabled={loading} sx={{ p: '10px' }}><SendIcon color="primary" /></Button>
      </Paper>
    </Box>
  );
};

export default Chatbot;