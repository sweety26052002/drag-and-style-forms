
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFormContext, Question, Section } from '@/contexts/FormContext';

const FormQuestion: React.FC<{
  question: Question;
  index: number;
}> = ({ question, index }) => {
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
    textAlign: globalStyle.optionStyle.textAlign as any,
    ...(globalStyle.optionStyle.isBold ? { fontWeight: 'bold' } : {})
  };

  return (
    <div className="mb-6">
      <div style={questionStyle as React.CSSProperties} className="mb-2">
        <span className="mr-2">{index + 1}.</span>
        {question.text}
      </div>

      {question.options.length > 0 && (
        <div className="pl-6 space-y-2">
          {question.type === 'multiChoice' && question.options.map((option) => (
            <div key={option.id} className="flex items-center" style={optionStyle as React.CSSProperties}>
              <input type="radio" name={`question-${question.id}`} className="mr-2" />
              {option.text}
            </div>
          ))}
          
          {question.type === 'checkbox' && question.options.map((option) => (
            <div key={option.id} className="flex items-center" style={optionStyle as React.CSSProperties}>
              <input type="checkbox" className="mr-2" />
              {option.text}
            </div>
          ))}
          
          {question.type === 'dropdown' && (
            <select 
              className="w-full p-2 border border-gray-300 rounded-md" 
              style={optionStyle as React.CSSProperties}
            >
              <option value="">Please select</option>
              {question.options.map((option) => (
                <option key={option.id} value={option.id}>{option.text}</option>
              ))}
            </select>
          )}
          
          {question.type === 'text' && (
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              placeholder="Your answer"
            />
          )}
        </div>
      )}
      
      {question.type === 'text' && question.options.length === 0 && (
        <div className="pl-6">
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            placeholder="Your answer"
          />
        </div>
      )}
    </div>
  );
};

const SectionContainer: React.FC<{
  section: Section;
  questions: Question[];
}> = ({ section, questions }) => {
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
      className="mb-6 border rounded-md shadow-sm"
      style={sectionStyle as React.CSSProperties}
    >
      <div className="p-2 bg-muted/30 border-b">
        <h3 className="text-sm font-medium">{section.title}</h3>
      </div>
      <div className={`p-4 ${section.style?.flexDirection === 'row' ? 'flex gap-4' : 'space-y-4'}`}>
        {questions.map((question, index) => (
          <div key={question.id} className={section.style?.flexDirection === 'row' ? 'flex-1' : ''}>
            <FormQuestion 
              question={question} 
              index={questions.findIndex(q => q.id === question.id)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const FormDisplay: React.FC = () => {
  const { formQuestions, sections } = useFormContext();
  
  // Get questions that are not in any section
  const nonSectionQuestions = formQuestions.filter(
    question => !sections.some(section => section.questionIds.includes(question.id))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add form submission logic here
    alert('Form submitted!');
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {formQuestions.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No questions have been added to the form yet.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
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
            
            <div className="flex justify-end mt-6">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default FormDisplay;
