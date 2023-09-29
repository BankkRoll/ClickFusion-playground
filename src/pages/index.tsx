import React, { useState } from "react";
import { ClickFusion } from "clickfusion";
import SettingsPanel, { Effect } from "@/components/settings";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Home() {
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectedEffect, setSelectedEffect] = useState<Effect | null>(null);
  const [particleOptions, setParticleOptions] = useState<Record<
    string,
    string | number
  > | null>(null);

  const handleCopyClick = () => {
    // Use the dynamic code for the copy action
    const codeToCopy = generateCode();
    navigator.clipboard.writeText(codeToCopy);

    // Show success and revert back after a few seconds
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Separate function to generate the dynamic code
  const generateCode = () => {
    let particleOptionsStr = "";
    if (particleOptions !== null) {
      particleOptionsStr = JSON.stringify(particleOptions, null, 2)
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

export default MyComponent;`;
  };

  return (
    <main className="flex flex-col min-h-screen p-4 dark:bg-darkBackground bg-lightBackground">
      <div className="flex-grow flex">
        <SettingsPanel
          setSelectedEffect={setSelectedEffect}
          setParticleOptions={setParticleOptions}
        />
        <section className="flex-grow flex flex-col items-center justify-center">
          <Tabs className="h-full" defaultValue="preview">
            <TabsList className="flex justify-center">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            <TabsContent
              value="preview"
              className="relative text-center border-2 border-white rounded-lg min-w-[70vw] min-h-[90vh]"
            >
              {selectedEffect ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <ClickFusion
                    key={selectedEffect.name}
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
              className="relative border-2 border-white rounded-lg min-w-[70vw] min-h-[90vh]"
            >
              {selectedEffect ? (
                <div className="absolute w-full h-full">
                  <button
                    className="absolute top-4 right-4 text-white z-10"
                    onClick={handleCopyClick}
                  >
                    {copySuccess ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                        />
                      </svg>
                    )}
                  </button>
                  <pre className="p-4 rounded bg-gray-800 text-white overflow-auto h-full w-full m-0 relative">
                    <code className="block whitespace-pre-wrap">
                      {(() => {
                        const generatedCode = generateCode();
                        return generatedCode.split("\n").map((line, index) => (
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
