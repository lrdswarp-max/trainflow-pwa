

export const MessageBubble = ({ content, status, isOwn }: { content: string, status: string, isOwn: boolean }) => {
  return (
    <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} mb-4`}>
      <div className={`px-4 py-2 rounded-2xl max-w-[70%] ${
        isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
      }`}>
        <p className="text-sm">{content}</p>
      </div>
      {status === 'pending' && isOwn && (
        <span className="text-xs text-muted-foreground mt-1 flex items-center">
          <svg className="w-3 h-3 mr-1 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          pending
        </span>
      )}
    </div>
  );
};
