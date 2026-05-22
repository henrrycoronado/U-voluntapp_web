interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Tabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
  return (
    <div className="flex gap-6 border-b border-zinc-800/80 w-full mb-6 overflow-x-auto custom-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
            activeTab === tab ? 'text-yellow-500' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {tab}
          {activeTab === tab && (
            <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-yellow-500 rounded-t-full"></div>
          )}
        </button>
      ))}
    </div>
  );
};
