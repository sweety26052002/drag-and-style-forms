
import React, { useState } from 'react';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import FormDisplay from '@/components/FormBuilder/FormDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormProvider } from '@/contexts/FormContext';
import { DragProvider } from '@/contexts/DragContext';

const Index = () => {
  const [activeTab, setActiveTab] = useState('builder');
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Form Creator</h1>
      
      <FormProvider>
        <DragProvider>
          <Tabs defaultValue="builder" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-4">
              <TabsList>
                <TabsTrigger value="builder">Form Builder</TabsTrigger>
                <TabsTrigger value="preview">Form Preview</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="builder">
              <FormBuilder />
            </TabsContent>
            
            <TabsContent value="preview">
              <FormDisplay />
            </TabsContent>
          </Tabs>
        </DragProvider>
      </FormProvider>
    </div>
  );
};

export default Index;
