
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext, Question } from '@/contexts/FormContext';
import { useDragContext } from '@/contexts/DragContext';
import { AlignLeft } from 'lucide-react';

interface QuestionsListProps {
  title: string;
  questions: Question[];
}

const QuestionsList: React.FC<QuestionsListProps> = ({ title, questions }) => {
  const { startDrag } = useDragContext();
  
  const handleDragStart = (e: React.DragEvent, question: Question) => {
    e.dataTransfer.setData('application/json', JSON.stringify(question));
    startDrag(question);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        {questions.map((question) => (
          <div
            key={question.id}
            draggable
            onDragStart={(e) => handleDragStart(e, question)}
            className="bg-white p-3 rounded-md shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-2">
              <AlignLeft size={16} className="text-form-purple opacity-60" />
              <span className="text-sm font-medium">{question.text}</span>
            </div>
            {question.options.length > 0 && (
              <div className="mt-2 pl-6 text-xs text-gray-500">
                {question.options.length} options available
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuestionsList;
