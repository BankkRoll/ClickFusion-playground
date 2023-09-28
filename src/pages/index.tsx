import React, { useState } from "react";
import { ClickFusion } from "clickfusion";
import SettingsPanel, { Effect } from "@/components/settings";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Home() {
  const [selectedEffect, setSelectedEffect] = useState<Effect | null>(null);
  const [particleOptions, setParticleOptions] = useState<Record<
    string,
    string | number
  > | null>(null);

  return (
    <main className="flex flex-col min-h-screen p-4 dark:bg-darkBackground bg-lightBackground">
      <div className="flex-grow flex">
        <SettingsPanel
          setSelectedEffect={setSelectedEffect}
          setParticleOptions={setParticleOptions}
        />
        <section className="flex-grow flex flex-col">
          <Tabs className="h-[90vh]" defaultValue="preview">
            <TabsList className="mb-4 flex justify-center">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            <TabsContent
              value="preview"
              className="relative text-center border-2 border-white rounded-lg min-w-[60vw] min-h-[84vh]"
            >
              {selectedEffect ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <ClickFusion
                    effect={selectedEffect.name}
                    particleOptions={particleOptions}
                  >
                    <button className="m-auto outline rounded-lg p-4">
                      Click Me for {selectedEffect.name} Effect!
                    </button>
                  </ClickFusion>
                </div>
              ) : (
                "Preview content will appear here"
              )}
            </TabsContent>

            <TabsContent
              value="code"
              className="relative border-2 border-white rounded-lg min-w-[60vw] min-h-[84vh]"
            >
              {selectedEffect ? (
                <div className="absolute w-full h-full">
                  <pre className="p-4 rounded bg-gray-800 text-white overflow-auto h-full w-full m-0 relative">
                    <code className="block whitespace-pre-wrap">
                      {(() => {
                        let particleOptionsStr = "";
                        if (particleOptions !== null) {
                          particleOptionsStr = JSON.stringify(
                            particleOptions,
                            null,
                            2
                          )
                            .split("\n")
                            .map((line) => `      ${line}`)
                            .join("\n");
                        }
                        return `import { ClickFusion } from 'clickfusion';

const MyComponent = () => {
  return (
    <ClickFusion 
      effect="${selectedEffect.name}"${
                          particleOptions !== null
                            ? `\n      particleOptions={${particleOptionsStr}}`
                            : ""
                        }
    >
      <button className="outline rounded-lg p-4">
        Click Me for ${selectedEffect.name} Effect!
      </button>
    </ClickFusion>
  );
};

export default MyComponent;`
                          .split("\n")
                          .map((line, index) => (
                            <span key={index} className="block">
                              <span className="text-gray-400 select-none pr-2">
                                {String(index + 1).padStart(3, " ")}
                              </span>
                              {line}
                            </span>
                          ));
                      })()}
                    </code>
                  </pre>
                </div>
              ) : (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  Code content will appear here
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
}
