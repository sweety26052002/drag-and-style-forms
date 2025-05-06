
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFormContext, Question, Section } from '@/contexts/FormContext';
import { useDragContext } from '@/contexts/DragContext';
import { Trash2, Settings } from 'lucide-react';

const FormQuestion: React.FC<{
  question: Question;
  index: number;
  onStyleClick: () => void;
}> = ({ question, index, onStyleClick }) => {
  const { removeQuestionFromForm, selectQuestion, globalStyle } = useFormContext();

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
    textAlign: globalStyle.optionStyle.textAlign as any,
    ...(globalStyle.optionStyle.isBold ? { fontWeight: 'bold' } : {})
  };

  const handleRemove = () => {
    removeQuestionFromForm(question.id);
  };

  const handleStyleClick = () => {
    selectQuestion(question.id);
    onStyleClick();
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 mb-3">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1" style={questionStyle as React.CSSProperties}>
          <span className="mr-2 text-form-purple">{index + 1}.</span>
          {question.text}
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleStyleClick}
            className="h-7 w-7"
          >
            <Settings size={14} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRemove} 
            className="h-7 w-7 text-destructive hover:text-destructive"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>

      {question.options.length > 0 && (
        <div className="mt-2 pl-6 space-y-1">
          {question.type === 'multiChoice' && question.options.map((option) => (
            <div key={option.id} className="flex items-center" style={optionStyle as React.CSSProperties}>
              <input type="radio" className="mr-2" disabled />
              {option.text}
            </div>
          ))}
          
          {question.type === 'checkbox' && question.options.map((option) => (
            <div key={option.id} className="flex items-center" style={optionStyle as React.CSSProperties}>
              <input type="checkbox" className="mr-2" disabled />
              {option.text}
            </div>
          ))}
          
          {question.type === 'dropdown' && (
            <select className="w-full p-2 border border-gray-300 rounded-md bg-white" disabled>
              <option>Select an option</option>
              {question.options.map((option) => (
                <option key={option.id}>{option.text}</option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  );
};

const SectionContainer: React.FC<{
  section: Section;
  questions: Question[];
  onStyleClick: () => void;
}> = ({ section, questions, onStyleClick }) => {
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
    <div 
      className="mb-4 border rounded-md overflow-hidden shadow-sm"
      style={sectionStyle as React.CSSProperties}
    >
      <div className="p-2 bg-muted/50 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">{section.title}</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onStyleClick}
            className="h-6 text-xs"
          >
            <Settings size={12} className="mr-1" />
            Section Style
          </Button>
        </div>
      </div>
      <div className={`p-3 ${section.style?.flexDirection === 'row' ? 'flex gap-2' : 'space-y-3'}`}>
        {questions.map((question, index) => (
          <div key={question.id} className={section.style?.flexDirection === 'row' ? 'flex-1' : ''}>
            <FormQuestion 
              question={question} 
              index={questions.findIndex(q => q.id === question.id)} 
              onStyleClick={onStyleClick} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

interface FormPreviewProps {
  onStyleClick: () => void;
}

const FormPreview: React.FC<FormPreviewProps> = ({ onStyleClick }) => {
  const { formQuestions, sections, addQuestionToForm } = useFormContext();
  const { endDrag } = useDragContext();
  
  // Get questions that are not in any section
  const nonSectionQuestions = formQuestions.filter(
    question => !sections.some(section => section.questionIds.includes(question.id))
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const questionData = e.dataTransfer.getData('application/json');
      if (questionData) {
        const question = JSON.parse(questionData);
        addQuestionToForm(question);
      }
    } catch (error) {
      console.error('Error parsing dropped data:', error);
    }
    endDrag();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Form Preview</CardTitle>
      </CardHeader>
      <CardContent 
        className="space-y-4 min-h-[400px] overflow-y-auto max-h-[calc(100vh-200px)]"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {formQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-md bg-muted/30 text-muted-foreground">
            <p>Drag questions here to build your form</p>
          </div>
        ) : (
          <>
            {sections.map((section) => {
              const sectionQuestions = formQuestions.filter(
                question => section.questionIds.includes(question.id)
              );
              return (
                <SectionContainer 
                  key={section.id} 
                  section={section} 
                  questions={sectionQuestions}
                  onStyleClick={onStyleClick}
                />
              );
            })}
            
            {nonSectionQuestions.map((question, index) => (
              <FormQuestion 
                key={question.id} 
                question={question} 
                index={index} 
                onStyleClick={onStyleClick} 
              />
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FormPreview;
