import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import effectsData from "../../effects.json";
import { Switch } from "./ui/switch";

interface EffectProperty {
  note: React.JSX.Element;
  name: string;
  type: string;
  optional: boolean;
  default: any;
}

export interface Effect {
  name: string;
  properties: EffectProperty[];
}

interface EffectsData {
  effects: Effect[];
}

interface SettingsPanelProps {
  setSelectedEffect: React.Dispatch<React.SetStateAction<Effect | null>>;
  setParticleOptions: React.Dispatch<
    React.SetStateAction<Record<string, string | number> | null>
  >;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  setSelectedEffect,
  setParticleOptions,
}) => {
  const effects = (effectsData as EffectsData).effects;
  const firstEffect = effects[0];
  const [applyWithoutOptions, setApplyWithoutOptions] = useState(true);
  const [localSelectedEffect, setLocalSelectedEffect] = useState<Effect | null>(
    firstEffect
  );
  const [localSettings, setLocalSettings] = useState<
    Record<string, string | number>
  >(
    Object.fromEntries(
      firstEffect.properties.map((prop) => [prop.name, prop.default])
    )
  );

  const [dragMode, setDragMode] = useState("light");
  const [codeMode, setCodeMode] = useState("dark");
  const [confettiColor, setConfettiColor] = useState("red");

  useEffect(() => {
    if (localSelectedEffect) {
      const updatedSettings = { ...localSettings };
      if (localSelectedEffect.name === "dragMode") {
        updatedSettings.color = dragMode;
      }
      if (localSelectedEffect.name === "codeMode") {
        updatedSettings.color = codeMode;
      }
      if (localSelectedEffect.name === "confettiMode") {
        updatedSettings.color = confettiColor;
      }
      setParticleOptions(updatedSettings);
    }
  }, [localSelectedEffect, dragMode, codeMode, confettiColor]);

  useEffect(() => {
    if (localSelectedEffect) {
      const initialSettings = Object.fromEntries(
        localSelectedEffect.properties.map((prop) => [prop.name, prop.default])
      );
      setLocalSettings(initialSettings);
    }
  }, [localSelectedEffect]);

  useEffect(() => {
    setSelectedEffect(localSelectedEffect);
    setParticleOptions(applyWithoutOptions ? null : localSettings);
  }, [localSelectedEffect, localSettings, applyWithoutOptions]);

  const handleEffectChange = (newEffectName: string) => {
    const newEffect = effects.find((effect) => effect.name === newEffectName);
    setLocalSelectedEffect(newEffect || null);
  };

  const handleDropdownChange = (value: string, mode: string) => {
    switch (mode) {
      case "dragMode":
        setDragMode(value);
        break;
      case "codeMode":
        setCodeMode(value);
        break;
      case "confettiMode":
        setConfettiColor(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-lg h-[95vh] w-[25vw] p-6">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline outline-1  text-white py-2 px-2 rounded">
          Choose Effect
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-md shadow-lg">
          {effects.map((effect, index) => (
            <DropdownMenuItem
              key={index}
              onSelect={() => handleEffectChange(effect.name)}
              className="px-4 py-2 hover:bg-blue-200"
            >
              {effect.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center mt-4">
        <Switch
          checked={applyWithoutOptions}
          onChange={() => setApplyWithoutOptions(!applyWithoutOptions)}
          className={`transition-colors ease-in-out duration-200 ${
            applyWithoutOptions ? "bg-gray-600" : "bg-gray-600"
          }`}
        />
        <span className="ml-2">Apply particle options</span>
      </div>
      {localSelectedEffect && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">
            {localSelectedEffect.name} Settings
          </h2>
          {localSelectedEffect.properties.map((prop, index) => {
            switch (prop.type) {
              case "number":
                return (
                  <div key={index} className="mb-4">
                    <Label
                      htmlFor={`${prop.name}-input`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {prop.name}
                    </Label>
                    <Input
                      type="number"
                      id={`${prop.name}-input`}
                      value={localSettings[prop.name]}
                      onChange={(e) =>
                        setLocalSettings({
                          ...localSettings,
                          [prop.name]: Number(e.target.value),
                        })
                      }
                      className="mt-1 p-2 border rounded"
                    />
                  </div>
                );
              case "string":
                return (
                  <div key={index} className="mb-4">
                    <Label
                      htmlFor={`${prop.name}-input`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {prop.name}
                    </Label>
                    <Input
                      id={`${prop.name}-input`}
                      value={localSettings[prop.name]}
                      onChange={(e) =>
                        setLocalSettings({
                          ...localSettings,
                          [prop.name]: e.target.value,
                        })
                      }
                      className="mt-1 p-2 border rounded"
                    />
                  </div>
                );
              default:
                return null;
            }
          })}
          <div className="italic text-sm text-gray-500">
            {localSelectedEffect.properties.map(
              (prop) => prop.note && <div key={prop.name}>{prop.note}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
