import React from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';

const ToolbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 140px;
  background: #0f172a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 12px;
  gap: 16px;
  box-shadow: 2px 0 16px rgba(0, 0, 0, 0.6);
  z-index: 100;
  font-family: 'Baloo 2', cursive;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const ToolbarTitle = styled.h3`
  font-size: 1.2rem;
  color: #60a5fa;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 4px 0 0;
  font-style: italic;
`;

const ToolButton = styled.button`
  width: 90%;
  padding: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  background: ${props =>
    props.$active
      ? 'linear-gradient(135deg, #60a5fa, #3b82f6)'
      : '#1e293b'};
  color: ${props => (props.$active ? '#ffffff' : '#cbd5e1')};
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: ${props =>
      props.$active
        ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
        : '#334155'};
    transform: scale(1.02);
    box-shadow: 0 0 6px rgba(96, 165, 250, 0.3);
  }
`;

const ColorBox = styled.div`
  width: 120px;
  height: 30px;
  border-radius: 6px;
  border: 2px solid #334155;
  background: ${props => props.color};
  cursor: pointer;
  box-shadow: 0 0 4px rgba(255,255,255,0.15);
`;

const RangeInput = styled.input`
  width: 100%;
  cursor: pointer;
  background: transparent;
`;

const BrushSizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
`;

const BrushSizeLabel = styled.span`
  font-size: 0.8rem;
  color: #94a3b8;
`;

const BrushSizeValue = styled.span`
  font-size: 0.85rem;
  color: #e5e7eb;
  font-weight: 500;
`;

function Toolbar({
  settings,
  onSettingsChange,
  onClear,
  onUndo,
  onRedo
}) {
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  const handleToolChange = (tool) => {
    onSettingsChange({ ...settings, tool });
  };

  const handleColorChange = (color) => {
    onSettingsChange({ ...settings, color: color.hex });
  };

  const handleBrushSizeChange = (e) => {
    onSettingsChange({ ...settings, brushSize: parseInt(e.target.value, 10) });
  };

  return (
    <ToolbarContainer>
      <Header>
        <ToolbarTitle>Toolbar</ToolbarTitle>
        <Subtitle>Pick a tool & draw!</Subtitle>
      </Header>

      <ToolButton $active={settings.tool === 'text'} onClick={() => handleToolChange('text')}>Text</ToolButton>
      <ToolButton $active={settings.tool === 'pen'} onClick={() => handleToolChange('pen')}>Sketch Pen</ToolButton>
      <ToolButton $active={settings.tool === 'eraser'} onClick={() => handleToolChange('eraser')}>Eraser</ToolButton>
      <ToolButton $active={settings.tool === 'rectangle'} onClick={() => handleToolChange('rectangle')}>Rectangle</ToolButton>
      <ToolButton $active={settings.tool === 'circle'} onClick={() => handleToolChange('circle')}>Circle</ToolButton>

      <div style={{ position: 'relative' }}>
        <ColorBox color={settings.color} onClick={() => setShowColorPicker(v => !v)} />
        {showColorPicker && (
          <div style={{ position: 'absolute', left: '150px', zIndex: 20 }}>
            <SketchPicker color={settings.color} onChange={handleColorChange} />
          </div>
        )}
      </div>

      <BrushSizeContainer>
        <BrushSizeLabel>Brush Size</BrushSizeLabel>
        <RangeInput
          type="range"
          min={1}
          max={30}
          value={settings.brushSize}
          onChange={handleBrushSizeChange}
        />
        <BrushSizeValue>{settings.brushSize}</BrushSizeValue>
      </BrushSizeContainer>

      <ToolButton onClick={onUndo}>Undo</ToolButton>
      <ToolButton onClick={onRedo}>Redo</ToolButton>
      <ToolButton onClick={onClear}>Clear</ToolButton>
    </ToolbarContainer>
  );
}

export default Toolbar;
