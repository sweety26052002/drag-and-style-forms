
import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Radio, 
  FormControlLabel, 
  Checkbox, 
  Select, 
  MenuItem, 
  FormControl
} from '@mui/material';
import { useFormContext } from '@/contexts/FormContext';

const FormQuestion = ({ question, index }) => {
  const { globalStyle } = useFormContext();

  // Apply global styles unless overridden by question-specific styles
  const questionStyle = {
    color: question.style?.fontColor || globalStyle.questionStyle.fontColor,
    fontSize: question.style?.fontSize || globalStyle.questionStyle.fontSize,
    fontWeight: question.style?.fontWeight || globalStyle.questionStyle.fontWeight,
    textAlign: question.style?.textAlign || globalStyle.questionStyle.textAlign,
    ...(question.style?.isBold || globalStyle.questionStyle.isBold ? { fontWeight: 'bold' } : {})
  };

  const optionStyle = {
    color: globalStyle.optionStyle.fontColor,
    fontSize: globalStyle.optionStyle.fontSize,
    fontWeight: globalStyle.optionStyle.fontWeight,
    textAlign: globalStyle.optionStyle.textAlign,
    ...(globalStyle.optionStyle.isBold ? { fontWeight: 'bold' } : {})
  };

  return (
    <Paper sx={{ p: 2, mb: 2, border: '1px solid #e0e0e0' }}>
      <Typography sx={{ mb: 2, ...questionStyle }}>
        <span style={{ marginRight: '8px', color: '#8B5CF6' }}>{index + 1}.</span>
        {question.text}
      </Typography>

      {question.options.length > 0 && (
        <Box sx={{ pl: 3 }}>
          {question.type === 'multiChoice' && question.options.map((option) => (
            <FormControlLabel
              key={option.id}
              control={<Radio />}
              label={<span style={optionStyle}>{option.text}</span>}
              sx={{ display: 'block', mb: 1 }}
            />
          ))}
          
          {question.type === 'checkbox' && question.options.map((option) => (
            <FormControlLabel
              key={option.id}
              control={<Checkbox />}
              label={<span style={optionStyle}>{option.text}</span>}
              sx={{ display: 'block', mb: 1 }}
            />
          ))}
          
          {question.type === 'dropdown' && (
            <FormControl fullWidth sx={{ mt: 1 }}>
              <Select defaultValue="">
                <MenuItem value="" disabled>Select an option</MenuItem>
                {question.options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          
          {question.type === 'text' && (
            <FormControl fullWidth sx={{ mt: 1 }}>
              <input 
                type="text" 
                placeholder="Your answer" 
                style={{ 
                  padding: '8px', 
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  width: '100%',
                  boxSizing: 'border-box'
                }} 
              />
            </FormControl>
          )}
        </Box>
      )}
    </Paper>
  );
};

const SectionContainer = ({ section, questions }) => {
  const { globalStyle } = useFormContext();

  const sectionStyle = {
    display: 'flex',
    flexDirection: section.style?.flexDirection || globalStyle.sectionStyle.flexDirection,
    backgroundColor: section.style?.backgroundColor || globalStyle.sectionStyle.backgroundColor,
    borderColor: section.style?.borderColor || globalStyle.sectionStyle.borderColor,
    borderWidth: section.style?.borderWidth || globalStyle.sectionStyle.borderWidth,
    borderRadius: section.style?.borderRadius || globalStyle.sectionStyle.borderRadius,
    padding: section.style?.padding || globalStyle.sectionStyle.padding,
  };

  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        mb: 2,
        overflow: 'hidden', 
        ...sectionStyle
      }}
    >
      <Box sx={{ p: 1, bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="subtitle2">{section.title}</Typography>
      </Box>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: section.style?.flexDirection, 
        gap: 2 
      }}>
        {questions.map((question, index) => (
          <Box 
            key={question.id} 
            sx={{ flex: section.style?.flexDirection === 'row' ? 1 : 'unset' }}
          >
            <FormQuestion 
              question={question} 
              index={questions.findIndex(q => q.id === question.id)} 
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

const FormDisplay = () => {
  const { formQuestions, sections } = useFormContext();

  // Get questions that are not in any section
  const nonSectionQuestions = formQuestions.filter(
    question => !sections.some(section => section.questionIds.includes(question.id))
  );

  if (formQuestions.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Form Preview</Typography>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="textSecondary">
            No questions have been added to the form yet. Go to Form Builder to add questions.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Form Preview</Typography>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Sample Form
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            This is how your form will appear to users. All fields are interactive in this preview.
          </Typography>
        </Box>

        {sections.map((section) => {
          const sectionQuestions = formQuestions.filter(
            question => section.questionIds.includes(question.id)
          );
          return (
            <SectionContainer 
              key={section.id} 
              section={section} 
              questions={sectionQuestions} 
            />
          );
        })}
        
        {nonSectionQuestions.map((question, index) => (
          <FormQuestion 
            key={question.id} 
            question={question} 
            index={index} 
          />
        ))}
      </Paper>
    </Box>
  );
};

export default FormDisplay;
