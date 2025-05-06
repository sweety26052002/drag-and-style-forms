import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext, QuestionStyle, OptionStyle, SectionStyle, GlobalStyle } from "@/contexts/FormContext";
import { AlignLeft, AlignCenter, AlignRight, Bold, Type, Pencil } from 'lucide-react';

// Color picker component
const ColorPicker: React.FC<{
  value: string;
  onChange: (value: string) => void;
  label: string;
}> = ({ value, onChange, label }) => {
  const colors = [
    "#000000", // Black
    "#333333", // Dark Gray
    "#555555", // Medium Gray
    "#8E9196", // Neutral Gray
    "#9b87f5", // Primary Purple
    "#7E69AB", // Secondary Purple
    "#6E59A5", // Tertiary Purple
    "#1A1F2C", // Dark Purple
    "#D6BCFA", // Light Purple
    "#8B5CF6", // Vivid Purple
    "#D946EF", // Magenta Pink
    "#F97316", // Bright Orange
    "#0EA5E9", // Ocean Blue
    "#EA4335", // Red
    "#34A853", // Green
    "#4285F4", // Blue
    "#FBBC05", // Yellow
  ];

  return (
    <div>
      <Label className="text-sm mb-2 block">{label}</Label>
      <div className="flex items-center mb-4">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mr-2 w-8 h-8 border-0 p-0 rounded"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-28 text-xs"
        />
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            className={`w-5 h-5 rounded-full border ${value.toLowerCase() === color.toLowerCase() ? 'ring-2 ring-offset-1 ring-form-purple' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
          />
        ))}
      </div>
    </div>
  );
};

// Font size picker
const FontSizePicker: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const sizes = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px"];
  
  return (
    <div className="mb-4">
      <Label className="text-sm mb-2 block">Font Size</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          {sizes.map((size) => (
            <SelectItem key={size} value={size}>{size}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Font weight picker
const FontWeightPicker: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const weights = [
    { label: "Normal (400)", value: "400" },
    { label: "Medium (500)", value: "500" },
    { label: "Semibold (600)", value: "600" },
    { label: "Bold (700)", value: "700" }
  ];
  
  return (
    <div className="mb-4">
      <Label className="text-sm mb-2 block">Font Weight</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select weight" />
        </SelectTrigger>
        <SelectContent>
          {weights.map((weight) => (
            <SelectItem key={weight.value} value={weight.value}>{weight.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Text alignment component
const TextAlignmentPicker: React.FC<{
  value: 'left' | 'center' | 'right';
  onChange: (value: 'left' | 'center' | 'right') => void;
}> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <Label className="text-sm mb-2 block">Text Alignment</Label>
      <div className="flex border rounded-md overflow-hidden">
        <Button
          type="button"
          variant={value === 'left' ? 'default' : 'ghost'}
          className={`flex-1 rounded-none ${value === 'left' ? 'bg-form-purple' : ''}`}
          onClick={() => onChange('left')}
        >
          <AlignLeft size={16} />
        </Button>
        <Button
          type="button"
          variant={value === 'center' ? 'default' : 'ghost'}
          className={`flex-1 rounded-none ${value === 'center' ? 'bg-form-purple' : ''}`}
          onClick={() => onChange('center')}
        >
          <AlignCenter size={16} />
        </Button>
        <Button
          type="button"
          variant={value === 'right' ? 'default' : 'ghost'}
          className={`flex-1 rounded-none ${value === 'right' ? 'bg-form-purple' : ''}`}
          onClick={() => onChange('right')}
        >
          <AlignRight size={16} />
        </Button>
      </div>
    </div>
  );
};

// Bold toggle component
const BoldToggle: React.FC<{
  value: boolean;
  onChange: (value: boolean) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <Checkbox 
        id="is-bold" 
        checked={value}
        onCheckedChange={onChange} 
      />
      <Label htmlFor="is-bold" className="flex items-center cursor-pointer">
        <Bold size={16} className="mr-1.5" />
        Bold Text
      </Label>
    </div>
  );
};

// Question style editor
const QuestionStyleEditor: React.FC<{
  style: QuestionStyle;
  onChange: (style: QuestionStyle) => void;
}> = ({ style, onChange }) => {
  return (
    <div>
      <ColorPicker
        label="Text Color"
        value={style.fontColor || '#333333'}
        onChange={(fontColor) => onChange({ ...style, fontColor })}
      />
      
      <FontSizePicker
        value={style.fontSize || '16px'}
        onChange={(fontSize) => onChange({ ...style, fontSize })}
      />
      
      <FontWeightPicker
        value={style.fontWeight || '500'}
        onChange={(fontWeight) => onChange({ ...style, fontWeight })}
      />
      
      <TextAlignmentPicker
        value={style.textAlign || 'left'}
        onChange={(textAlign) => onChange({ ...style, textAlign })}
      />
      
      <BoldToggle
        value={!!style.isBold}
        onChange={(isBold) => onChange({ ...style, isBold })}
      />
    </div>
  );
};

// Option style editor
const OptionStyleEditor: React.FC<{
  style: OptionStyle;
  onChange: (style: OptionStyle) => void;
}> = ({ style, onChange }) => {
  return (
    <div>
      <ColorPicker
        label="Text Color"
        value={style.fontColor || '#555555'}
        onChange={(fontColor) => onChange({ ...style, fontColor })}
      />
      
      <FontSizePicker
        value={style.fontSize || '14px'}
        onChange={(fontSize) => onChange({ ...style, fontSize })}
      />
      
      <FontWeightPicker
        value={style.fontWeight || '400'}
        onChange={(fontWeight) => onChange({ ...style, fontWeight })}
      />
      
      <TextAlignmentPicker
        value={style.textAlign || 'left'}
        onChange={(textAlign) => onChange({ ...style, textAlign })}
      />
      
      <BoldToggle
        value={!!style.isBold}
        onChange={(isBold) => onChange({ ...style, isBold })}
      />
    </div>
  );
};

// Section style editor
const SectionStyleEditor: React.FC<{
  style: SectionStyle;
  onChange: (style: SectionStyle) => void;
}> = ({ style, onChange }) => {
  return (
    <div>
      <div className="mb-4">
        <Label className="text-sm mb-2 block">Layout Direction</Label>
        <Select 
          value={style.flexDirection || 'column'} 
          onValueChange={(flexDirection: 'row' | 'column') => onChange({ ...style, flexDirection })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="row">Row (Side by Side)</SelectItem>
            <SelectItem value="column">Column (Stacked)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <ColorPicker
        label="Background Color"
        value={style.backgroundColor || '#f9f9f9'}
        onChange={(backgroundColor) => onChange({ ...style, backgroundColor })}
      />
      
      <ColorPicker
        label="Border Color"
        value={style.borderColor || '#e0e0e0'}
        onChange={(borderColor) => onChange({ ...style, borderColor })}
      />
      
      <div className="mb-4">
        <Label className="text-sm mb-2 block">Border Width</Label>
        <Select 
          value={style.borderWidth || '1px'} 
          onValueChange={(borderWidth) => onChange({ ...style, borderWidth })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select border width" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">None</SelectItem>
            <SelectItem value="1px">Thin (1px)</SelectItem>
            <SelectItem value="2px">Medium (2px)</SelectItem>
            <SelectItem value="3px">Thick (3px)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-4">
        <Label className="text-sm mb-2 block">Border Radius</Label>
        <Select 
          value={style.borderRadius || '8px'} 
          onValueChange={(borderRadius) => onChange({ ...style, borderRadius })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select border radius" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Square (0px)</SelectItem>
            <SelectItem value="4px">Small (4px)</SelectItem>
            <SelectItem value="8px">Medium (8px)</SelectItem>
            <SelectItem value="16px">Large (16px)</SelectItem>
            <SelectItem value="24px">Extra Large (24px)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-4">
        <Label className="text-sm mb-2 block">Padding</Label>
        <Select 
          value={style.padding || '16px'} 
          onValueChange={(padding) => onChange({ ...style, padding })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select padding" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="8px">Small (8px)</SelectItem>
            <SelectItem value="16px">Medium (16px)</SelectItem>
            <SelectItem value="24px">Large (24px)</SelectItem>
            <SelectItem value="32px">Extra Large (32px)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

interface StyleEditorProps {
  open: boolean;
  onClose: () => void;
  isGlobal?: boolean;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ open, onClose, isGlobal = false }) => {
  const { 
    selectedQuestion, 
    updateQuestionStyle, 
    updateGlobalStyle,
    globalStyle
  } = useFormContext();
  
  const [tempStyle, setTempStyle] = useState<{
    question: QuestionStyle,
    option: OptionStyle,
    section: SectionStyle
  }>({
    question: { ...globalStyle.questionStyle },
    option: { ...globalStyle.optionStyle },
    section: { ...globalStyle.sectionStyle }
  });
  
  useEffect(() => {
    if (isGlobal) {
      setTempStyle({
        question: { ...globalStyle.questionStyle },
        option: { ...globalStyle.optionStyle },
        section: { ...globalStyle.sectionStyle }
      });
    } else if (selectedQuestion) {
      setTempStyle({
        question: { ...globalStyle.questionStyle, ...selectedQuestion.style },
        option: { ...globalStyle.optionStyle },
        section: { ...globalStyle.sectionStyle }
      });
    }
  }, [isGlobal, selectedQuestion, globalStyle, open]);
  
  const handleSave = () => {
    if (isGlobal) {
      updateGlobalStyle({
        questionStyle: tempStyle.question,
        optionStyle: tempStyle.option,
        sectionStyle: tempStyle.section
      });
    } else if (selectedQuestion) {
      updateQuestionStyle(selectedQuestion.id, tempStyle.question);
    }
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isGlobal ? 'Edit Global Styles' : 'Edit Question Styles'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="question" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="question" className="flex items-center">
              <Type size={16} className="mr-1.5" />
              Question
            </TabsTrigger>
            {isGlobal && (
              <>
                <TabsTrigger value="option" className="flex items-center">
                  <Pencil size={16} className="mr-1.5" />
                  Options
                </TabsTrigger>
                <TabsTrigger value="section" className="flex items-center">
                  <AlignLeft size={16} className="mr-1.5" />
                  Sections
                </TabsTrigger>
              </>
            )}
          </TabsList>
          
          <TabsContent value="question" className="p-4 border rounded-md mt-4">
            <QuestionStyleEditor
              style={tempStyle.question}
              onChange={(style) => setTempStyle({ ...tempStyle, question: style })}
            />
          </TabsContent>
          
          {isGlobal && (
            <>
              <TabsContent value="option" className="p-4 border rounded-md mt-4">
                <OptionStyleEditor
                  style={tempStyle.option}
                  onChange={(style) => setTempStyle({ ...tempStyle, option: style })}
                />
              </TabsContent>
              
              <TabsContent value="section" className="p-4 border rounded-md mt-4">
                <SectionStyleEditor
                  style={tempStyle.section}
                  onChange={(style) => setTempStyle({ ...tempStyle, section: style })}
                />
              </TabsContent>
            </>
          )}
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StyleEditor;
