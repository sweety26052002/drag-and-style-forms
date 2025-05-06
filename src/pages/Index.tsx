
import React, { useState } from 'react';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import FormDisplay from '@/components/FormBuilder/FormDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState('builder');
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Form Creator</h1>
      
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
    </div>
  );
};

export default Index;
