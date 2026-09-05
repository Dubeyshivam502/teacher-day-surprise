import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Heart, Download, Terminal, UserCheck, ShieldAlert, Award, Star } from 'lucide-react';
import './index.css';

const TEACHER_NAME = "Bestie"; // Name goes here

const questions = [
  {
    question: "A student says: \"Ma'am bas 2 minute lagenge.\"\nWhat does this actually mean?",
    options: [
      "2 minutes",
      "5 minutes",
      "15 minutes",
      "Class khatam hone tak 😂"
    ]
  },
  {
    question: "When the whole class is silent, what's actually happening?",
    options: [
      "They are studying",
      "They understood everything",
      "Someone is definitely copying homework",
      "They are plotting something 🤫"
    ]
  },
  {
    question: "The most powerful weapon in your teaching arsenal?",
    options: [
      "The Chalk",
      "The Attendance Register",
      "\"Principal ko bulaun?\" 😭",
      "The 'Ek Silent Stare' 👀"
    ]
  }
];

export default function App() {
  const [screen, setScreen] = useState('boot'); // boot, verification, quiz, twist, reasons, certificate
  const [bootStep, setBootStep] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const certificateRef = useRef(null);

  // Boot sequence effect
  useEffect(() => {
    if (screen === 'boot') {
      const timer = setInterval(() => {
        setBootStep(prev => {
          if (prev >= 4) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
      return () => clearInterval(timer);
    }
  }, [screen]);

  const handleOptionSelect = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(c => c + 1);
        setSelectedOption(null);
      } else {
        setScreen('twist');
      }
    }, 1500);
  };

  const triggerHappiness = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#a855f7', '#ec4899', '#fbbf24'] });
    setScreen('quiz');
  };

  const downloadCertificate = () => {
    if (certificateRef.current) {
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 }, colors: ['#fbbf24'] });
      html2canvas(certificateRef.current, { scale: 3, useCORS: true }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Certificate_${TEACHER_NAME}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const reasons = [
    { num: "01", title: "Patience", desc: "Because dealing with students every day deserves a medal." },
    { num: "02", title: "Dedication", desc: "Teaching isn't just a job when you actually care about your students." },
    { num: "03", title: "The Person Behind", desc: "And beyond being a teacher, you're someone I'm genuinely lucky to call my bestie." }
  ];

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        
        {/* Stage 1: Booting */}
        {screen === 'boot' && (
          <motion.div key="boot" className="screen" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <motion.div className="warning-box glass-panel" variants={itemVariants} style={{ background: 'rgba(59, 130, 246, 0.15)', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
              <ShieldAlert className="warning-icon" size={56} style={{ color: '#60a5fa' }} />
              <h2 style={{ color: '#93c5fd' }}>🚨 SPECIAL ANNOUNCEMENT 🚨</h2>
              <p>A teacher has been nominated for an extremely prestigious award...</p>
            </motion.div>

            <motion.div className="terminal glass-panel" variants={itemVariants}>
              <div className="terminal-header">
                <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                <span className="title">TeacherOS v2.0</span>
              </div>
              <div className="terminal-body" style={{ minHeight: '200px' }}>
                <p className="typewriter highlight" style={{ marginBottom: '1rem' }}>Initializing TeacherOS...</p>
                {bootStep >= 1 && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="success-text">✓ Teaching Module loaded</motion.p>}
                {bootStep >= 2 && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="success-text">✓ Patience Module loaded</motion.p>}
                {bootStep >= 3 && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="success-text">✓ Student Management loaded</motion.p>}
                {bootStep >= 4 && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="success-text">✓ Bestie Support System ONLINE 💖</motion.p>}
              </div>
            </motion.div>

            {bootStep >= 4 && (
              <motion.button 
                className="primary-btn" 
                onClick={() => setScreen('verification')}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                Accept Nomination →
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Stage 2: Verification */}
        {screen === 'verification' && (
          <motion.div key="verification" className="screen" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <motion.div className="warning-box glass-panel" variants={itemVariants}>
              <Award className="warning-icon" size={56} style={{ color: '#fbbf24' }} />
              <h2 style={{ color: '#fde68a' }}>🏆 TEACHER OF THE YEAR</h2>
              <p>Nominee: <strong>{TEACHER_NAME}</strong></p>
            </motion.div>

            <motion.div className="terminal glass-panel" variants={itemVariants}>
              <div className="terminal-header">
                <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                <span className="title">system_verification.exe</span>
              </div>
              <div className="terminal-body">
                <p>Patience: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██████████ 100%</p>
                <p>Teaching: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██████████ 100%</p>
                <p>Handling Kids: &nbsp;&nbsp;█████████░ 95%</p>
                <p className="highlight" style={{ fontSize: '1.05rem', margin: '0.5rem 0' }}>
                  Handling Me: &nbsp;&nbsp;&nbsp;██████████ 100% 😂
                </p>
                <p>Attitude: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██████████ 100%</p>
                <hr style={{ border: '1px dashed rgba(255,255,255,0.2)', margin: '1rem 0' }} />
                <p style={{ color: '#9ca3af' }}>System Status:</p>
                <p style={{ color: '#34d399', fontWeight: 'bold' }}>No bugs detected.</p>
                <p style={{ color: '#fb7185' }}>Except occasionally... Bestie gets angry. 😂</p>
              </div>
            </motion.div>

            <motion.button 
              className="primary-btn" 
              onClick={triggerHappiness}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ background: 'linear-gradient(135deg, #ef4444, #ec4899)' }}
            >
              Run Happiness.exe ❤️
            </motion.button>
          </motion.div>
        )}

        {/* Stage 3: Quiz */}
        {screen === 'quiz' && (
          <motion.div key="quiz" className="screen" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <div className="quiz-header">
              <h3 style={{ color: '#f8fafc' }}>😂 How Well Do You Know Your Students?</h3>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${(currentQ / questions.length) * 100}%` }}></div>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div className="question-card glass-panel" key={currentQ} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
                <h2 style={{ whiteSpace: 'pre-line' }}>{questions[currentQ].question}</h2>
                <div className="options">
                  {questions[currentQ].options.map((opt, idx) => (
                    <button 
                      key={idx} 
                      className={`option-btn ${selectedOption === idx ? 'selected' : ''} ${selectedOption !== null && selectedOption !== idx ? 'faded' : ''}`}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={selectedOption !== null}
                    >
                      {opt}
                      {selectedOption === idx && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                          <CheckCircle2 className="check-icon" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Stage 4: Twist */}
        {screen === 'twist' && (
          <motion.div key="twist" className="screen final-screen" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <motion.div className="score-card glass-panel" variants={itemVariants} style={{ marginBottom: '2rem' }}>
              <p className="subtitle">Final Evaluation Result:</p>
              <h2 className="score">98/100</h2>
              <p style={{ color: '#34d399', fontSize: '1.2rem', fontWeight: 'bold' }}>You have officially survived the teaching profession. 🫡</p>
            </motion.div>

            <motion.div className="glass-panel" variants={itemVariants} style={{ padding: '2rem', textAlign: 'left', background: 'rgba(30, 41, 59, 0.9)' }}>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '1rem' }}>
                But there's one person whose evaluation doesn't count...
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 0.8 }} style={{ fontSize: '2.5rem', color: '#fbbf24', marginBottom: '1rem' }}>
                ME. 😌
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4, duration: 1 }} style={{ fontSize: '1.2rem', color: '#f8fafc' }}>
                Because I'm not your student.<br/>
                <span style={{ color: '#f472b6', fontWeight: 'bold' }}>I'm your bestie. ❤️</span>
              </motion.p>
            </motion.div>

            <motion.button 
              className="primary-btn" 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.5, duration: 0.5 }}
              onClick={() => setScreen('reasons')}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              See Why You're Amazing ✨
            </motion.button>
          </motion.div>
        )}

        {/* Stage 5: Reasons */}
        {screen === 'reasons' && (
          <motion.div key="reasons" className="screen" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <h2 className="gradient-text" style={{ textAlign: 'center', fontSize: '2rem' }}>Why You're Amazing</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {reasons.map((reason, idx) => (
                <motion.div key={idx} className="reason-card glass-panel" variants={itemVariants}>
                  <div className="reason-num">{reason.num}</div>
                  <div className="reason-content">
                    <h3>{reason.title}</h3>
                    <p>{reason.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div className="glass-panel" variants={itemVariants} style={{ padding: '2rem', textAlign: 'center', background: 'rgba(236, 72, 153, 0.15)', borderColor: 'rgba(236, 72, 153, 0.4)' }}>
              <h3 style={{ color: '#fdf2f8', fontStyle: 'italic' }}>"Happy Teacher's Day to one of my favourite humans. ❤️"</h3>
            </motion.div>

            <motion.button 
              className="primary-btn" 
              onClick={() => setScreen('certificate')}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              style={{ background: 'linear-gradient(135deg, #d4af37, #b48600)' }}
            >
              Collect Your Award 🏆
            </motion.button>
          </motion.div>
        )}

        {/* Stage 6: Certificate */}
        {screen === 'certificate' && (
          <motion.div key="certificate" className="screen final-screen" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className="certificate-wrapper" variants={itemVariants}>
              <div className="premium-certificate" ref={certificateRef}>
                <div className="cert-inner-border">
                  <div className="cert-header">
                    <Star className="cert-star left" size={24} />
                    <h3>Certificate of Appreciation</h3>
                    <Star className="cert-star right" size={24} />
                  </div>
                  <h4 className="cert-presented">This is proudly presented to</h4>
                  <h2 className="cert-name">{TEACHER_NAME}</h2>
                  <p className="cert-reason">
                    For successfully being an amazing teacher, maintaining extraordinary patience, and somehow managing to remain awesome outside the classroom too.
                  </p>
                  <div className="cert-footer">
                    <div className="cert-signature">
                      <span>Shivam Dubey</span>
                      <div className="line"></div>
                      <p>Favourite Software Engineer</p>
                    </div>
                    <div className="cert-seal">
                      <Award size={40} className="seal-icon" />
                      <span>BESTIE<br/>TEACHER</span>
                    </div>
                  </div>
                  <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                    Date: 5 September 2026
                  </div>
                </div>
              </div>

              <motion.button 
                className="download-btn"
                onClick={downloadCertificate}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              >
                <Download size={20} /> Download PDF / Image
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="footer">
        <p>Made with ❤️ by Shivam Dubey</p>
      </div>
    </div>
  );
}
