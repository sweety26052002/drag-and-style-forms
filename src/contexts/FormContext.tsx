
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from "sonner";

// Define types for our form items
export interface QuestionStyle {
  fontColor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  isBold?: boolean;
}

export interface OptionStyle extends QuestionStyle {}

export interface SectionStyle {
  flexDirection?: 'row' | 'column';
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  padding?: string;
}

export interface GlobalStyle {
  questionStyle: QuestionStyle;
  optionStyle: OptionStyle;
  sectionStyle: SectionStyle;
}

export interface QuestionOption {
  id: string;
  text: string;
  style?: OptionStyle;
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiChoice' | 'checkbox' | 'dropdown';
  options: QuestionOption[];
  style?: QuestionStyle;
  sectionId?: string;
}

export interface Section {
  id: string;
  title: string;
  questionIds: string[];
  style?: SectionStyle;
}

export interface FormContextType {
  questions: Question[];
  formQuestions: Question[];
  sections: Section[];
  globalStyle: GlobalStyle;
  selectedQuestion: Question | null;
  addQuestionToForm: (question: Question) => void;
  removeQuestionFromForm: (questionId: string) => void;
  updateQuestion: (question: Question) => void;
  updateQuestionStyle: (questionId: string, style: QuestionStyle) => void;
  updateGlobalStyle: (style: Partial<GlobalStyle>) => void;
  createSection: (title: string, questionIds: string[]) => void;
  addQuestionToSection: (questionId: string, sectionId: string) => void;
  removeQuestionFromSection: (questionId: string) => void;
  updateSectionStyle: (sectionId: string, style: SectionStyle) => void;
  selectQuestion: (questionId: string | null) => void;
  moveQuestion: (dragIndex: number, hoverIndex: number) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

// Sample questions data
const sampleQuestions: Question[] = [
  {
    id: 'q1',
    text: 'What is your name?',
    type: 'text',
    options: []
  },
  {
    id: 'q2',
    text: 'How old are you?',
    type: 'text',
    options: []
  },
  {
    id: 'q3',
    text: 'What is your favorite color?',
    type: 'multiChoice',
    options: [
      { id: 'opt1', text: 'Red' },
      { id: 'opt2', text: 'Blue' },
      { id: 'opt3', text: 'Green' },
      { id: 'opt4', text: 'Yellow' }
    ]
  },
  {
    id: 'q4',
    text: 'Select all that apply:',
    type: 'checkbox',
    options: [
      { id: 'opt5', text: 'I like reading' },
      { id: 'opt6', text: 'I like sports' },
      { id: 'opt7', text: 'I like music' },
      { id: 'opt8', text: 'I like traveling' }
    ]
  },
  {
    id: 'q5',
    text: 'What is your education level?',
    type: 'dropdown',
    options: [
      { id: 'opt9', text: 'High School' },
      { id: 'opt10', text: 'Bachelors' },
      { id: 'opt11', text: 'Masters' },
      { id: 'opt12', text: 'PhD' }
    ]
  },
  {
    id: 'q6',
    text: 'How would you rate our service?',
    type: 'multiChoice',
    options: [
      { id: 'opt13', text: 'Excellent' },
      { id: 'opt14', text: 'Good' },
      { id: 'opt15', text: 'Average' },
      { id: 'opt16', text: 'Poor' }
    ]
  },
  {
    id: 'q7',
    text: 'Do you have any suggestions?',
    type: 'text',
    options: []
  },
  {
    id: 'q8',
    text: 'How did you hear about us?',
    type: 'multiChoice',
    options: [
      { id: 'opt17', text: 'Social Media' },
      { id: 'opt18', text: 'Friends' },
      { id: 'opt19', text: 'Advertisement' },
      { id: 'opt20', text: 'Other' }
    ]
  },
  {
    id: 'q9',
    text: 'Would you recommend us to others?',
    type: 'multiChoice',
    options: [
      { id: 'opt21', text: 'Yes' },
      { id: 'opt22', text: 'No' },
      { id: 'opt23', text: 'Maybe' }
    ]
  },
  {
    id: 'q10',
    text: 'What features would you like to see?',
    type: 'text',
    options: []
  }
];

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [formQuestions, setFormQuestions] = useState<Question[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [globalStyle, setGlobalStyle] = useState<GlobalStyle>({
    questionStyle: {
      fontColor: '#333333',
      fontSize: '16px',
      fontWeight: '500',
      textAlign: 'left',
      isBold: false,
    },
    optionStyle: {
      fontColor: '#555555',
      fontSize: '14px',
      fontWeight: '400',
      textAlign: 'left',
      isBold: false,
    },
    sectionStyle: {
      flexDirection: 'column',
      backgroundColor: '#f9f9f9',
      borderColor: '#e0e0e0',
      borderWidth: '1px',
      borderRadius: '8px',
      padding: '16px',
    }
  });

  const addQuestionToForm = (question: Question) => {
    // Create a copy of the question to avoid reference issues
    const questionCopy = { ...question, id: `form-${question.id}-${Date.now()}` };
    setFormQuestions([...formQuestions, questionCopy]);
    toast.success("Question added to form");
  };

  const removeQuestionFromForm = (questionId: string) => {
    setFormQuestions(formQuestions.filter(q => q.id !== questionId));
    // Also remove from any section if it's in one
    setSections(sections.map(section => ({
      ...section,
      questionIds: section.questionIds.filter(id => id !== questionId)
    })));
    toast.info("Question removed from form");
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setFormQuestions(formQuestions.map(q => 
      q.id === updatedQuestion.id ? updatedQuestion : q
    ));
  };

  const updateQuestionStyle = (questionId: string, style: QuestionStyle) => {
    setFormQuestions(formQuestions.map(q => 
      q.id === questionId ? { ...q, style: { ...q.style, ...style } } : q
    ));
    toast.success("Question style updated");
  };

  const updateGlobalStyle = (style: Partial<GlobalStyle>) => {
    setGlobalStyle({ ...globalStyle, ...style });
    toast.success("Global style updated");
  };

  const createSection = (title: string, questionIds: string[]) => {
    const newSection = {
      id: `section-${Date.now()}`,
      title,
      questionIds,
      style: { ...globalStyle.sectionStyle }
    };
    setSections([...sections, newSection]);
    toast.success("New section created");
  };

  const addQuestionToSection = (questionId: string, sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, questionIds: [...section.questionIds, questionId] }
        : section
    ));
  };

  const removeQuestionFromSection = (questionId: string) => {
    setSections(sections.map(section => ({
      ...section,
      questionIds: section.questionIds.filter(id => id !== questionId)
    })));
  };

  const updateSectionStyle = (sectionId: string, style: SectionStyle) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, style: { ...section.style, ...style } } : section
    ));
    toast.success("Section style updated");
  };

  const selectQuestion = (questionId: string | null) => {
    if (!questionId) {
      setSelectedQuestion(null);
      return;
    }
    
    const question = formQuestions.find(q => q.id === questionId);
    setSelectedQuestion(question || null);
  };

  const moveQuestion = (dragIndex: number, hoverIndex: number) => {
    const dragQuestion = formQuestions[dragIndex];
    if (!dragQuestion) return;

    const newFormQuestions = [...formQuestions];
    newFormQuestions.splice(dragIndex, 1);
    newFormQuestions.splice(hoverIndex, 0, dragQuestion);

    setFormQuestions(newFormQuestions);
  };

  return (
    <FormContext.Provider value={{
      questions,
      formQuestions,
      sections,
      globalStyle,
      selectedQuestion,
      addQuestionToForm,
      removeQuestionFromForm,
      updateQuestion,
      updateQuestionStyle,
      updateGlobalStyle,
      createSection,
      addQuestionToSection,
      removeQuestionFromSection,
      updateSectionStyle,
      selectQuestion,
      moveQuestion,
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
