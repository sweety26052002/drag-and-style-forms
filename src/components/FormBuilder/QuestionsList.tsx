
import React from 'react';
import { useDrag } from 'react-dnd';
import { Paper, Typography, Box, List, ListItem } from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useFormContext, Question } from '@/contexts/FormContext';

interface QuestionsListProps {
  title: string;
  questions: Question[];
}

const DraggableQuestionItem = ({ question }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'QUESTION',
    item: question,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Paper
      ref={drag}
      sx={{
        p: 2,
        mb: 1,
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        transition: 'box-shadow 0.3s',
        '&:hover': {
          boxShadow: 3,
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextFieldsIcon fontSize="small" sx={{ color: '#8B5CF6', opacity: 0.6 }} />
        <Typography variant="body1">{question.text}</Typography>
      </Box>
      {question.options.length > 0 && (
        <Typography variant="caption" sx={{ pl: 3, color: 'text.secondary', display: 'block', mt: 1 }}>
          {question.options.length} options available
        </Typography>
      )}
    </Paper>
  );
};

const QuestionsList: React.FC<QuestionsListProps> = ({ title, questions }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
      <List sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
        {questions.map((question) => (
          <ListItem key={question.id} disablePadding sx={{ mb: 1 }}>
            <DraggableQuestionItem question={question} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default QuestionsList;
