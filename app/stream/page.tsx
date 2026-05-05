const CHANNEL_ID = "UCWqtZvq2yoraEk0e0JnQx9A";

export default function Stream() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <div className="flex-1 relative">
        <iframe
          src={`https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}`}
          title="Live stream"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    </main>
  );
}
