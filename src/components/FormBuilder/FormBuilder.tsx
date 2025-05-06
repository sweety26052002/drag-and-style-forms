
import React, { useState } from 'react';
import QuestionsList from './QuestionsList';
import FormPreview from './FormPreview';
import StyleEditor from './StyleEditor';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useFormContext } from '@/contexts/FormContext';

const FormBuilder = () => {
  const [styleEditorOpen, setStyleEditorOpen] = useState(false);
  const [globalStyleEditorOpen, setGlobalStyleEditorOpen] = useState(false);
  const { questions } = useFormContext();

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Form Builder</h1>
        <Button 
          variant="outline"
          className="flex items-center"
          onClick={() => setGlobalStyleEditorOpen(true)}
        >
          <Settings size={16} className="mr-2" />
          Global Styles
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-150px)]">
        <div className="h-full">
          <FormPreview onStyleClick={() => setStyleEditorOpen(true)} />
        </div>
        <div className="h-full">
          <QuestionsList title="Available Questions" questions={questions} />
        </div>
      </div>

      <StyleEditor 
        open={styleEditorOpen}
        onClose={() => setStyleEditorOpen(false)}
        isGlobal={false}
      />

      <StyleEditor 
        open={globalStyleEditorOpen}
        onClose={() => setGlobalStyleEditorOpen(false)}
        isGlobal={true}
      />
    </div>
  );
};

export default FormBuilder;
